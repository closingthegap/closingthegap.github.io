import { readFileSync } from "node:fs";
import { z } from "zod";

// Set version here, validate everywhere else!
const schemaVersion = "0.2.7";

// Regular expressions
const isoCode = /^[a-z]{3}$/; // Can we do better than this?
const latLng = /^-?\d{1,3}(\.\d{1,5})?$/;

// Build list of valid keywords
const keywordsFile = readFileSync("KEYWORDS/KEYWORDS.json", "utf8");
const keywordsObj: Record<string, string[]> = JSON.parse(keywordsFile);
export const keywords = Object.values(keywordsObj).flat();

// Make keywords list into Zod enum
const keywordsEnum: [string, ...string[]] = [keywords[0], ...keywords.slice(1)];

// List of valid roles (name, id) in the CRediT taxonomy
export const creditRoles: [string, string][] = [
  ["conceptualization", "8b73531f-db56-4914-9502-4cc4d4d8ed73"],
  ["data curation", "f93e0f44-f2a4-4ea1-824a-4e0853b05c9d"],
  ["formal analysis", "95394cbd-4dc8-4735-b589-7e5f9e622b3f"],
  ["funding acquisition", "34ff6d68-132f-4438-a1f4-fba61ccf364a"],
  ["investigation", "2451924d-425e-4778-9f4c-36c848ca70c2"],
  ["methodology", "f21e2be9-4e38-4ab7-8691-d6f72d5d5843"],
  ["project administration", "a693fe76-ea33-49ad-9dcc-5e4f3ac5f938"],
  ["resources", "ebd781f0-bf79-492c-ac21-b31b9c3c990c"],
  ["software", "f89c5233-01b0-4778-93e9-cc7d107aa2c8"],
  ["supervision", "0c8ca7d4-06ad-4527-9cea-a8801fcb8746"],
  ["validation", "4b1bf348-faf2-4fc4-bd66-4cd3a84b9d44"],
  ["visualization", "76b9d56a-e430-4e0a-84c9-59c11be343ae"],
  ["writing – original draft", "43ebbd94-98b4-42f1-866b-c930cef228ca"],
  ["writing – review & editing", "d3aead86-f2a2-47f7-bb99-79de6421164d"],
];

// Make roles list into Zod enum of role names
const roleNames = creditRoles.map((x) => x[0]);
const rolesEnum: [string, ...string[]] = [roleNames[0], ...roleNames.slice(1)];

//
// SCHEMA
//

export const projectSchema = z
  .object({
    schema_version: z
      .literal(schemaVersion)
      .describe("Version of the project JSON schema"),
    record_metadata: z
      .object({
        uuid: z
          .string()
          .uuid()
          .describe("Universally unique identifier for the project"),
        record_created_on: z.coerce
          .date()
          .min(new Date("2020-01-01"))
          .describe("Record creation date (YYYY-MM-DD)"),
        record_created_by: z.string().describe("Name of the record's creator"),
        last_edited_on: z
          .union([z.coerce.date().min(new Date("2020-01-01")), z.literal("")])
          .describe("Date of last modification of the record (YYYY-MM-DD)"),
        interviewed: z.boolean().describe("Has the interview been conducted?"),
      })
      .strict()
      .describe("Metadata of the record file"),
    project: z
      .object({
        title: z.string().describe("Official title of the project"),
        abbr: z
          .string()
          .max(16) // Sanity check
          .describe("Abbreviation of the project title (optional)"),
        type: z
          .enum(["organization", "project"])
          .describe("Entity type (organization | project)"),
        ref: z
          .array(z.union([z.string().url(), z.literal("")]))
          .describe("List of authority file URIs"),
        date: z
          .array(
            z
              .object({
                from: z.coerce.date().min(new Date("1900-01-01")),
                to: z.union([
                  z.coerce.date().min(new Date("1900-01-01")),
                  z.literal(""),
                ]),
              })
              .strict(),
          )
          .describe("List of active periods (YYYY-MM-DD)"),
        maintained: z
          .boolean()
          .nullable() // Temporary, until we can update all the records
          .describe("Is the project active (as best we can determine)?"),
        websites: z
          .array(z.string().url())
          .describe("List of project website URLs"),
        project_desc: z
          .string()
          .max(750) // Would like to lower this further
          .describe("Short description of the project"),
        places: z
          .array(
            z
              .object({
                place_name: z
                  .object({
                    text: z.string().describe("Name of the place"),
                    ref: z
                      .array(z.string().url())
                      .describe("List of authority file URIs"),
                  })
                  .strict(),
                coordinates: z
                  .object({
                    lat: z
                      .string()
                      .regex(latLng)
                      .describe("Latitude of the place"),
                    lng: z
                      .string()
                      .regex(latLng)
                      .describe("Longitude of the place"),
                  })
                  .strict(),
              })
              .strict(),
          )
          .describe("Location(s) of the project"),
        lang: z
          .array(z.string().regex(isoCode))
          .describe(
            "List of languages used in the project's output (ISO-639-3 codes)",
          ),
        related_institutions: z
          .array(
            z
              .object({
                relation_type: z.enum(["host", "member", "cooperation"]),
                org_name: z
                  .object({
                    text: z.string().describe("Name of the institution"),
                    ref: z
                      .array(z.string().url())
                      .describe("List of authority file URIs"),
                  })
                  .strict(),
                websites: z
                  .array(z.string().url())
                  .describe("List of institutional website URLs"),
              })
              .strict(),
          )
          .describe(
            "Universities or research organizations which host the project",
          ),
        related_entities: z
          .array(
            z
              .object({
                relation_type: z.enum([
                  "parent",
                  "sibling",
                  "child",
                  "cooperation",
                ]),
                title: z.string(),
                uuid: z.string().uuid(),
              })
              .strict(),
          )
          .describe("Entities that are related to the project"),
        people: z
          .array(
            z
              .object({
                pers_name: z
                  .object({
                    text: z.string().describe("Name of the contact"),
                    ref: z
                      .array(z.string().url())
                      .describe("List of authority file URIs"),
                  })
                  .strict(),
                roles: z
                  .array(z.enum(rolesEnum))
                  .describe(
                    "Roles held by the contact (following the CRediT taxonomy)",
                  ),
                websites: z
                  .array(z.string().url())
                  .describe(
                    "List of institutional and/or personal website URLs",
                  ),
              })
              .strict(),
          )
          .describe("Main contact(s) of the project"),
        research_data: z
          .object({
            lang: z
              .array(z.string().regex(isoCode))
              .describe(
                "List of languages of the project's research data (ISO-639-3 codes)",
              ),
            sustainability_plan: z
              .object({
                project_website: z
                  .number()
                  .min(0)
                  .max(1)
                  .describe(
                    "Indicates whether there is a dedicated project website (0 = no, 1 = yes)",
                  ),

                GitHub: z
                  .number()
                  .min(0)
                  .max(1)
                  .describe(
                    "Indicates whether the project has a GitHub repository (0 = no, 1 = yes)",
                  ),

                data_accessibility: z
                  .number()
                  .min(0)
                  .max(1)
                  .describe(
                    "Indicates the accessibility of project data (0 = no data, 0.5 = partially accessible, 1 = fully accessible)",
                  ),

                publications: z
                  .union([
                    z.literal(0).describe("No publications"),
                    z
                      .literal(1)
                      .describe("Has publications, but details unknown"),
                    z.object({
                      total: z
                        .number()
                        .int()
                        .min(1)
                        .describe(
                          "Total number of project-related publications",
                        ),
                      open_access: z
                        .number()
                        .int()
                        .min(0)
                        .describe(
                          "Number of publications available open-access",
                        ),
                    }),
                  ])
                  .describe(
                    "Publications status: 0 if none, otherwise an object detailing total publications, open-access count, and percentage",
                  ),

                webhosting: z
                  .number()
                  .min(0)
                  .max(1)
                  .describe(
                    "Indicates web presence level (0 = no presence, 0.5 = mentioned on an institutional site, 1 = own website)",
                  ),
              })
              .describe(
                "A dictionary defining the sustainability and reusability plan for the project",
              ),

            publications: z
              .object({
                open_access: z
                  .number()
                  .int()
                  .min(0)
                  .max(100)
                  .describe(
                    "Approximate percentage of publications that are available open-access",
                  ),
                licensing: z
                  .array(z.string())
                  .describe("List of licenses that apply to publications"),
              })
              .strict()
              .describe(
                "Information about publication accessibility and licensing",
              ),
            data: z
              .object({
                datatypes: z
                  .array(
                    z
                      .object({
                        label: z.string().describe("Label for the datatype"),
                        stage: z.enum(["raw", "refined", "final"]),
                        licensing: z
                          .array(z.string())
                          .describe(
                            "List of licenses that apply to the datatype",
                          ),
                        open_access: z
                          .number()
                          .int()
                          .min(0)
                          .max(100)
                          .describe(
                            "Approximate percentage of this datatype available open-access",
                          ),
                      })
                      .strict(),
                  )
                  .describe(
                    "List of datatypes contained in the project's research data",
                  ),
                repositories: z
                  .array(
                    z
                      .object({
                        label: z
                          .string()
                          .describe("Label for the repository, e.g. 'GitHub'"),
                        accessibility: z
                          .enum(["private", "public"])
                          .describe(
                            "Repository accessibility (private | public)",
                          ),
                        ref: z
                          .array(z.string().url())
                          .describe("List of authority file URIs"),
                        websites: z
                          .array(z.string().url())
                          .describe("List of repository URLs (if applicable)"),
                        licensing: z
                          .array(z.string())
                          .describe(
                            "List of licenses that apply to the repository",
                          ),
                        description: z
                          .string()
                          .describe("Description of repository contents"),
                      })
                      .strict(),
                  )
                  .describe("Information about local or remote repositories"),
              })
              .strict()
              .describe("Information about research data"),
          })
          .strict()
          .describe("Information about the project's research data"),
        policies: z
          .array(
            z
              .object({
                description: z
                  .string()
                  .describe(
                    "Description of the policy, e.g. 'Research Data Policy'",
                  ),
                ref: z
                  .array(z.string().url())
                  .describe("List of URLs relevant to the policy"),
              })
              .strict(),
          )
          .describe(
            "Information about policies (e.g. RDP, RDM, OA) applicable to the project and its publications and data",
          ),
        stack: z
          .object({
            database: z
              .array(z.string())
              .describe("List of database systems in use"),
            backend: z
              .array(z.string())
              .describe("List of backend technologies in use"),
            frontend: z
              .array(z.string())
              .describe("List of frontend technologies in use"),
            languages: z
              .array(z.string())
              .describe(
                "List of programming languages (defined broadly) in use",
              ),
            tools: z
              .array(
                z
                  .object({
                    label: z.string().describe("Name of the tool"),
                    self_developed: z
                      .boolean()
                      .describe("Is the tool developed within the project?"),
                    ref: z
                      .array(z.string().url())
                      .describe("List of authority file URIs"),
                    websites: z
                      .array(z.string().url())
                      .describe("List of repository URLs (if applicable)"),
                    description: z
                      .string()
                      .describe(
                        "Description of the tool's purpose in the context of the project",
                      ),
                  })
                  .strict(),
              )
              .describe("List of tools that are used in the project"),
          })
          .strict()
          .describe("Information about the tech stack used in the project"),
        keywords: z
          .array(
            z
              .enum(keywordsEnum)
              .describe(
                "Use lowercase letters, with underscore as a separator where needed",
              ),
          )
          .describe("List of keywords to describe the project"),
        category: z
          .enum([
            "digital_preservation",
            "tools_and_analysis",
            "infrastructure",
            "other",
          ])
          .describe(
            "Research focus ( digital_preservation | tools_and_analysis | infrastructure | other)",
          ),
        comment: z
          .string()
          .describe("Any commentary that doesn't fit elsewhere in the schema"),
      })
      .strict()
      .describe("Information about the project"),
  })
  .strict()
  .describe(
    "Project that deals in some way with the digital humanities, research data management, non-Latin scripts, or infrastructure",
  );
