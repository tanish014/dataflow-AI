import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DataFlow AI — Intelligent Data Automation Platform',
  description:
    'Automate complex data workflows with AI. Transform, clean, and analyze data at scale with enterprise-grade reliability. Trusted by 500+ companies.',
  metadataBase: new URL('https://dataflow.ai'),
  openGraph: {
    title: 'DataFlow AI — Intelligent Data Automation Platform',
    description:
      'Automate complex data workflows with AI. Transform, clean, and analyze data at scale with enterprise-grade reliability.',
    type: 'website',
    locale: 'en_US',
    siteName: 'DataFlow AI',
    url: 'https://dataflow.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataFlow AI — Intelligent Data Automation Platform',
    description:
      'Automate complex data workflows with AI. Transform, clean, and analyze data at scale.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://dataflow.ai' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-darkest">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
