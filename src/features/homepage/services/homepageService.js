import { createHomepageSectionModel } from "../model/homepageSectionModel";

export function createHomepageSeed() {
  return createHomepageSectionModel({
    heroTitle: "Operate OptiZenqor across app and web from one control center.",
    heroSubtitle:
      "Manage promotions, featured collections, trust messaging, and the surfaces customers see first.",
    primaryCtaLabel: "Shop Now",
    secondaryCtaLabel: "Explore Offers",
    featuredCollection: "Seasonal essentials",
    popularProductIds: ["p1", "p4", "p10"],
    trustHighlights: [
      "Fast delivery across major cities",
      "Original products with curated merchandising",
      "Support-ready checkout and returns assistance",
    ],
    offerRibbons: ["Flash Sell", "Best Price", "Free Delivery"],
  });
}
