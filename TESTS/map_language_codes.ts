import { readFileSync, writeFileSync } from "node:fs";
import { getPaths } from "./utils.ts";

const projectPaths = getPaths("PROJECTS");

let langs: string[] = [];

for (const path of projectPaths) {
  const projectFile = readFileSync(path, "utf8");
  const projectObj = JSON.parse(projectFile);

  const projectLangs: string[] = projectObj.project.lang;
  const researchLangs: string[] = projectObj.project.research_data.lang;

  langs = [...langs, ...projectLangs, ...researchLangs];
}

const langsSet = new Set(langs);
const langsConsolidated = Array.from(langsSet);
langsConsolidated.sort();

const fullLangsFile = readFileSync("TESTS/language_codes_all.json", "utf8");
const fullLangs: Record<string, string> = JSON.parse(fullLangsFile);

const selectedLangs: Record<string, string> = {};

for (const lang of langsConsolidated) {
  selectedLangs[lang] = fullLangs[lang];
}

const stringified = JSON.stringify(selectedLangs, null, 2);
writeFileSync("TESTS/language_codes_selected.json", stringified);
