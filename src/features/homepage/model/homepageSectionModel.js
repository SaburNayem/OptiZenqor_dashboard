export function createHomepageSectionModel(section) {
  return {
    heroTitle: section.heroTitle,
    heroSubtitle: section.heroSubtitle,
    primaryCtaLabel: section.primaryCtaLabel,
    secondaryCtaLabel: section.secondaryCtaLabel,
    featuredCollection: section.featuredCollection ?? "Curated essentials",
    popularProductIds: section.popularProductIds ?? [],
    trustHighlights: section.trustHighlights ?? [],
    offerRibbons: section.offerRibbons ?? [],
  };
}
