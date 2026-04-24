---
name: add-project-images
description: Adds one or more images to a project page's introduction carousel. Converts PNGs to WebP, moves them into public/project-uis/, and appends entries to the ZoomableImage `srcs` array on the matching project page.
---

# Add Project Images

Adds images to the hero `<ZoomableImage>` on a project page, turning it into a multi-image carousel (or extending an existing one).

## Usage

```
/add-project-images <project> <image-path> [<image-path> ...]
```

**`<project>`** — short name that maps to a project page:

| Alias | Project page |
|---|---|
| `rag`, `enterprise-rag` | `src/pages/ProjectRagSystem.tsx` |
| `llm-server` | `src/pages/ProjectLlmServer.tsx` |
| `voiceflow` | `src/pages/ProjectVoiceFlow.tsx` |
| `llm-wiki`, `wiki`, `academic-wiki` | `src/pages/ProjectLlmAcademicWiki.tsx` |

**`<image-path>`** — one or more paths to the images to add. Can be:
- absolute (`/Users/neonunez/Desktop/foo.png`)
- relative to the cwd (`foo.png`, `./downloads/foo.png`)
- already inside `public/` (`public/project-uis/foo.png`)

Formats accepted: `.png` or `.webp`. PNGs are converted to WebP and originals are deleted.

**Examples:**
- `/add-project-images rag ~/Downloads/rag-query.png ~/Downloads/rag-answer.png`
- `/add-project-images voiceflow public/project-uis/voiceflow-2.png`

## What this skill does

1. **Resolves the project alias** to the page file. If the alias is unknown, stop and ask the user.
2. **Validates each input path** exists. If any is missing, stop and report which.
3. **For each input:**
   - If it's a PNG outside `public/project-uis/`, move it into `public/project-uis/` first (use the filename as-is; if a file with that name already exists there, append `-2`, `-3`, etc.).
   - If it's a PNG, run a Node one-liner that uses `sharp` (already a devDep) to produce a WebP sibling at quality 88, max width 1600px, then `rm` the PNG. This matches what `scripts/convert-images.mjs` does.
   - If it's already a WebP, just move it into `public/project-uis/` if it isn't there.
   - Record the final public-relative path (e.g. `/project-uis/foo.webp`) and an auto alt text derived from the filename (kebab/underscore → spaces, title-cased; e.g. `rag-query.webp` → `"Rag query"`).
4. **Edits the project page:**
   - Find the hero `<ZoomableImage ... />` (it sits inside the FadeUp hero block, just after `<p>{tr.*_tagline}</p>` — search for the first `<ZoomableImage` in the file; if there are multiple, confirm with the user which one is the "intro" image).
   - If it currently uses `src="..."` form: convert it to the `srcs={[ ... ]}` array form, carrying over the existing `{ src, alt }` as the first entry.
   - If it already uses `srcs={[ ... ]}`: append the new entries.
   - Preserve indentation / style of the surrounding code.
5. **Runs `npx tsc --noEmit`** to verify the edit compiles.
6. **Reports a summary**: number of images added, new `srcs` array length, path to the modified page. Remind the user that alt texts were auto-generated and can be edited.

## Conversion command

For each PNG input, run:

```bash
node -e "
  import('sharp').then(async ({default: sharp}) => {
    const src = process.argv[1];
    const dst = src.replace(/\.png$/i, '.webp');
    const img = sharp(src);
    const meta = await img.metadata();
    const p = (meta.width && meta.width > 1600)
      ? img.resize({ width: 1600, withoutEnlargement: true })
      : img;
    await p.webp({ quality: 88, effort: 6 }).toFile(dst);
  });
" <input-png-path>
```

Then `rm <input-png-path>`. (Or just call `node scripts/convert-images.mjs` — but that pass scans fixed directories; the inline command handles arbitrary input paths.)

## Guardrails

- **Never** overwrite an existing file in `public/project-uis/`. Suffix with `-2`, `-3`, ... as needed.
- **Never** delete a source PNG that wasn't converted successfully. Check that the WebP exists and is >0 bytes before `rm`ing the original.
- **Never** modify any project page other than the one matched by the alias.
- If the matched page has **no** `<ZoomableImage>` (or it's commented out), stop and tell the user — don't invent one.
- If the user passes only `<project>` with no image paths, stop and ask which images to add.

## Edge cases

- **File already in `public/project-uis/`**: don't move, just convert in place (if PNG) and delete the PNG.
- **Same filename passed twice**: treat the second as a duplicate and apply the `-2` suffix rule.
- **Unknown alias**: print the table from "Usage" and ask the user to pick one.
- **Single-item `srcs` array already there**: append normally — the carousel arrows + dots only render when `srcs.length > 1`, so it becomes active automatically.

## After running

Remind the user:
- Alt texts are placeholder — edit them in the project page if needed.
- The carousel loops, supports arrow keys in the zoom modal, and shows dot indicators only when there's more than one image.
- Run `npm run dev` to preview.
