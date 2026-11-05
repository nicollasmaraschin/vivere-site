import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { indexavel, siteUrl } from "@/lib/site";
import "./globals.css";

// Montserrat: títulos e interface. Aileron: só textos longos. (Novelin só existe dentro da logo.)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});
const aileron = localFont({
  src: [
    { path: "../fonts/aileron-300.woff2", weight: "300" },
    { path: "../fonts/aileron-400.woff2", weight: "400" },
    { path: "../fonts/aileron-600.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-aileron",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "Vivere Imóveis Selecionados · Florianópolis", template: "%s · Vivere" },
  description:
    "Curadoria de imóveis de alto padrão em Florianópolis. Especialistas em Jurerê Internacional, com unidades em Jurerê, Porto da Lagoa e Santo Antônio de Lisboa.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Vivere Imóveis Selecionados",
    images: [{ url: "/og/vivere.jpg", width: 1200, height: 630, alt: "Vivere Imóveis Selecionados" }],
  },
  robots: indexavel ? undefined : { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0E131C", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${aileron.variable}`}>
      <body>
        <a className="skip" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
