import { paths } from "@/config/navigation";

export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href.includes("#")) {
    const [pathPart] = href.split("#");
    const base = pathPart || "/";
    return pathname === base || pathname === "/";
  }

  if (href === paths.systems.innovationErp) {
    return pathname.startsWith("/systems");
  }

  if (href === paths.pricing) {
    return pathname === paths.pricing;
  }

  if (href === paths.home) {
    return pathname === paths.home;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
