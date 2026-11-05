// Endereço público do site, usado no Open Graph (prévia do WhatsApp) e no SEO.
// Em prévias da Vercel usa o próprio link da prévia; em produção, o domínio definido.
export function siteUrl(): string {
  const env = process.env;
  if (env.NEXT_PUBLIC_SITE_URL) return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const host =
    (env.VERCEL_ENV === "production" && env.VERCEL_PROJECT_PRODUCTION_URL) ||
    env.VERCEL_BRANCH_URL ||
    env.VERCEL_URL;
  return host ? `https://${host}` : "http://localhost:3000";
}

/** Só indexa no Google quando o domínio definitivo estiver ligado (SITE_INDEX=1). */
export const indexavel = process.env.SITE_INDEX === "1";
