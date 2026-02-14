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
      'a, button, [role="button"], input, textarea, select'
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] w-6 h-6 rounded-full border-2 border-primary/60 transition-transform duration-75 mix-blend-difference ${
          isHovering ? "scale-150 bg-primary/30" : "scale-100 bg-transparent"
        }`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
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
              aria-label="Go to top"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
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
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/80"
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
                aria-label="Toggle theme"
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
                className="hidden sm:flex gap-2 hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Resume</span>
              </Button>

              <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                <a
                  href="https://www.linkedin.com/in/sayed-md-rafe-108a8b137"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-5 fade-in-20">
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center justify-between w-full px-5 py-4 text-base font-medium hover:bg-secondary rounded-xl transition-colors"
                  >
                    {item.label}
                    <ChevronRight className="w-5 h-5 opacity-70" />
                  </button>
                ))}
                <Separator className="my-4" />
                <Button
                  variant="outline"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full justify-start gap-3 text-base py-6"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-5 h-5" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" /> Dark Mode
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  className="w-full justify-start gap-3 text-base py-6"
                >
                  <Download className="w-5 h-5" /> Download Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-0">
        <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
              <Avatar className="relative w-56 h-56 lg:w-72 lg:h-72 border-8 border-background shadow-2xl ring-2 ring-primary/30">
                <AvatarImage src="/profile.jpg" alt="Sayed Md Rafe" />
                <AvatarFallback className="text-8xl font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  SR
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Shield className="w-4 h-4" /> Cloud Security Consultant
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  Sayed Md{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Rafe
                  </span>
                </h1>
              </div>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl">
                DevSecOps • Cloud Security • InfoSec • Risk Audit & Compliance (GRC)
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-base text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>KPMG India</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
                <Button
                  size="lg"
                  onClick={() => scrollTo("experience")}
                  className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40"
                >
                  View My Work
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("contact")}
                  className="gap-2 hover:bg-primary hover:text-primary-foreground"
                >
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-10 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground mt-1">Years Exp.</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground mt-1">Projects</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-primary">6+</div>
                  <div className="text-sm text-muted-foreground mt-1">Certifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Professional Profile</h2>
            <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
              Experienced in Cloud Security Assessment and DevSecOps implementations, with a strong
              focus on securing multi-cloud environments across{" "}
              <span className="text-primary font-semibold">AWS, Azure, and GCP</span> through
              automation, compliance enforcement, and CI/CD integration. Skilled in container
              security, Docker and Kubernetes hardening, and developing cloud governance frameworks
              including{" "}
              <span className="text-primary font-semibold">IAM, SCPs, and cloud policies</span>.
              Proficient in implementing security tools like{" "}
              <span className="text-primary font-semibold">
                Prisma Cloud, Checkmarx, Veracode, PingSafe
              </span>
              , and Microsoft Defender for Cloud. Expert in Resilience planning to strengthen
              business continuity. Demonstrated expertise in RBI compliance gap assessments,
              third-party risk management, and regulatory audit closures. Experienced in{" "}
              <span className="text-primary font-semibold">NIST 800-171 and CIS</span> control-based
              audits, vulnerability management, and SOC coordination to ensure secure and compliant
              operations across enterprise systems.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4 mb-16">
            <Briefcase className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Work Experience</h2>
          </div>

          <div className="space-y-16 relative">
            <div className="hidden lg:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent"></div>

            {/* KPMG */}
            <Card className="relative border-primary/40 hover:border-primary/70 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="hidden lg:flex absolute -left-10 top-10 w-20 h-20 rounded-2xl bg-background items-center justify-center border-4 border-background shadow-xl overflow-hidden">
                <Image
                  src="/kpmg.jpg"
                  alt="KPMG"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <CardHeader className="lg:ml-16">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="lg:hidden w-16 h-16 rounded-xl bg-background flex items-center justify-center shadow-lg overflow-hidden">
                        <Image
                          src="/kpmg.jpg"
                          alt="KPMG"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl">Consultant</CardTitle>
                    </div>
                    <CardDescription className="text-lg">
                      <span className="font-semibold text-foreground">KPMG India</span> • Mumbai,
                      India
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <Badge className="text-base px-4 py-1 bg-primary/15 text-primary border-primary/30">
                      Nov 2024 – Present
                    </Badge>
                    <span className="text-sm text-muted-foreground">Current Role</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-16 space-y-6 pt-6">
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Performed comprehensive Cloud Security Assessments across AWS, Azure, and GCP,
                      identifying gaps, enforcing compliance, and implementing cloud-native security
                      controls
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Led DevOps and DevSecOps Security Implementations, integrating automated
                      security checks within CI/CD pipelines for secure software delivery
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Conducted Docker and Kubernetes Hardening, improving container security and
                      minimizing attack surfaces
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Developed and enforced Cloud Governance Frameworks, including IAM Policies,
                      SCPs, and Cloud Security Baselines for multi-cloud environments
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Executed IT Risk Assessments and implemented a robust IT Risk Management
                      Framework aligned with business and regulatory objectives
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Designed and executed Business Impact Analysis (BIA) and Operational
                      Resilience Assessments, identifying critical operations and infrastructure
                      dependencies
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Implemented a Third-Party Risk Management Framework, including vendor
                      classification, scoring templates, and pre-onboarding risk checks for SaaS and
                      cloud providers
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Conducted RBI Guidance Note-based Gap Assessments and Regulatory Audit
                      Closures, ensuring compliance with outsourcing and security guidelines
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Performed NIST 800-171 and CIS-based Security Audits, Vulnerability
                      Assessments, and coordinated with the SOC for incident detection and
                      remediation
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Developed and enhanced key Governance and Security Policies, including Cyber
                      Security, Cloud Security, IAM, IT Risk, and SLA Security Clauses
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* eSec Forte */}
            <Card className="relative hover:border-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
              <div className="hidden lg:flex absolute -left-10 top-10 w-20 h-20 rounded-2xl bg-background items-center justify-center border-4 border-background shadow-xl overflow-hidden">
                <Image
                  src="/eseclogo.ico"
                  alt="eSec Forte"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-3"
                />
              </div>
              <CardHeader className="lg:ml-16">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="lg:hidden w-16 h-16 rounded-xl bg-background flex items-center justify-center shadow-lg overflow-hidden">
                        <Image
                          src="/eseclogo.ico"
                          alt="eSec Forte"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-3"
                        />
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl">
                        Cloud Security Engineer (Team Lead)
                      </CardTitle>
                    </div>
                    <CardDescription className="text-lg">
                      <span className="font-semibold text-foreground">eSec Forte Technologies</span>{" "}
                      • Mumbai, India
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-base px-4 py-1">
                    Jan 2023 – Nov 2024
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-16 space-y-6 pt-6">
                <p className="text-lg font-medium">
                  Working as Team Lead and SPOC for the Lombard on behalf of eSec Forte
                </p>
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Develop and enforce cloud security policies and procedures in accordance with
                      industry standards such as ISO 27001, PCI DSS, NIST benchmarks and NIST and
                      MITRE ATT&CK
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Worked closely with development teams to ensure secure application deployment
                      using DevSecOps methodologies
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Designed and implemented end-to-end CI/CD pipelines, utilizing tools like
                      Jenkins and AWS code pipeline to automate the build, test, secure and
                      deployment processes
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Implemented Docker containerization for application deployment, enhancing
                      scalability and portability while streamlining development-to-production
                      workflows
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Orchestrated Kubernetes clusters for efficient container orchestration,
                      automating deployment, scaling, and management of monolithic microservices
                      applications
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Integrated Security tools like Gitleaks, Checkov, Prisma Cloud, Checkmarx,
                      Dependabot, Veracode, anchor syft, Qualys and Prisma Defender and Selenium
                      into Jenkins pipeline as well as AWS code pipeline
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Lambda function to automate the process of agents installation on EC2
                      instances using services i.e. SSM, Secret manager, IAM role and lambda
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Designed and deployed new AWS Service Control Policy (SCP) to meet specific
                      business requirements, showcasing a strong understanding of AWS architecture
                      and a results-driven approach to cloud security management
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>
                      Prisma Cloud onboarding cloud account, integration of new service and alerts
                      and inventory management and Computes workload management for single host or
                      containers or ecs, aks, eks, app embedded and many more activities
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>Alert burn down and incident investigation and closure within SLA timeline</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <span>Compliance standard enforcement - NIST, MITRE, CIS, RBI, etc</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Left Right Mind */}
            <Card className="relative hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="hidden lg:flex absolute -left-10 top-10 w-20 h-20 rounded-2xl bg-background items-center justify-center border-4 border-background shadow-xl overflow-hidden">
                <Image
                  src="/leftrightmind.png"
                  alt="Left Right Mind"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <CardHeader className="lg:ml-16">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="lg:hidden w-16 h-16 rounded-xl bg-background flex items-center justify-center shadow-lg overflow-hidden">
                        <Image
                          src="/leftrightmind.png"
                          alt="Left Right Mind"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <CardTitle className="text-2xl lg:text-3xl">Junior DevOps Engineer</CardTitle>
                    </div>
                    <CardDescription className="text-lg">
                      <span className="font-semibold text-foreground">Left Right Mind Pvt Ltd</span>{" "}
                      • Pune, Maharashtra
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-base px-4 py-1">
                    Nov 2021 – Jan 2023
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="lg:ml-16 space-y-6 pt-6">
                <ul className="space-y-4 text-base text-muted-foreground">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Established Continuous-Deployment pipelines for Java, Angular, React, and
                      other applications across Dev, QA, UAT, and Prod environments
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Designed and implemented end-to-end CI/CD pipelines, utilizing tools like
                      Jenkins and GitLab CI, to automate the build, test, and deployment processes
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Implemented Docker containerization for application deployment, enhancing
                      scalability and portability while streamlining development-to-production
                      workflows
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>
                      Creating Architecture and implementation of the cloud infrastructure for the
                      applications
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <span>Skill sets: AWS, Jenkins, Docker, GitLab, Tomcat and Linux, etc</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4 mb-16">
            <Terminal className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Cloud className="w-6 h-6 text-primary" />
                  Cloud Platforms
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {["AWS", "Azure", "Google Cloud"].map((s) => (
                  <Badge key={s} variant="secondary" className="text-base px-4 py-2">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="w-6 h-6 text-primary" />
                  Cloud Security & Feature Management
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {[
                  "CSPM",
                  "CWPP",
                  "CNAPP",
                  "Cloud Infrastructure Security",
                  "GRC",
                  "DSPM",
                  "WAAS",
                  "CIEM",
                ].map((s) => (
                  <Badge key={s} variant="secondary" className="text-base px-4 py-2">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Lock className="w-6 h-6 text-primary" />
                  DevSecOps & CI/CD Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
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
                ].map((s) => (
                  <Badge key={s} variant="secondary" className="text-base px-4 py-2">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Server className="w-6 h-6 text-primary" />
                  Cloud Security Solutions
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {[
                  "Prisma Cloud",
                  "PingSafe",
                  "Microsoft Defender",
                  "Tenable Cloud Security",
                  "Lambda Functions",
                  "Automation Solutions",
                ].map((s) => (
                  <Badge key={s} variant="secondary" className="text-base px-4 py-2">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Regulatory Frameworks
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {[
                  "RBI Guidance Note",
                  "ISO 27001",
                  "NIST 800-171",
                  "CIS Benchmarks",
                  "MITRE ATT&CK",
                  "PCI DSS",
                ].map((s) => (
                  <Badge key={s} variant="secondary" className="text-base px-4 py-2">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Terminal className="w-6 h-6 text-primary" />
                  Additional Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
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
                ].map((s) => (
                  <Badge key={s} variant="secondary" className="text-base px-4 py-2">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4 mb-16">
            <Server className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Key Projects & Clients
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "ICICI LOMBARD", desc: "General Insurance (Team Lead for Managed Cloud Security Services)", icon: Shield },
              { title: "IndusInd Bank", desc: "PingSafe Implementation Engineer", icon: Lock },
              { title: "Care Insurance", desc: "Cloud Audits and PingSafe", icon: Cloud },
              { title: "Axis Bank", desc: "Compute Workload Protection", icon: Server },
              { title: "HDFC BANK", desc: "Prisma Cloud Security", icon: Shield },
              { title: "Jio", desc: "RBI Guidance Note Assessment and Critical Operation Identification", icon: CheckCircle2 },
              { title: "Bandhan Life", desc: "Identity Access Management Process Review", icon: Lock },
              { title: "Akamai Technical", desc: "Implementation Review for IDFC", icon: Server },
              { title: "NIST 800-171", desc: "R3 Risk Assessment for Amdocs", icon: Shield },
              { title: "Piramal Finance", desc: "IT and IS Audit for IT Outsourcing and IT GRC Guidelines Audit", icon: CheckCircle2 },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <Card
                  key={i}
                  className="group hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="pt-8 pb-10 space-y-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & EDUCATION */}
      <section id="certifications" className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <Award className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Certifications</h2>
              </div>
              <div className="space-y-6">
                {[
                  "Digital and Data Foundations - Cloud, Technology, Platforms and Security",
                  "AZ-900, AZ-500",
                  "Wiz and SentinelOne Cloud Security Professional",
                  "Palo Alto Networks Certified Cloud Security Professional",
                  "AWS Cloud Practitioner Training",
                  "Calo Certified Associate (CCA)",
                  "QA Automation (Selenium)",
                ].map((cert, i) => (
                  <Card key={i} className="hover:border-primary/50 transition-colors">
                    <CardContent className="flex items-center gap-5 p-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-lg font-medium leading-snug">{cert}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-12">
                <GraduationCap className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Education</h2>
              </div>
              <div className="space-y-6">
                <Card className="border-primary/40">
                  <CardHeader>
                    <CardTitle className="text-2xl">Computer Science and Engineering (B.E)</CardTitle>
                    <CardDescription className="text-lg">2017-2021 (7.47 CGPA)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground">University of Mumbai (SSJCET)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">HSC (Maharashtra Board)</CardTitle>
                    <CardDescription className="text-lg">2015-17 (64%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground">
                      Aryan Junior College of Arts, Commerce and Science
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      SSC (10th) (Central Board of Secondary Education)
                    </CardTitle>
                    <CardDescription className="text-lg">2014-15 (9.6 CGPA)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground">Little Flower International School</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-16">
                <h3 className="text-3xl font-bold mb-8">Achievements</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {[
                    "Appreciated for thoughtful initiatives and implementing DevSecOps process and standardization at my workplace",
                    "In Recognition and appreciation for the contribution over the year in the organization awarded by Super Star",
                    "Attended the BLUEHAT 2024 organized by MSRC first time in India",
                  ].map((ach, i) => (
                    <Card key={i} className="hover:border-accent/50 transition-colors">
                      <CardContent className="flex items-start gap-4 p-6">
                        <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                        <p className="text-base leading-relaxed text-muted-foreground">{ach}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-8">Let's Connect</h2>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Interested in cloud security consulting or DevSecOps implementations? Feel free to reach
            out!
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="flex flex-col items-center gap-6 p-10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="text-lg text-muted-foreground mb-3">Email</p>
                  <a
                    href="mailto:mdrafe549@gmail.com"
                    className="text-2xl font-medium hover:text-primary transition-colors"
                  >
                    mdrafe549@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="flex flex-col items-center gap-6 p-10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="text-lg text-muted-foreground mb-3">Phone</p>
                  <a
                    href="tel:+918318524931"
                    className="text-2xl font-medium hover:text-primary transition-colors"
                  >
                    +91 83185 24931
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" asChild className="gap-3 text-lg px-8 py-7">
              <a
                href="https://www.linkedin.com/in/sayed-md-rafe-108a8b137"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" />
                Connect on LinkedIn
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("/resume.pdf", "_blank")}
              className="gap-3 text-lg px-8 py-7 hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="w-6 h-6" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/20 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="font-bold text-2xl text-primary-foreground">SR</span>
              </div>
              <div>
                <p className="font-semibold text-lg">Sayed Md Rafe</p>
                <p className="text-muted-foreground">Cloud Security Consultant</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <a
                href="mailto:mdrafe549@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-7 h-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/sayed-md-rafe-108a8b137"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-7 h-7" />
              </a>
              <a
                href="tel:+918318524931"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-7 h-7" />
              </a>
            </div>
          </div>

          <Separator className="my-10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Sayed Md Rafe. All rights reserved.</p>
            <p>Built with Next.js • Tailwind CSS • shadcn/ui</p>
          </div>
        </div>
      </footer>
    </main>
  );
}