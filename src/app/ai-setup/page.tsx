import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-run personal workflow · Jakub Slatinský",
  description:
    "How I run my day-to-day with a self-hosted Obsidian vault, Claude and MCP: notes, projects, invoices and a morning brief, handled by AI agents.",
};

export default function AiSetupPage() {
  return (
    <main className="page article">
      <Link className="back" href="/">
        ← Back to resume
      </Link>

      <h1>My AI-run personal workflow</h1>
      <p className="lead">
        A self-hosted Obsidian vault that Claude can read and write from any device. AI agents keep my notes,
        projects, invoices and daily plan in order, and I review what they do.
      </p>

      <h2>Why I built it</h2>
      <p>
        I wanted one place for everything: work notes, home maintenance, my band, invoicing for gigs. I also
        wanted an assistant that could act on it, not just chat about it. Most AI tools forget everything
        between sessions. Giving the agent a durable, structured record fixes that.
      </p>

      <h2>How it fits together</h2>
      <ol className="flow">
        <li>
          <strong>The vault.</strong> Plain Markdown in Obsidian, organised by the PARA method: Inbox, Projects,
          Areas, Resources, Archive, plus Daily notes and a System folder for templates, prompts and skills.
        </li>
        <li>
          <strong>Home server.</strong> A small always-on Linux box runs a headless Obsidian Sync client, so the
          vault on the server, my Mac and my phone stay identical.
        </li>
        <li>
          <strong>MCP server.</strong> An open-source Model Context Protocol server on the same box exposes the
          vault as tools: search, read, write, edit frontmatter, append to the daily note. It is reachable over
          a private Tailscale network, never the open internet without auth.
        </li>
        <li>
          <strong>Claude as the agent.</strong> The server is added as a connector, so any Claude session (phone,
          desktop or cloud) can work with the vault. Claude Projects give each goal, like this job search, its own
          space with parallel threads and shared memory.
        </li>
        <li>
          <strong>Skills.</strong> Written instructions that teach the agent my conventions: where each kind of
          note goes, how to file a decision, how to issue a Czech invoice with my own CLI and a company lookup
          in the national ARES registry.
        </li>
        <li>
          <strong>Routines.</strong> A scheduled agent writes a morning brief with what is due, new mail and the
          day&apos;s calendar. A systemd timer then counts overdue tasks and pushes a short summary to my phone
          through a self-hosted ntfy server.
        </li>
      </ol>

      <h2>What it does for me</h2>
      <ul>
        <li>Files and links notes from a one-line message, so the inbox stays near empty.</li>
        <li>Keeps project notes current: status, next step and a dated log after every piece of work.</li>
        <li>Issues and tracks invoices for my side gigs and sums income for the tax return.</li>
        <li>Gives me one morning push instead of checking five apps.</li>
        <li>
          Helped build this resume: pulled exact job dates from old offer and leaving emails, drafted the text and
          built this site.
        </li>
      </ul>

      <h2>What I learned</h2>
      <ul>
        <li>
          <strong>Structure beats prompts.</strong> A clear folder scheme and frontmatter do more for agent quality
          than clever instructions.
        </li>
        <li>
          <strong>Agents should write the record.</strong> Every change ends with a dated note of what was done and
          why, so the next session starts with context.
        </li>
        <li>
          <strong>Humans approve the irreversible.</strong> Agents draft emails, invoices and changes freely, but
          anything sent or deleted waits for me.
        </li>
        <li>
          <strong>Build, then drop what the platform covers.</strong> I wrote a Go + tmux workspace for running
          parallel coding agents. When Claude Projects solved the same pains, I retired it.
        </li>
      </ul>

      <h2>What I can bring to a team</h2>
      <p>
        The same habits work for an engineering team moving to AI: shared, structured context for agents; clear
        conventions written down as skills; small automations that remove routine work; and review gates where
        mistakes are expensive. I&apos;m happy to help a team set this up while shipping product work.
      </p>

      <p>
        <Link href="/">← Back to resume</Link>
      </p>
    </main>
  );
}
