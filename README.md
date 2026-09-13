# Game of Thrones — Season 3, Episode 3 Guide

A mobile-first static reference for viewers who have finished **Season 3, Episode 3, “Walk of Punishment.”** Open `index.html` locally or serve the directory with GitHub Pages. No build step or runtime dependencies.

## Characters

All 33 original profiles have been reviewed and updated. The directory now contains 52 profiles with actor, faction, storyline, location, goals, allies, threats, current status, relationships and a short reminder.

Added: Edmure Tully, Brynden “Blackfish” Tully, Olenna Tyrell, Mance Rayder, Tormund Giantsbane, Missandei, Kraznys mo Nakloz, Ramsay Snow, Thoros of Myr, Anguy, Jojen Reed, Meera Reed, Barristan Selmy, Locke, Hot Pie, Gilly, Podrick Payne, Beric Dondarrion and Orell.

Beric's profile recalls only his earlier on-screen assignment from Ned; it does not supply later Brotherhood developments. His actor credit reflects the appearance available at this cutoff.

Search matches names, aliases, actors, factions, connected houses, storylines, locations and relationships. Try **Blackfish**, **Riverrun**, **Tully** or **Theon's rescuer**. Eight storyline choices plus All keep the filters compact.

## Houses and relationships

All eight house pages work: **Stark, Lannister, Baratheon, Tyrell, Tully, Greyjoy, Arryn and Targaryen**.

House cards open a detail view containing seat, region, leadership, allegiance, purpose, family branches and key members. All Houses returns to the cards. Gold-bordered character nodes open normal profiles.

`houses.js` uses explicit `people` and `relationships`. Every relationship names its source, destination, type and label. Parent/child branches are separate from siblings, marriage, partnerships, public parentage and contextual connections. Each branch has connecting lines; the wide tree scrolls inside its own container on phones. The Tully page includes both Catelyn's Stark children and Lysa's Arryn branch.

## Portraits

Existing local portrait files are retained. No imagery is downloaded or embedded from HBO. Add images you are authorized to use at `images/characters/<character-id>.jpg`; exact filenames are in `data.js`.

The visual audit withheld 12 existing portraits whose scene or costume could not be verified within the cutoff: Tyrion, Joffrey, Margaery, Loras, Stannis, Davos, Littlefinger, Varys, Sandor, Bronn, Yara and Gendry. Their profiles use placeholders. After replacing each image with a verified early portrait, change its `portraitApproved` value from `false` to `true`. The original files remain on disk but are not loaded by the guide.

Expected additions include:

- `edmure-tully.jpg`, `brynden-tully.jpg`, `olenna-tyrell.jpg`
- `mance-rayder.jpg`, `tormund-giantsbane.jpg`, `orell.jpg`
- `missandei.jpg`, `kraznys-mo-nakloz.jpg`, `barristan-selmy.jpg`
- `ramsay-snow.jpg`, `jojen-reed.jpg`, `meera-reed.jpg`
- `thoros-of-myr.jpg`, `anguy.jpg`, `beric-dondarrion.jpg`
- `locke.jpg`, `hot-pie.jpg`, `gilly.jpg`, `podrick-payne.jpg`

Missing images fall back to a readable character name or portrait placeholder. Choose portraits from scenes within the viewing cutoff. Optional local house sigils can be supplied with a house's `sigil` field; none are bundled.

## Content boundary

Every displayed fact must be established by the end of S3E3. Unknown motives and locations remain unknown. Ramsay's name is included at the owner's explicit request; his profile describes only helping and rescuing Theon, without house membership or additional background. He is excluded from house trees.

Astapor's negotiated exchange remains pending. The map page includes only current locations and instructs viewers to set Quartermaester's spoiler slider to Season 3, Episode 3. External map content is controlled by that site.

The editorial review checked the episode plot summaries for [S3E1](https://en.wikipedia.org/wiki/Valar_Dohaeris), [S3E2](https://en.wikipedia.org/wiki/Dark_Wings,_Dark_Words) and [S3E3](https://en.wikipedia.org/wiki/Walk_of_Punishment). These are maintainer references; external pages may contain material beyond their plot summaries.

All displayed story information has been audited against a Season 3, Episode 3 cutoff. The separate review covered character text, house relationships, map descriptions, labels, documentation, filenames and the displayed portraits.

## Editing and validation

- `data.js`: character content, aliases, portrait paths and `currentStatus`.
- `houses.js`: house metadata and typed family connections.
- `app.js`: search, filters, house navigation and shared profile dialog.
- `index.html` / `styles.css`: page structure and responsive presentation.

With Python, Playwright and Microsoft Edge installed, run `python tests/browser_check.py`. The checks cover data references, 390×844 and 320×740 phone viewports plus 1280×900 desktop, every house page and linked key member, search, filters, empty results, portrait fallbacks, dialog closing, deep links and page overflow.

These checks passed in headless Edge at all three viewport sizes. This verifies phone-sized layouts, not a physical iPhone or Safari.

## GitHub Pages

Commit these static files to your repository. In **Settings → Pages**, choose **Deploy from a branch**, select your publishing branch and its root folder, then save.
