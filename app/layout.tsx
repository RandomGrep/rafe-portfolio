import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Sayed Md Rafe | DevSecOps & Cloud Security Consultant",
  description: "Senior Cloud Security Consultant at KPMG India | Multi-Cloud Security Expert (AWS, Azure, GCP) | DevSecOps | RBI Compliance | NIST | CIS | Risk & Audit",
  keywords: [
    "DevSecOps",
    "Cloud Security",
    "AWS Security",
    "Azure Security",
    "GCP Security",
    "Kubernetes Security",
    "Docker",
    "KPMG",
    "Cloud Security Consultant",
    "RBI Compliance",
    "NIST 800-171",
    "CIS Benchmarks",
    "Prisma Cloud",
    "CSPM",
    "CWPP",
    "IAM",
    "Security Automation"
  ],
  authors: [{ name: "Sayed Md Rafe" }],
  openGraph: {
    title: "Sayed Md Rafe | DevSecOps & Cloud Security Consultant",
    description: "Senior Cloud Security Consultant at KPMG India specializing in multi-cloud security, DevSecOps automation, and compliance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayed Md Rafe | DevSecOps & Cloud Security",
    description: "Cloud Security Consultant | KPMG | Multi-Cloud Expert",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}