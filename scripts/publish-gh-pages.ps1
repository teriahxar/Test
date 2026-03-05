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

function Invoke-Checked {
  param(
    [Parameter(Mandatory = $true)]
    [scriptblock]$Script,
    [Parameter(Mandatory = $true)]
    [string]$OnError
  )

  & $Script
  if ($LASTEXITCODE -ne 0) {
    throw "$OnError (exit code: $LASTEXITCODE)"
  }
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$status = git status --porcelain
if ($status) {
  $blocking = @($status | Where-Object { $_ -notmatch "^\s*[A-Z\?]{1,2}\s+out/" })
  if ($blocking.Count -gt 0) {
    throw "Working tree has uncommitted non-out/ changes. Commit or stash before publishing."
  }
}

$apiPath = Join-Path $repoRoot "app\api"
$tmpDir = Join-Path $repoRoot ".tmp"
$apiBackupPath = Join-Path $tmpDir "api.__pages_backup__"
$outDir = Join-Path $repoRoot "out"
$worktreePath = Join-Path $env:TEMP ("trinket-gh-pages-" + [Guid]::NewGuid().ToString("N"))
$worktreeAdded = $false

try {
  if (-not (Test-Path $tmpDir)) {
    New-Item -Path $tmpDir -ItemType Directory | Out-Null
  }
  if (Test-Path $apiBackupPath) {
    Remove-Item -Path $apiBackupPath -Recurse -Force
  }

  if (Test-Path $apiPath) {
    Move-Item -Path $apiPath -Destination $apiBackupPath
  }

  $env:GITHUB_PAGES = "1"
  $env:NEXT_PUBLIC_BASE_PATH = "/$RepositoryName"
  Invoke-Checked -Script { npm run build:pages } -OnError "Static build failed"

  if (-not (Test-Path $outDir)) {
    throw "Build output folder not found: $outDir"
  }

  $branchExists = $false
  git show-ref --verify --quiet ("refs/heads/" + $Branch)
  if ($LASTEXITCODE -eq 0) {
    $branchExists = $true
  }

  Invoke-Checked -Script { git worktree prune } -OnError "Failed to prune stale git worktrees"

  if ($branchExists) {
    Invoke-Checked -Script { git worktree add $worktreePath $Branch } -OnError "Failed to attach git worktree"
  } else {
    Invoke-Checked -Script { git worktree add -b $Branch $worktreePath } -OnError "Failed to create gh-pages worktree"
  }
  $worktreeAdded = $true

  Get-ChildItem -Path $worktreePath -Force |
    Where-Object { $_.Name -ne ".git" } |
    Remove-Item -Recurse -Force

  Get-ChildItem -Path $outDir -Force | ForEach-Object {
    $destination = Join-Path $worktreePath $_.Name
    Copy-Item -Path $_.FullName -Destination $destination -Recurse -Force
  }

  $noJekyllPath = Join-Path $worktreePath ".nojekyll"
  if (-not (Test-Path $noJekyllPath)) {
    New-Item -Path $noJekyllPath -ItemType File | Out-Null
  }

  Invoke-Checked -Script { git -C $worktreePath add -A } -OnError "Failed to stage gh-pages content"
  git -C $worktreePath diff --cached --quiet
  if ($LASTEXITCODE -eq 0) {
    Write-Output "No publish changes detected."
  } else {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
    Invoke-Checked -Script { git -C $worktreePath commit -m ("Publish TRinket static site " + $timestamp) } -OnError "Failed to commit gh-pages publish"
    Invoke-Checked -Script { git -C $worktreePath push origin $Branch } -OnError "Failed to push gh-pages"
    Write-Output "Published static site to $Branch."
  }
}
finally {
  if (Test-Path $apiBackupPath) {
    if (Test-Path $apiPath) {
      Remove-Item -Path $apiPath -Recurse -Force
    }
    Move-Item -Path $apiBackupPath -Destination $apiPath
  }
  if (Test-Path $tmpDir) {
    Remove-Item -Path $tmpDir -Recurse -Force
  }

  if ($worktreeAdded) {
    try {
      git worktree remove $worktreePath --force 2>$null
    } catch {
      Write-Output "Warning: unable to remove temporary worktree cleanly."
    }
  }
  if (Test-Path $worktreePath) {
    Remove-Item -Path $worktreePath -Recurse -Force
  }
}
