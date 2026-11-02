import { readFileSync } from "node:fs";
import { getPaths } from "./utils.ts";

const projectPaths = getPaths("PROJECTS");

for (const path of projectPaths) {
  const projectFile = readFileSync(path, "utf8");
  const projectObj = JSON.parse(projectFile);

  const projectType = projectObj.project.type;

  const maintained = projectObj.project.maintained || false;

  if (projectType === "organization" && !maintained) {
    console.log(`Check organization: ${projectObj.project.title}`);
    continue;
  }

  const dates: Record<string, string>[] = projectObj.project.date;

  const endYears: number[] = [];

  for (const date of dates) {
    if (date.to) {
      const parsed = new Date(date.to);
      const endYear: number = parsed.getFullYear();
      endYears.push(endYear);
    }
  }

  if (endYears.length === 0) {
    continue;
  }

  const latestEndYear = Math.max(...endYears);

  const currentYear = new Date().getFullYear();

  if (latestEndYear >= currentYear && !maintained) {
    console.log(path);
  }
}
