import { deepStrictEqual as assertEquals } from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { z } from "zod";

import {
  creditRoles,
  keywords,
  projectSchema,
} from "../SCHEMATA/project_schema.ts";

const uuidV4 = z.uuidv4();

test("ensure no duplicate keywords", () => {
  const keywordsSet = new Set(keywords);
  assertEquals(keywordsSet.size, keywords.length);
});

test("validate project template", () => {
  const templateFile = readFileSync("TEMPLATES/project.json", "utf8");
  const template = JSON.parse(templateFile);

  // Fill in required fields
  template.record_metadata.uuid = randomUUID();
  template.record_metadata.record_created_on = Date();
  template.project.date[0].from = Date();

  projectSchema.parse(template);
});

test("ensure no duplicate CRediT role IDs", () => {
  const ids = creditRoles.map(([, id]) => id);
  const idSet = new Set(ids);
  assertEquals(idSet.size, 14); // There are 14 roles
});

for (const [_, id] of creditRoles) {
  test(`validate CRediT role ID ${id}`, () => {
    assertEquals(uuidV4.safeParse(id).success, true);
  });
}

// Get list of project files
const projectsFile = readFileSync("PROJECTS.json", "utf8");
const projectsObj = JSON.parse(projectsFile);
const projects: [string, Record<string, string>][] =
  Object.entries(projectsObj);

// Test parsing each project file
for (const [id, details] of projects) {
  const path = `.${details.path}${id}.json`;

  test(`validate ${details.path}`, () => {
    const projectFile = readFileSync(path, "utf8");
    const projectObj = JSON.parse(projectFile);
    projectSchema.parse(projectObj);

    const uuid = projectObj.record_metadata.uuid;

    // Require UUID version 4 in addition to the schema’s general UUID check
    assertEquals(uuidV4.safeParse(uuid).success, true);

    // Ensure filename matches internal UUID
    assertEquals(uuid, id);
  });
}

// Get a sorted list of just IDs from PROJECTS.json
const projectIds = projects.map(([id]) => id);
projectIds.sort();

test("ensure no duplicate IDs in projects list", () => {
  const projectIdSet = new Set(projectIds);
  assertEquals(projectIdSet.size, projectIds.length);
});

test("ensure filenames match listed IDs", () => {
  const filenameIds = getIdsFromFilenames("PROJECTS");
  filenameIds.sort();
  assertEquals(filenameIds, projectIds);
});

//
// Helper functions
//

function getIdsFromFilenames(basePath: string): string[] {
  const ids = [];

  for (const dirEntry of readdirSync(basePath, { withFileTypes: true })) {
    if (dirEntry.isDirectory()) {
      const subPath = `${basePath}/${dirEntry.name}`;
      ids.push(...getIdsFromFilenames(subPath));
    } else {
      ids.push(dirEntry.name.slice(0, -5));
    }
  }

  return ids;
}
