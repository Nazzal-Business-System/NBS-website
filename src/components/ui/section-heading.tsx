import { Eyebrow } from "./eyebrow";
import { Typography } from "./typography";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  titleId: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
}: SectionHeadingProps) {
  return (
    <div className="max-w-[var(--width-reading)]">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Typography variant="h2" as="h2" id={titleId}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body" className="mt-4">
          {description}
        </Typography>
      ) : null}
    </div>
  );
}
