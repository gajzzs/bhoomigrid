import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NLAMS | National Land Acquisition & Management System (BHOOMI-GATI)",
  description: "Web-based National Land Acquisition & Management System for End-to-End Digital Monitoring and Decision Support with PostGIS Spatial Mapping, RFCTLARR 2013 Statutory Lifecycle, and PFMS DBT Disbursal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-surface text-on-surface font-body-md selection:bg-secondary-container selection:text-on-secondary-fixed">
        {children}
      </body>
    </html>
  );
}
