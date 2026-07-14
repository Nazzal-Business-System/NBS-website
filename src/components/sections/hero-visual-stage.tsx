import { HeroErpPreview } from "./hero-erp-preview";
import { HeroStageInteractive } from "./hero-stage-interactive";

export async function HeroVisualStage() {
  return (
    <HeroStageInteractive>
      <HeroErpPreview />
    </HeroStageInteractive>
  );
}
