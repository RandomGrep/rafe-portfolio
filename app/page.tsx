"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  Download,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Shield,
  Cloud,
  Lock,
  Server,
  CheckCircle2,
  Award,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Terminal,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", updateCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button']"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${id}`);
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Custom Cursor */}
      <div
        id="custom-cursor"
        className={isHovering ? "hovering" : ""}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="font-bold text-lg lg:text-xl text-primary-foreground">
                    SR
                  </span>
                </div>
              </div>
              <span className="hidden sm:block font-semibold text-base lg:text-lg">
                Sayed Md Rafe
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden sm:flex"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              <Button
                onClick={() => window.open("/resume.pdf", "_blank")}
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2 hover:bg-primary hover:text-white hover:border-primary"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Resume</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:bg-primary hover:text-white"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/sayed-md-rafe-108a8b137"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-xl">
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {item.label}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
                <Separator />

                <Button
                  variant="outline"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full gap-2"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-0">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Avatar className="relative w-80 h-80 lg:w-80 lg:h-80 border-4 border-primary/50 shadow-2xl">
  <AvatarImage className="w-76 h-86" src="/profile.png" alt="Sayed Md Rafe" />
  <AvatarFallback className="text-7xl lg:text-9xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
    SR
  </AvatarFallback>
</Avatar>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="space-y-2">
                <p className="text-sm lg:text-base font-medium text-primary flex items-center gap-2 justify-center lg:justify-start">
                  <Shield className="w-4 h-4" />
                  Cloud Security Consultant
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                  Sayed Md{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Rafe
                  </span>
                </h1>
              </div>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                Senior Manager | Risk Management | Cloud and DevSecOps
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>ICICI Lombard</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                <Button
                  size="lg"
                  onClick={() => scrollTo("experience")}
                  className="gap-2 shadow-lg shadow-primary/25"
                >
                  View My Work
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("contact")}
                  className="gap-2 hover:bg-primary hover:text-white hover:border-primary"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">
                    4+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Years Exp.
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">
                    15+
                  </div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">
                    6+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Certifications
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-12 lg:py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Professional Profile
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Experienced in Cloud Security Assessment and DevSecOps
              implementations, with a strong focus on securing multi-cloud
              environments across{" "}
              <span className="text-primary font-semibold">
                AWS, Azure, and GCP
              </span>{" "}
              through automation, compliance enforcement, and CI/CD integration.
              Skilled in container security, Docker and Kubernetes hardening,
              and developing cloud governance frameworks including{" "}
              <span className="text-primary font-semibold">
                IAM, SCPs, and cloud policies
              </span>
              . Proficient in implementing security tools like{" "}
              <span className="text-primary font-semibold">
                Prisma Cloud, Checkmarx, Veracode, PingSafe
              </span>
              , and Microsoft Defender for Cloud. Expert in Resilience planning
              to strengthen business continuity. Demonstrated expertise in RBI
              compliance gap assessments, third-party risk management, and
              regulatory audit closures. Experienced in{" "}
              <span className="text-primary font-semibold">
                NIST 800-171 and CIS
              </span>{" "}
              control-based audits, vulnerability management, and SOC
              coordination to ensure secure and compliant operations across
              enterprise systems.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Briefcase className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
            <h2 className="text-3xl lg:text-5xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-12 relative">
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent"></div>

            {/* ICICI Lombard */}
            <Card className="relative border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="hidden lg:flex absolute -left-8 top-8 w-16 h-16 rounded-full bg-white items-center justify-center border-4 border-background shadow-lg overflow-hidden">
                <Image
                  src="/icici-lombard-logo.jpg"
                  alt="ICICI Lombard"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <CardHeader className="lg:ml-12">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="lg:hidden w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                        <Image
                          src="/icici-lombard-logo.jpg"
                          alt="ICICI Lombard"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl">
                        Senior Manager – Risk Management (Cloud)
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      <span className="font-semibold text-foreground">
                        ICICI Lombard
                      </span>{" "}
                      • Mumbai, India
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <Badge className="w-fit bg-primary/20 text-primary border-primary/50">
                      Feb 2025 - Present
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Current Role
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-12 space-y-4">
                <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Manage cloud risk governance across AWS, Azure, and GCP, ensuring compliance with ISO 27001, NIST, CIS benchmarks, and RBI/IRDAI guidelines
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Oversee cloud security posture management using Prisma Cloud and Wiz, identifying misconfigurations and driving risk reduction
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Review and approve secure cloud architecture designs, including IAM, network security, encryption, and logging controls
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Ensure security controls are integrated into CI/CD pipelines and conduct mandatory pre-go-live security assessments
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Manage vulnerability scanning and remediation across cloud workloads, containers, and applications, ensuring closure within defined timelines
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Oversee web and API security controls, including WAF governance using F5 Networks, bot protection, and exposure monitoring
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Monitor and improve cloud compliance posture using Microsoft Defender for Cloud and native security services
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Support AI security governance by assessing risks related to model misuse, prompt injection, data leakage, and secure AI deployment
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Coordinate with DevOps, infrastructure, SOC, and GRC teams to ensure consistent implementation of security controls
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Support internal and external audits by providing cloud security evidence, risk reports, and timely remediation of observations
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* KPMG */}
            <Card className="relative border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="hidden lg:flex absolute -left-8 top-8 w-16 h-16 rounded-full bg-white items-center justify-center border-4 border-background shadow-lg overflow-hidden">
                <Image
                  src="/kpmg.jpg"
                  alt="KPMG India"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <CardHeader className="lg:ml-12">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="lg:hidden w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                        <Image
                          src="/kpmg.jpg"
                          alt="KPMG India"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl">
                        Consultant
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      <span className="font-semibold text-foreground">
                        KPMG India
                      </span>{" "}
                      • Mumbai, India
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    Nov 2024 - Jan 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-12 space-y-4">
                <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Performed comprehensive Cloud Security Assessments across
                      AWS, Azure, and GCP, identifying gaps, enforcing
                      compliance, and implementing cloud-native security
                      controls
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Led DevOps and DevSecOps Security Implementations,
                      integrating automated security checks within CI/CD
                      pipelines for secure software delivery
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Conducted Docker and Kubernetes Hardening, improving
                      container security and minimizing attack surfaces
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Developed and enforced Cloud Governance Frameworks,
                      including IAM Policies, SCPs, and Cloud Security Baselines
                      for multi-cloud environments
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Executed IT Risk Assessments and implemented a robust IT
                      Risk Management Framework aligned with business and
                      regulatory objectives
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Designed and executed Business Impact Analysis (BIA) and
                      Operational Resilience Assessments, identifying critical
                      operations and infrastructure dependencies
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Implemented a Third-Party Risk Management Framework,
                      including vendor classification, scoring templates, and
                      pre-onboarding risk checks for SaaS and cloud providers
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Conducted RBI Guidance Note-based Gap Assessments and
                      Regulatory Audit Closures, ensuring compliance with
                      outsourcing and security guidelines
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Performed NIST 800-171 and CIS-based Security Audits,
                      Vulnerability Assessments, and coordinated with the SOC
                      for incident detection and remediation
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Developed and enhanced key Governance and Security
                      Policies, including Cyber Security, Cloud Security, IAM,
                      IT Risk, and SLA Security Clauses
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* eSec Forte */}
            <Card className="relative border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="hidden lg:flex absolute -left-8 top-8 w-16 h-16 rounded-full bg-white items-center justify-center border-4 border-background shadow-lg overflow-hidden">
                <Image
                  src="/eseclogo.png"
                  alt="eSec Forte Technologies"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <CardHeader className="lg:ml-12">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="lg:hidden w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                        <Image
                          src="/eseclogo.png"
                          alt="eSec Forte Technologies"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl">
                        Cloud Security Engineer (Team Lead)
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      <span className="font-semibold text-foreground">
                        eSec Forte Technologies
                      </span>{" "}
                      • Mumbai, India
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    Jan 2023 - Nov 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-12 space-y-4">
                <p className="text-sm lg:text-base font-medium text-foreground">
                  Working as Team Lead and SPOC for the Lombard on behalf of
                  eSec Forte
                </p>
                <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Develop and enforce cloud security policies and procedures
                      in accordance with industry standards such as ISO 27001,
                      PCI DSS, NIST benchmarks and NIST and MITRE ATT&CK
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Worked closely with development teams to ensure secure
                      application deployment using DevSecOps methodologies
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Designed and implemented end-to-end CI/CD pipelines,
                      utilizing tools like Jenkins and AWS code pipeline to
                      automate the build, test, secure and deployment processes
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Implemented Docker containerization for application
                      deployment, enhancing scalability and portability while
                      streamlining development-to-production workflows
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Orchestrated Kubernetes clusters for efficient container
                      orchestration, automating deployment, scaling, and
                      management of monolithic microservices applications
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Integrated Security tools like Gitleaks, Checkov, Prisma
                      Cloud, Checkmarx, Dependabot, Veracode, anchor syft,
                      Qualys and Prisma Defender and Selenium into Jenkins
                      pipeline as well as AWS code pipeline
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Lambda function to automate the process of agents
                      installation on EC2 instances using services i.e. SSM,
                      Secret manager, IAM role and lambda
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Designed and deployed new AWS Service Control Policy (SCP)
                      to meet specific business requirements, showcasing a
                      strong understanding of AWS architecture and a
                      results-driven approach to cloud security management
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Prisma Cloud onboarding cloud account, integration of new
                      service and alerts and inventory management and Computes
                      workload management for single host or containers or ecs,
                      aks, eks, app embedded and many more activities
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Alert burn down and incident investigation and closure
                      within SLA timeline
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Compliance standard enforcement - NIST, MITRE, CIS, RBI,
                      etc
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Left Right Mind */}
            <Card className="relative border-border hover:border-primary/30 transition-all duration-300">
              <div className="hidden lg:flex absolute -left-8 top-8 w-16 h-16 rounded-full bg-white items-center justify-center border-4 border-background shadow-lg overflow-hidden">
                <Image
                  src="/leftrightmind.png"
                  alt="Left Right Mind Pvt Ltd"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <CardHeader className="lg:ml-12">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="lg:hidden w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                        <Image
                          src="/leftrightmind.png"
                          alt="Left Right Mind Pvt Ltd"
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl">
                        Junior DevOps Engineer
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      <span className="font-semibold text-foreground">
                        Left Right Mind Pvt Ltd
                      </span>{" "}
                      • Pune, Maharashtra
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    Nov 2021 - Jan 2023
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-12 space-y-4">
                <ul className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Established Continuous-Deployment pipelines for Java,
                      Angular, React, and other applications across Dev, QA,
                      UAT, and Prod environments
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Designed and implemented end-to-end CI/CD pipelines,
                      utilizing tools like Jenkins and GitLab CI, to automate
                      the build, test, and deployment processes
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Implemented Docker containerization for application
                      deployment, enhancing scalability and portability while
                      streamlining development-to-production workflows
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Creating Architecture and implementation of the cloud
                      infrastructure for the applications
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Skill sets: AWS, Jenkins, Docker, GitLab, Tomcat and
                      Linux, etc
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-12 lg:py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Terminal className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
            <h2 className="text-3xl lg:text-5xl font-bold">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Cloud className="w-5 h-5 text-primary" />
                  Cloud Platforms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "Azure", "Google Cloud"].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="w-5 h-5 text-primary" />
                  Cloud Security & Feature Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "CSPM",
                    "CWPP",
                    "CNAPP",
                    "Cloud Infrastructure Security",
                    "GRC",
                    "DSPM",
                    "WAAS",
                    "CIEM",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lock className="w-5 h-5 text-primary" />
                  DevSecOps & CI/CD Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Jenkins",
                    "Docker",
                    "GitLab CI",
                    "JFrog",
                    "Kubernetes",
                    "Terraform",
                    "CloudFormation",
                    "Gitleaks",
                    "Checkov",
                    "Prisma Cloud",
                    "Checkmarx",
                    "Veracode",
                    "Dependabot",
                    "Trivy",
                    "Qualys",
                    "Selenium",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Server className="w-5 h-5 text-primary" />
                  Cloud Security Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Prisma Cloud",
                    "Wiz",
                    "PingSafe",
                    "Microsoft Defender",
                    "Tenable Cloud Security",
                    "Lambda Functions",
                    "Automation Solutions",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Regulatory Frameworks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "RBI Guidance Note",
                    "IRDAI Guidelines",
                    "ISO 27001",
                    "NIST 800-171",
                    "CIS Benchmarks",
                    "MITRE ATT&CK",
                    "PCI DSS",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Terminal className="w-5 h-5 text-primary" />
                  Additional Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "Shell Scripting",
                    "Prometheus",
                    "CloudWatch",
                    "Zabbix",
                    "Git",
                    "Bitbucket",
                    "RQL",
                    "System Hardening",
                    "Vulnerability Assessment",
                    "Postman",
                    "F5 Networks WAF",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Server className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
            <h2 className="text-3xl lg:text-5xl font-bold">
              Key Projects & Clients
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "ICICI LOMBARD",
                description:
                  "General Insurance (Team Lead for Managed Cloud Security Services)",
                icon: Shield,
              },
              {
                title: "IndusInd Bank",
                description: "PingSafe Implementation Engineer",
                icon: Lock,
              },
              {
                title: "Care Insurance",
                description: "Cloud Audits and PingSafe",
                icon: Cloud,
              },
              {
                title: "Axis Bank",
                description: "Compute Workload Protection",
                icon: Server,
              },
              {
                title: "HDFC BANK",
                description: "Prisma Cloud Security",
                icon: Shield,
              },
              {
                title: "Jio",
                description:
                  "RBI Guidance Note Assessment and Critical Operation Identification",
                icon: CheckCircle2,
              },
              {
                title: "Bandhan Life",
                description: "Identity Access Management Process Review",
                icon: Lock,
              },
              {
                title: "Akamai Technical",
                description: "Implementation Review for IDFC",
                icon: Server,
              },
              {
                title: "NIST 800-171",
                description: "R3 Risk Assessment for Amdocs",
                icon: Shield,
              },
              {
                title: "Piramal Finance",
                description:
                  "IT and IS Audit for IT Outsourcing and IT GRC Guidelines Audit",
                icon: CheckCircle2,
              },
            ].map((project, index) => {
              const Icon = project.icon;
              return (
                <Card
                  key={index}
                  className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                >
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & EDUCATION */}
      <section id="certifications" className="py-12 lg:py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Award className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Certifications
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  "Digital and Data Foundations - Cloud, Technology, Platforms and Security",
                  "AZ-900, AZ-500",
                  "Wiz and SentinelOne Cloud Security Professional",
                  "Palo Alto Networks Certified Cloud Security Professional",
                  "AWS Cloud Practitioner Training",
                  "Calo Certified Associate (CCA)",
                  "QA Automation (Selenium)",
                ].map((cert, index) => (
                  <Card
                    key={index}
                    className="group hover:border-primary/50 transition-all duration-300"
                  >
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm lg:text-base font-medium">{cert}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                <GraduationCap className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                <h2 className="text-3xl lg:text-4xl font-bold">Education</h2>
              </div>

              <div className="space-y-6">
                <Card className="border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Computer Science and Engineering (B.E)
                    </CardTitle>
                    <CardDescription>2017-2021 (7.47 CGPA)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      University of Mumbai (SSJCET)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      HSC (Maharashtra Board)
                    </CardTitle>
                    <CardDescription>2015-17 (64%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Aryan Junior College of Arts, Commerce and Science
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      SSC (10th) (Central Board of Secondary Education)
                    </CardTitle>
                    <CardDescription>2014-15 (9.6 CGPA)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Little Flower International School
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Achievements</h3>
                <div className="grid gap-4">
                  {[
                    "Appreciated for thoughtful initiatives and implementing DevSecOps process and standardization at my workplace",
                    "In Recognition and appreciation for the contribution over the year in the organization awarded by Super Star",
                    "Attended the BLUEHAT 2024 organized by MSRC first time in India",
                  ].map((achievement, index) => (
                    <Card
                      key={index}
                      className="group hover:border-accent/50 transition-all duration-300"
                    >
                      <CardContent className="flex items-start gap-3 p-6">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {achievement}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Interested in cloud security consulting or DevSecOps
            implementations? Feel free to reach out!
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Card className="group hover:border-primary/50 transition-all duration-300">
              <CardContent className="flex flex-col items-center gap-4 p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <a
                    href="mailto:mdrafe549@gmail.com"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    mdrafe549@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-300">
              <CardContent className="flex flex-col items-center gap-4 p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Phone</p>
                  <a
                    href="tel:+918318524931"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    +91-8318524931
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="gap-2">
              <a
                href="https://www.linkedin.com/in/sayed-md-rafe-108a8b137"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="gap-2 hover:bg-primary hover:text-white hover:border-primary"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-bold text-lg text-primary-foreground">
                  SR
                </span>
              </div>
              <div className="text-sm">
                <p className="font-semibold">Sayed Md Rafe</p>
                <p className="text-muted-foreground">
                  Senior Manager - Risk Management - Cloud & DevSecOps
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="mailto:mdrafe549@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sayed-md-rafe-108a8b137"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="tel:+918318524931"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 Sayed Md Rafe. All rights reserved.</p>
            <p>Built with Next.js 16 + Tailwind CSS 4 + shadcn/ui</p>
          </div>
        </div>
      </footer>
    </main>
  );
}