//
// Project title sort function
//

function sortTitles(a: Record<string, unknown>, b: Record<string, unknown>): 1 | -1 | 0 {
	const aProj = a.project as Record<string, unknown>;
	const bProj = b.project as Record<string, unknown>;

	const aTitle = aProj.title as string;
	const bTitle = bProj.title as string;

	const aLower = aTitle.toLowerCase();
	const bLower = bTitle.toLowerCase();

	if (aLower > bLower) {
		return 1;
	} else if (aLower < bLower) {
		return -1;
	} else return 0;
}

//
// Fetch template
//

const templateRes = await fetch(
	'https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master/TEMPLATES/project.json'
);
const template = await templateRes.json();
await Deno.writeTextFile('./src/data/TEMPLATES/project.json', JSON.stringify(template));

//
// Fetch and save keywords
//

const keywordsRes = await fetch(
	'https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master/KEYWORDS/KEYWORDS.json'
);
const keywords: Record<string, string[]> = await keywordsRes.json();
await Deno.writeTextFile('./src/data/KEYWORDS.json', JSON.stringify(keywords));

//
// Fetch and save list of projects
//

const projectsRes = await fetch(
	'https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master/PROJECTS.json'
);
const projects: Record<string, Record<string, string>> = await projectsRes.json();
await Deno.writeTextFile('./src/data/PROJECTS.json', JSON.stringify(projects));

//
// Fetch project entries and build collection
//

const projectEntries: [string, Record<string, string>][] = Object.entries(projects);

const urls: string[] = [];
for (const [id, details] of projectEntries) {
	urls.push(
		`https://raw.githubusercontent.com/closingthegap/closingthegap.github.io/master${details.path}${id}.json`
	);
}

let entries: [string, Record<string, unknown>][] = await Promise.all(
	urls.map(async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		return [url, data];
	})
);

entries = entries.sort((a, b) => sortTitles(a[1], b[1]));

await Deno.writeTextFile('./src/data/ENTRIES.json', JSON.stringify(entries));

//
// Record time of last archive
//

await Deno.writeTextFile('./src/data/generated.txt', new Date().toUTCString());
