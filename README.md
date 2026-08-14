# Game of Thrones — End of Season 2 Guide

A mobile-first, spoiler-safe character reference site designed for GitHub Pages.

## What it includes
- Searchable visual character directory
- Storyline/faction filters
- One-tap character profiles
- Portrait placeholders
- Mini family / relationship trees
- Location, goals, allies, enemies, and end-of-Season-2 status
- Spoiler cutoff: **Season 2, Episode 10 ("Valar Morghulis")**

## Add portraits
Put your own character images in:

`images/characters/`

Use the filenames already referenced in `data.js`, for example:

- `arya-stark.jpg`
- `tyrion-lannister.jpg`
- `cersei-lannister.jpg`
- `jon-snow.jpg`

If an image is missing, the site shows the exact filename you need to add.

For best results, use square or near-square portraits with the face centered.

## Publish on GitHub Pages
1. Create a GitHub repository, e.g. `got-guide`.
2. Upload all files in this folder to the repository root.
3. Commit/push to `main`.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`.
7. Save.

Your site will be served as a static GitHub Pages site.

## Editing character content
All character data lives in `data.js`. You can add or edit characters without touching the HTML.

## Updating after Season 3
Recommended approach:
- Duplicate `data.js` before updating.
- Change the spoiler banner in `index.html`.
- Update only the character facts that have changed.
- Add new characters as needed.

## Notes
This starter intentionally does not include copyrighted HBO portrait files. Add images you are comfortable using in your own private/personal project.
