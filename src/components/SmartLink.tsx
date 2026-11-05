import Link from "next/link";

// Internal paths go through next/link so they respect basePath;
// external ones open in a new tab.
export function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
