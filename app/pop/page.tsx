import { UniverseDashboardPage } from "@/components/universe-dashboard-page";

export default async function PopPage() {
  return (
    <UniverseDashboardPage
      universeSlug="pop-mart"
      routeUniverseSlug="pop"
      themeUniverseSlug="pop"
      titleOverride="POP! World"
      descriptionOverride="Iconic pops, fun finds, and collectibles worth keeping tabs on."
    />
  );
}
