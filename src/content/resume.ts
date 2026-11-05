// Single source of truth for the resume. The page, the PDF and (later) the
// Czech version all render from this file.

export type Role = {
  title: string;
  company: string;
  companyNote?: string;
  place: string;
  start: string;
  end: string;
  summary: string;
};

export type Project = {
  name: string;
  description: string;
  href?: string;
  linkLabel?: string;
  /** Plain URL shown in the PDF instead of the link label. */
  printLink?: string;
};

export const profile = {
  name: "Jakub Slatinský",
  headline: "Senior Frontend Engineer",
  headlineNote: "open to fullstack",
  tags: ["React", "TypeScript", "AI-assisted development"],
  location: "Zbýšov u Brna, Czech Republic",
  workPreference: "Hybrid in Brno or remote",
  phone: "+420 775 210 796",
  email: "jakub.slatinsky@gmail.com",
  github: "SlatinskyJ",
  website: "jakub.slatinsky.cz",
  summary:
    "Senior frontend engineer with 9+ years in React and TypeScript, mostly in fintech: capital markets, digital banking, insurance and e-commerce finance. I solve hard technical problems, build what customers actually need, and keep code maintainable for the next person. I use AI tools daily in development and in running my own work, and want to help a team adopt AI in its engineering workflow.",
};

export const experience: Role[] = [
  {
    title: "Senior React Engineer",
    company: "CMG (Capital Markets Gateway)",
    companyNote: "via Oak's Lab",
    place: "Brno",
    start: "Nov 2024",
    end: "Sep 2026",
    summary:
      "Frontend for a US capital markets platform connecting investment banks and investors. React, TypeScript, GraphQL, Playwright.",
  },
  {
    title: "Software Developer",
    company: "Notino",
    place: "Brno",
    start: "Jan 2023",
    end: "Oct 2024",
    summary:
      "Rebuilt the internal finance system of a large European online retailer on a modern stack.",
  },
  {
    title: "Software Developer",
    company: "3Pillar Global",
    companyNote: "SDE",
    place: "Brno",
    start: "Mar 2020",
    end: "Aug 2022",
    summary: "Built a web platform for running clinical trials.",
  },
  {
    title: "Software Developer",
    company: "Adacta",
    place: "Brno",
    start: "Apr 2019",
    end: "Sep 2020",
    summary: "Developed and maintained an insurance platform in C# / .NET.",
  },
  {
    title: "Frontend Developer",
    company: "Leveris",
    place: "Brno",
    start: "Sep 2017",
    end: "Jan 2019",
    summary: "Built the web interface of a digital bank.",
  },
  {
    title: "Cognitive Developer (intern)",
    company: "IBM",
    place: "Brno",
    start: "Mar 2017",
    end: "Jun 2017",
    summary: "Cloud proof of concept for indoor tracking.",
  },
];

export const skills: { area: string; items: string[] }[] = [
  { area: "Languages", items: ["TypeScript", "JavaScript", "CSS", "C# (basic)", "SQL (basic)"] },
  {
    area: "Frontend",
    items: ["React", "Next.js", "Apollo Client", "React Query", "Material UI", "Tailwind", "styled-components", "Storybook", "Zod"],
  },
  { area: "Backend / API", items: ["Node.js", "GraphQL"] },
  {
    area: "Quality & ops",
    items: ["Jest", "Testing Library", "Playwright", "ESLint", "Docker", "Nx monorepo", "CI/CD", "Datadog", "Grafana"],
  },
  { area: "Workflow", items: ["Git", "Jira", "Confluence", "Claude Code", "AI agent workflows"] },
];

export const languages = [
  { name: "Czech", level: "native" },
  { name: "English", level: "B2+, daily work language" },
  { name: "German", level: "A2" },
];

export const education = [
  {
    school: "Masaryk University, Faculty of Informatics",
    detail: "Programmable Technical Structures (not completed)",
    years: "2016 – 2017",
  },
  {
    school: "Gymnázium Brno, tř. Kapitána Jaroše",
    detail: "Maths and physics track, maturita",
    years: "2012 – 2016",
  },
];

export const projects: Project[] = [
  {
    name: "AI-run personal workflow",
    description:
      "Self-hosted Obsidian vault on a home server, connected to Claude over MCP. AI agents file notes, track projects, draft invoices and send a morning brief to my phone.",
    href: "/ai-setup/",
    linkLabel: "How it works",
    printLink: "jakub.slatinsky.cz/ai-setup",
  },
  {
    name: "This website",
    description: "Next.js + TypeScript static site, resume data in one typed file, PDF generated in CI.",
    href: "https://github.com/SlatinskyJ/resume",
    linkLabel: "Source on GitHub",
    printLink: "github.com/SlatinskyJ/resume",
  },
  {
    name: "Drozdi",
    description: "Website for Drozdi, the Moravian cimbalom band I co-founded.",
    href: "https://www.cmdrozdi.cz/",
    linkLabel: "cmdrozdi.cz",
    printLink: "cmdrozdi.cz",
  },
];

export const outsideWork =
  "I organise a summer camp for kids with a team of close friends, play violin in Drozdi, 3D print, and enjoy maths and logic puzzles.";
