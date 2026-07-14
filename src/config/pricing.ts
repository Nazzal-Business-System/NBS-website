/**
 * Single source of truth for NBS pricing structure.
 * Display copy lives in messages (EN/AR); amounts and package IDs live here.
 */

export const PRICING_CURRENCY = "JOD" as const;

export type PricingAccent = "cobalt" | "violet" | "cyan" | "emerald";

export type PricingQuote =
  | { readonly type: "from"; readonly amount: number }
  | { readonly type: "from_monthly"; readonly amount: number }
  | { readonly type: "after_scope" }
  | { readonly type: "separately" };

export type PricingProductId = "erp" | "pos" | "ims" | "custom";

export type HomepagePricingProduct = {
  readonly id: PricingProductId;
  readonly accent: PricingAccent;
  readonly starting: PricingQuote;
  readonly featureIds: readonly string[];
  readonly showDiscussCta: boolean;
};

export type PricingPackageDef = {
  readonly id: string;
  readonly quote: PricingQuote;
  /** Message keys under pricing.products.{product}.packages.{id}.includes.* */
  readonly includeIds: readonly string[];
};

export type PricingDetailSection = {
  readonly id: PricingProductId;
  readonly accent: PricingAccent;
  readonly packages: readonly PricingPackageDef[];
};

export type PricingAddOnDef = {
  readonly id: string;
  readonly quote: PricingQuote;
};

export const homepagePricingProducts: readonly HomepagePricingProduct[] = [
  {
    id: "erp",
    accent: "cobalt",
    starting: { type: "from", amount: 2800 },
    featureIds: ["ops", "roles", "bilingual", "visibility"],
    showDiscussCta: true,
  },
  {
    id: "pos",
    accent: "violet",
    starting: { type: "from", amount: 750 },
    featureIds: ["checkout", "catalog", "receipts", "sales"],
    showDiscussCta: true,
  },
  {
    id: "ims",
    accent: "cyan",
    starting: { type: "from", amount: 900 },
    featureIds: ["stock", "suppliers", "movements", "alerts"],
    showDiscussCta: true,
  },
  {
    id: "custom",
    accent: "emerald",
    starting: { type: "from", amount: 1000 },
    featureIds: ["workflow", "integration", "fit", "growth"],
    showDiscussCta: true,
  },
] as const;

export const pricingDetailSections: readonly PricingDetailSection[] = [
  {
    id: "erp",
    accent: "cobalt",
    packages: [
      {
        id: "foundation",
        quote: { type: "from", amount: 2800 },
        includeIds: ["sales", "purchasing", "inventory", "roles", "bilingual", "reports"],
      },
      {
        id: "growth",
        quote: { type: "from", amount: 4500 },
        includeIds: ["foundation", "extraModules", "deeperWorkflows", "roles", "bilingual", "onboarding"],
      },
      {
        id: "tailored",
        quote: { type: "from", amount: 7000 },
        includeIds: ["customFlows", "integrations", "phased", "roles", "bilingual", "training"],
      },
    ],
  },
  {
    id: "pos",
    accent: "violet",
    packages: [
      {
        id: "single",
        quote: { type: "from", amount: 750 },
        includeIds: ["checkout", "catalog", "receipts", "dailySales", "bilingual"],
      },
      {
        id: "managed",
        quote: { type: "from", amount: 1200 },
        includeIds: ["checkout", "catalog", "receipts", "reports", "managerViews", "bilingual"],
      },
      {
        id: "multi",
        quote: { type: "from", amount: 1800 },
        includeIds: ["multiLocation", "catalog", "receipts", "reports", "coordination", "bilingual"],
      },
    ],
  },
  {
    id: "ims",
    accent: "cyan",
    packages: [
      {
        id: "core",
        quote: { type: "from", amount: 900 },
        includeIds: ["stockLevels", "movements", "basics", "alerts", "bilingual"],
      },
      {
        id: "purchasing",
        quote: { type: "from", amount: 1500 },
        includeIds: ["stockLevels", "suppliers", "purchaseFlows", "movements", "alerts", "bilingual"],
      },
      {
        id: "multiWarehouse",
        quote: { type: "from", amount: 2300 },
        includeIds: ["multiSite", "transfers", "suppliers", "accountability", "alerts", "bilingual"],
      },
    ],
  },
  {
    id: "custom",
    accent: "emerald",
    packages: [
      {
        id: "focused",
        quote: { type: "from", amount: 1000 },
        includeIds: ["oneWorkflow", "simpleUi", "handover", "bilingual"],
      },
      {
        id: "connected",
        quote: { type: "from", amount: 2500 },
        includeIds: ["multiProcess", "roles", "integrations", "reporting", "bilingual", "training"],
      },
      {
        id: "platform",
        quote: { type: "from", amount: 5000 },
        includeIds: ["complexOps", "phased", "integrations", "roles", "bilingual", "supportPlan"],
      },
    ],
  },
] as const;

export const pricingAddOns: readonly PricingAddOnDef[] = [
  { id: "additionalModule", quote: { type: "from", amount: 200 } },
  { id: "complexModule", quote: { type: "from", amount: 400 } },
  { id: "thirdPartyIntegration", quote: { type: "from", amount: 250 } },
  { id: "dataMigration", quote: { type: "from", amount: 150 } },
  { id: "additionalBranch", quote: { type: "from", amount: 100 } },
  { id: "customReport", quote: { type: "from", amount: 75 } },
  { id: "customDashboard", quote: { type: "from", amount: 150 } },
  { id: "staffTraining", quote: { type: "from", amount: 100 } },
  { id: "deploymentSetup", quote: { type: "from", amount: 100 } },
  { id: "ongoingSupport", quote: { type: "from_monthly", amount: 50 } },
  { id: "prioritySupport", quote: { type: "from_monthly", amount: 120 } },
  { id: "hostingServices", quote: { type: "separately" } },
] as const;

export const pricingFactorIds = [
  "modules",
  "complexity",
  "users",
  "branches",
  "integrations",
  "migration",
  "deployment",
  "support",
] as const;

export type PricingFactorId = (typeof pricingFactorIds)[number];

export const pricingExclusionIds = [
  "hosting",
  "thirdPartySubs",
  "unscoped",
  "binding",
] as const;

export type PricingExclusionId = (typeof pricingExclusionIds)[number];

export const pricingFaqIds = [
  "startingVsFinal",
  "binding",
  "taxes",
  "payment",
  "addons",
  "locales",
] as const;

export type PricingFaqId = (typeof pricingFaqIds)[number];

export const pricingNavItems = [
  { id: "erp", hash: "pricing-erp" },
  { id: "pos", hash: "pricing-pos" },
  { id: "ims", hash: "pricing-ims" },
  { id: "custom", hash: "pricing-custom" },
  { id: "addons", hash: "add-ons" },
] as const;

export const pricingComparisonPackageIds = {
  erp: "foundation",
  pos: "single",
  ims: "core",
  custom: "focused",
} as const satisfies Record<PricingProductId, string>;
