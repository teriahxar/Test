Param(
  [string]$RepositoryName = "Test",
  [string]$Branch = "gh-pages"
)

$ErrorActionPreference = "Stop"

function Require-Command([string]$Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $Name"
  }
}

Require-Command git
Require-Command npm
Require-Command robocopy

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$status = git status --porcelain
if ($status) {
  throw "Working tree is not clean. Commit or stash changes before publishing."
}

$apiPath = Join-Path $repoRoot "app\api"
$apiBackupPath = Join-Path $repoRoot "app\api.__pages_backup__"
$outDir = Join-Path $repoRoot "out"
$worktreePath = Join-Path $env:TEMP ("trinket-gh-pages-" + [Guid]::NewGuid().ToString("N"))

try {
  if (Test-Path $apiPath) {
    Move-Item -Path $apiPath -Destination $apiBackupPath
  }

  $env:GITHUB_PAGES = "1"
  $env:NEXT_PUBLIC_BASE_PATH = "/$RepositoryName"
  npm run build:pages

  if (-not (Test-Path $outDir)) {
    throw "Build output folder not found: $outDir"
  }

  $branchExists = $false
  git show-ref --verify --quiet ("refs/heads/" + $Branch)
  if ($LASTEXITCODE -eq 0) {
    $branchExists = $true
  }

  if ($branchExists) {
    git worktree add $worktreePath $Branch
  } else {
    git worktree add -b $Branch $worktreePath
  }

  $rcLog = Join-Path $env:TEMP ("trinket-robocopy-" + [Guid]::NewGuid().ToString("N") + ".log")
  robocopy $outDir $worktreePath /MIR /XD .git /R:1 /W:1 /NFL /NDL /NJH /NJS /NP /LOG:$rcLog | Out-Null
  if ($LASTEXITCODE -ge 8) {
    $details = Get-Content $rcLog -ErrorAction SilentlyContinue
    throw "robocopy failed with exit code $LASTEXITCODE. $details"
  }
  Remove-Item $rcLog -ErrorAction SilentlyContinue

  $noJekyllPath = Join-Path $worktreePath ".nojekyll"
  if (-not (Test-Path $noJekyllPath)) {
    New-Item -Path $noJekyllPath -ItemType File | Out-Null
  }

  git -C $worktreePath add -A
  git -C $worktreePath diff --cached --quiet
  if ($LASTEXITCODE -eq 0) {
    Write-Output "No publish changes detected."
  } else {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
    git -C $worktreePath commit -m ("Publish TRinket static site " + $timestamp)
    git -C $worktreePath push origin $Branch
    Write-Output "Published static site to $Branch."
  }
}
finally {
  if (Test-Path $apiBackupPath) {
    Move-Item -Path $apiBackupPath -Destination $apiPath
  }

  git worktree remove $worktreePath --force 2>$null
  if (Test-Path $worktreePath) {
    Remove-Item -Path $worktreePath -Recurse -Force
  }
}
