# ItachiVerse cinematic update

## What this adds
- 3-image automatic cinematic slideshow on Story, Characters and Explore.
- Slow zoom/pan animation so the still images feel like a moving video background.
- Long comic/graphic-novel style sections.
- Large character cards and expanded character dossier.
- Timeline on Story.
- Encyclopedia/abilities sections on Explore and detail pages.
- Scroll reveal animations.
- Large responsive footer with Home, Story, Characters, Explore, email and social icon placeholders.
- Existing dark/red design is intentionally preserved.

## Important
This package is additive. Keep your existing `style.css` and `pages.css`.
Add `cinematic-pages.css` AFTER them on the pages being upgraded.

The slideshow uses these existing image filenames:
- `static/images/mangekyo.png`
- `static/images/uchiha.png`
- `static/images/akatsuki.png`

Character images expected:
- `itachi.png`
- `sasuke.png`
- `madara.png`
- `sharingan.png`

## Flask routes expected
The templates use the same routes already present in your code:
home, story, characters, explore, itachi, sasuke, madara, sharingan.

## Social links
The footer deliberately uses `#` placeholders because actual Instagram/Facebook/LinkedIn/X/Google account URLs were not provided. Replace those five href values with your real portfolio/social URLs before publishing.

## 3 images -> video-like effect
No MP4 is required. The three images crossfade and slowly zoom/pan with CSS, which is lighter for hosting and keeps the site fast. If you later want an actual MP4 background, it can be swapped without changing the page structure.
