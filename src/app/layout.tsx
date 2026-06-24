import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Agraï Burger — Livraison de nuit 22h-6h",
  description: "Vos burgers préférés livrés chauds chez vous, de 22h à 6h. Commandez maintenant !",
  keywords: ["burger", "livraison", "nuit", "agraï", "fast food", "commande en ligne"],
  openGraph: {
    title: "Agraï Burger — Livraison de nuit 22h-6h",
    description: "Vos burgers préférés livrés chauds chez vous, de 22h à 6h.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              border: '1px solid rgba(249,115,22,0.3)',
              borderRadius: '12px',
              fontFamily: 'Barlow, sans-serif',
              fontWeight: '600',
            },
            success: {
              iconTheme: { primary: '#F97316', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
