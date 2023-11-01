import fs from "fs";
import path from "path";
import { Remarkable } from "remarkable";

const md = new Remarkable();

export function renderMarkdownFT(filename: string): string {
  // Path to your markdown files
  const filePath = path.join(
    process.cwd(),
    "data",
    "full-transcripts",
    filename
  );

  // Read the file content
  const rawContent = fs.readFileSync(filePath, "utf-8");

  // Return the rendered content
  return md.render(rawContent);
}

export function renderMarkdownPT(filename: string): string {
  // Path to your markdown files
  const filePath = path.join(
    process.cwd(),
    "data",
    "parsed-transcripts",
    filename
  );

  // Read the file content
  const rawContent = fs.readFileSync(filePath, "utf-8");

  // Return the rendered content
  return md.render(rawContent);
}

export function renderMarkdownPrompt(filename: string): string {
  // Path to your markdown files
  const filePath = path.join(process.cwd(), "data", filename);

  // Read the file content
  const rawContent = fs.readFileSync(filePath, "utf-8");

  // Return the rendered content
  return md.render(rawContent);
}
