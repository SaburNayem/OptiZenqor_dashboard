function isBlank(value) {
  return !String(value ?? "").trim();
}

export function validateLogin(form) {
  const errors = {};

  if (isBlank(form.email)) errors.email = "Email is required.";
  if (isBlank(form.password)) errors.password = "Password is required.";

  return errors;
}

export function validateProduct(form) {
  const errors = {};

  if (isBlank(form.name)) errors.name = "Product name is required.";
  if (!form.categoryIds?.length) errors.categoryIds = "Choose at least one category.";
  if (isBlank(form.price) || Number(form.price) <= 0) errors.price = "Enter a valid price.";
  if (isBlank(form.inventory) || Number(form.inventory) < 0) {
    errors.inventory = "Inventory cannot be negative.";
  }
  if (isBlank(form.description)) errors.description = "Description is required.";
  if (isBlank(form.imageUrl)) errors.imageUrl = "Image URL or upload preview is required.";

  return errors;
}

export function validateOffer(label) {
  if (isBlank(label)) {
    return { label: "Offer name is required." };
  }

  return {};
}

export function validateHomepageContent(form) {
  const errors = {};

  if (isBlank(form.heroTitle)) errors.heroTitle = "Hero title is required.";
  if (isBlank(form.heroSubtitle)) errors.heroSubtitle = "Hero subtitle is required.";
  if (isBlank(form.primaryCtaLabel)) errors.primaryCtaLabel = "Primary CTA is required.";
  if (isBlank(form.secondaryCtaLabel)) errors.secondaryCtaLabel = "Secondary CTA is required.";

  return errors;
}

export function validateSettings(form) {
  const errors = {};

  if (isBlank(form.adminName)) errors.adminName = "Admin name is required.";
  if (isBlank(form.adminEmail)) errors.adminEmail = "Admin email is required.";
  if (isBlank(form.apiBaseUrl)) errors.apiBaseUrl = "API base URL is required.";

  return errors;
}

export function validateChatReply(text) {
  if (isBlank(text)) {
    return { text: "Reply message cannot be empty." };
  }

  return {};
}
