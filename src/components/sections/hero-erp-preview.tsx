import { getTranslations } from "next-intl/server";

const navKeys = ["dashboard", "sales", "purchases", "inventory", "accounting", "reports"] as const;
const statKeys = ["sales", "profit", "orders", "products"] as const;

export async function HeroErpPreview() {
  const t = await getTranslations("homepage.hero.preview");

  return (
    <div className="nbs-erp-preview" role="img" aria-label={t("ariaLabel")}>
      <div className="nbs-erp-preview-sidebar" aria-hidden>
        <div className="nbs-erp-preview-sidebar-head">
          <span className="nbs-erp-preview-logo-dot" />
          <span className="nbs-erp-preview-sidebar-title">{t("productName")}</span>
        </div>
        <ul className="nbs-erp-preview-nav">
          {navKeys.map((key, index) => (
            <li
              key={key}
              className={
                index === 0
                  ? "nbs-erp-preview-nav-item is-active"
                  : index > 2
                    ? "nbs-erp-preview-nav-item nbs-erp-preview-nav-item--extra"
                    : "nbs-erp-preview-nav-item"
              }
            >
              <span className="nbs-erp-preview-nav-icon" />
              <span className="nbs-erp-preview-nav-label">{t(`nav.${key}`)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="nbs-erp-preview-main" aria-hidden>
        <div className="nbs-erp-preview-topbar">
          <span className="nbs-erp-preview-search">{t("search")}</span>
          <span className="nbs-erp-preview-avatar" />
        </div>

        <div className="nbs-erp-preview-stats">
          {statKeys.map((key, index) => (
            <div
              key={key}
              className={
                index >= 2
                  ? "nbs-erp-preview-stat nbs-erp-preview-stat--secondary"
                  : "nbs-erp-preview-stat"
              }
            >
              <span className="nbs-erp-preview-stat-label">
                {t(`stats.${key}.label`)}
              </span>
              <span className="nbs-erp-preview-stat-value">
                {t(`stats.${key}.value`)}
              </span>
              <span className="nbs-erp-preview-stat-trend">
                {t(`stats.${key}.trend`)}
              </span>
            </div>
          ))}
        </div>

        <div className="nbs-erp-preview-panels">
          <div className="nbs-erp-preview-chart">
            <span className="nbs-erp-preview-panel-title">{t("chartTitle")}</span>
            <div className="nbs-erp-preview-chart-area">
              <svg viewBox="0 0 240 80" className="nbs-erp-preview-chart-svg" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="erp-chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(139 92 246 / 0.35)" />
                    <stop offset="100%" stopColor="rgb(139 92 246 / 0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 62 L30 48 L60 52 L90 28 L120 34 L150 18 L180 24 L210 10 L240 16 L240 80 L0 80 Z"
                  fill="url(#erp-chart-fill)"
                />
                <path
                  d="M0 62 L30 48 L60 52 L90 28 L120 34 L150 18 L180 24 L210 10 L240 16"
                  fill="none"
                  stroke="rgb(139 92 246)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="nbs-erp-preview-list">
            <span className="nbs-erp-preview-panel-title">{t("listTitle")}</span>
            <ul>
              {[1, 2, 3, 4].map((row) => (
                <li
                  key={row}
                  className={
                    row > 2
                      ? "nbs-erp-preview-list-row nbs-erp-preview-list-row--extra"
                      : "nbs-erp-preview-list-row"
                  }
                >
                  <span className="nbs-erp-preview-list-rank">{row}</span>
                  <span className="nbs-erp-preview-list-bar" style={{ width: `${92 - row * 14}%` }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
