import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One entry per language (en.json now, cs.json later). The resume page,
// the PDF and /ai-setup all render from this single source.
const motif = z.enum(["tulip", "rosette", "heart", "sprig"]);

const resume = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/resume" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    roleNote: z.string(),
    summary: z.string(),
    location: z.string(),
    email: z.email(),
    phone: z.string(),
    github: z.string(),
    website: z.string(),
    experience: z
      .array(
        z.object({
          years: z.string(),
          company: z.string(),
          title: z.string(),
          line: z.string(),
          motif,
        }),
      )
      .min(1),
    skills: z.array(z.object({ group: z.string(), items: z.array(z.string()).min(1) })),
    projects: z
      .array(
        z.object({
          name: z.string(),
          text: z.string(),
          href: z.string(),
          linkLabel: z.string(),
          printLink: z.string(),
          featured: z.boolean().default(false),
        }),
      )
      .length(3),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
    education: z.array(z.object({ school: z.string(), years: z.string(), detail: z.string().optional() })),
    outsideWork: z.string(),
    ui: z.object({
      nav: z.object({ resume: z.string(), ai: z.string(), pdf: z.string() }),
      sections: z.object({
        experience: z.string(),
        skills: z.string(),
        projects: z.string(),
        languages: z.string(),
        education: z.string(),
      }),
      downloadPdf: z.string(),
      portraitAlt: z.string(),
    }),
  }),
});

export const collections = { resume };
