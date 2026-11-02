# "Closing the Gap" Software Dependencies

_This document is in a preliminary state. Content will be filled in as soon as
possible._

## Table of Contents

1. [Introduction](#introduction)
2. [Frontend Dependencies](#frontend-dependencies)
3. [Backend Dependencies](#backend-dependencies)
4. [How to Install Dependencies](#how-to-install-dependencies)

## Introduction

In the "Closing the Gap" project, we are always focused on the sustainability of
the data corpora and software that we build. It is therefore important that we
take care in adding software dependencies. Each external dependency introduces
risks. What if we rely on a software library to build our website, and it later
goes unmaintained? Keeping in mind such concerns, we try to take on dependencies
only as far as necessary, and to contain their impact on our project by not
calling them dynamically. i.e., we are aware of the differences in risk between
runtime and development dependencies.

Nevertheless, we do rely on some external libraries, and it is worth documenting
what those are; how and why we use them; how they can be installed; and what the
consequences would be if they became unusable in the future. That is what this
document is intended to cover.

## Frontend Dependencies

The following are the key dependencies of our front end—a SvelteKit app that we
build statically for hosting via GitHub Pages. NB: GitHub Pages is not a
software dependency in the sense that is intended elsewhere in this document,
but it is included here because we have discussed how we might proceed if we
ever needed to switch to a different hosting provider.

1. **[GitHub Pages](https://pages.github.com/)**:
   - **Description**: GitHub Pages is a complimentary service provided by
     GitHub, enabling users to host static websites based on the contents of
     their source code repositories.
   - **Contingency**: Although there is no immediate concern that GitHub Pages'
     terms of service will change drastically, it is important to be prepared
     for any eventuality. If, for example, GitHub stopped offering the service
     free of charge, we might need to find another platform suitable for hosting
     our static website. The advantage of static file hosting is that it is
     typically more cost-effective and interchangeable than other means of
     keeping a website online.

2. **[SvelteKit](https://github.com/sveltejs/kit)**:
   - **Version**: 1.x
   - **License**: MIT
   - **Description**: SvelteKit, an extension of the
     [Svelte](https://github.com/sveltejs/svelte) framework (itself currently at
     version 4.x), is designed for creating web applications. It is comparable
     to other well-known frameworks such as React (and
     [Next.js](https://github.com/vercel/next.js)), Angular, and Vue.
   - **Contingency**: With [Vercel](https://vercel.com/) now sponsoring
     SvelteKit development, and with the version 1.0 milestone having been
     reached, it seems likely that the project will continue in the near to
     medium term. There is a large, active community surrounding this framework.
     If SvelteKit did somehow become unusable in the future, then our website
     would need to be rewritten in order for further development to take place.
     It is worth emphasizing, however, that we use SvelteKit to generate a
     static bundle of files for our site—at which point it is simply HTML, CSS,
     and JavaScript to be run in a web browser.

3. **[TypeScript](https://github.com/microsoft/TypeScript)**:
   - **Version**: 5.x
   - **License**: Apache 2.0
   - **Description**: TypeScript is a programming language that functions as a
     superset of JavaScript. It is meant to add some type safety, and it
     compiles to JavaScript code, which can then be run either in a browser or
     in a runtime such as Node.
   - **Contingency**: Given that it is both open-source and backed by Microsoft,
     TypeScript is arguably one of the least risky dependencies that a project
     like ours could take on. We use it to gain type safety, i.e., to prevent
     some bugs that could easily occur when writing raw JavaScript.

4. **[Leaflet](https://github.com/Leaflet/Leaflet)**:
   - **Version**: 1.x
   - **License**: BSD 2-Clause "Simplified"
   - **Description**: Leaflet is a widely recognized open-source library that
     allows for embedding maps in websites—typically drawing data from
     [OpenStreetMap](https://www.openstreetmap.org/). We use this to generate a
     map of the locations of projects in our database.
   - **Contingency**: Leaflet is already a long-running open-source project. It
     could be forked if necessary. If, for some reason, we needed to switch to a
     different library, we could consider alternatives such as Google Maps.

_To be continued…_

## Backend Dependencies

1. **[Node.js](https://nodejs.org/)**:
   - **Version**: 24.12.0 or newer
   - **License**: MIT
   - **Description**: The built-in test runner executes the TypeScript schema
     tests directly. Native type stripping does not perform static type checking.
     Deno is still used by the separate data utility scripts and the frontend
     freshness test.

2. **[Zod](https://github.com/colinhacks/zod)**:
   - **Version**: 3.x
   - **License**: MIT
   - **Description**: Zod, whose tagline is "TypeScript-first schema
     validation," provides many convenience features for writing a schema in
     TypeScript and checking data against it. This helps us to ensure that our
     JSON files have a consistent structure, that the necessary fields are
     filled, that data is in the correct format, etc.
   - **Contingency**: While it seems unlikely that Zod will become obsolete any
     time soon, there are other schema validation libraries that work nicely
     with TypeScript. We would have a range of options—Zod is just the one that
     we currently like best.

3. **[Prettier](https://github.com/prettier/prettier)**:
   - **Version**: 3.x
   - **License**: MIT
   - **Description**: Prettier is an extremely popular code formatting tool. Our
     workflow involves running most of the files in our repository through
     Prettier in order to maintain uniform formatting.
   - **Contingency**: It is difficult to imagine the Prettier project's being
     abandoned. At the same time, there are plenty of open-source code
     formatters. This should never become a sticking point.

4. **[Lychee](https://github.com/lycheeverse/lychee)**:
   - **Version**: 0.13.x
   - **License**: Apache 2.0 _or_ MIT
   - **Description**: Lychee is a link verification tool. We use it to extract
     hyperlinks from all of our JSON files, and then to check whether they
     resolve. In the context of "Closing the Gap," this usually means links to
     other projects' websites, to researchers' homepages, etc. Checking these
     links on a regular basis allows us to replace them as URLs change and
     websites go down.
   - **Contingency**: Compared to our other dependencies, Lychee is a smaller
     and more recently established project (though it has been in development
     for a few years already). It is open-source and could be forked if the need
     ever arose. There also exist other tools for link verification. What we
     like about Lychee is that it facilitates extracting links from a large
     number of files and checking them in a performant manner.

_To be continued…_

## How to Install Dependencies

1. **Frontend**: The current front end code is in the `frontend` branch. And it
   is ultimately a Node/npm project—so it should be sufficient to run
   `npm install` (or similar) after checking out that branch. If you do not have
   Node/npm installed, you can download it and find instructions on
   [their website](https://nodejs.org/).

2. **Backend**: The back end code is in the `master` branch. There is also a
   Node/npm setup here installs Prettier and Zod. Run `npm ci` to install them.
   The `format` script formats files with Prettier; `test` runs the TypeScript
   schema tests using Node.js 24.12.0 or newer (`npm test`).
   Additional tools are needed for the other scripts:
   - Deno: Required for `npm run map-langs` and the other Deno data utilities.
   - Lychee: See the installation instructions at their
     [GitHub repository](https://github.com/lycheeverse/lychee). There are many
     options for various operating systems. On macOS, for example, Lychee can be
     installed via the [Homebrew](https://brew.sh/) package manager. Once you
     have Lychee installed, using it to check links in the "Closing the Gap"
     database involves a few steps. We plan to document this process in a
     separate file, as soon as possible.

_To be continued…_
