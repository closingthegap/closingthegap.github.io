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
// Fetch and save blog posts from ctg.hypotheses.org (WordPress REST API)
//
// The site sits behind the Anubis bot filter, which challenges browser user
// agents and lets other user agents through. Keep the user agent non-browser.
//

const stripHtml = (html: string): string =>
	html
		.replace(/<[^>]*>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&hellip;/g, '\u2026')
		.replace(/&#8217;/g, '\u2019')
		.replace(/&#8220;/g, '\u201c')
		.replace(/&#8221;/g, '\u201d')
		.replace(/&amp;/g, '&')
		.replace(/\s+/g, ' ')
		// WordPress appends "… Continue reading <title>" to auto-generated excerpts
		.replace(/\s*(\u2026|\.\.\.)?\s*Continue reading.*$/, '\u2026')
		.trim();

const blogRes = await fetch(
	'https://ctg.hypotheses.org/wp-json/wp/v2/posts?per_page=100&_embed=author',
	{ headers: { 'User-Agent': 'ctg-archive/1.0' } }
);
// deno-lint-ignore no-explicit-any
const blogRaw: any[] = await blogRes.json();
const blog = blogRaw.map((p) => ({
	id: p.id,
	date: p.date,
	link: p.link,
	title: stripHtml(p.title.rendered),
	excerpt: stripHtml(p.excerpt.rendered),
	author: p._embedded?.author?.[0]?.name ?? ''
}));
await Deno.writeTextFile('./src/data/BLOG.json', JSON.stringify(blog));

//
// Record time of last archive
//

await Deno.writeTextFile('./src/data/generated.txt', new Date().toUTCString());
