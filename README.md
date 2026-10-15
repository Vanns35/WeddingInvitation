# Wedding Invitation

A responsive, romantic wedding invitation made with plain HTML, CSS and vanilla JavaScript. It has no build step, backend, or required packages and can be hosted directly on GitHub Pages.

> **Draft preview:** Couple names, ceremonies, venue, map link and contact numbers use the supplied details. Family relationship lines use the names/titles visible in the linked reference; please confirm spelling and preferred titles before final approval. RSVP is informational only; guests can call the listed numbers.

## Project files

- `index.html` — semantic page structure, SEO/social metadata, cover and decorative video backdrops.
- `style.css` — responsive royal Indian-inspired styling, event-specific colors, animations and reduced-motion support.
- `script.js` — the editable `WEDDING` configuration, event cards, countdown, reveal effects, lazy video playback and music.
- `assets/images/mandala.svg` — origsinal lightweight diya illustration and favicon.
- `assets/images/Ganpati.png` — Ganpati cover artwork.
- `assets/images/jharokha-frame.svg` — original transparent architectural frame used around the cover, hero, venue, and RSVP copy.
- `assets/audio/` — optional folder for a music file you have permission to use.

## Customize the invitation

Open `script.js` and edit the `WEDDING` object at the top:

1. Confirm/update `bride`, `groom`, `familyLine1`, `familyLine2` and `invitationMessage`.
2. Set `weddingDateISO` to the exact main ceremony ISO date/time with the correct local UTC offset. Update the human-readable `dateLabel` to match. The countdown uses the ISO value.
3. Replace `venue`, `address` and optionally `directionsUrl` with a Google Maps directions link. Leave the URL blank to keep the button hidden.
4. Edit the `events` array. Each event has `date`, `title`, `theme`, `time`, `dressCode`, and `venue`; the wedding ceremony can also include `schedule` and `note` fields.
5. The RSVP section displays the supplied contact numbers as tap-to-call links. There is no RSVP form or response storage.
6. The audio control uses `assets/audio/kulakovka-indian-295883.mp3` by default. Music starts when a guest opens the invitation (a deliberate tap/click), and the floating control toggles it off/on. To use another track, change `audioSrc` in `script.js` to a public audio URL or a relative asset path. If the media cannot load, playback stays off and the page remains usable.
7. The supplied MP4 provides muted decorative backgrounds behind the events and RSVP sections. They play only near the viewport and pause offscreen; they are hidden when reduced motion is requested. An internet connection is required for these backgrounds.

**Temporary artwork to replace:** In `index.html`, `.hero__photo` currently points to `https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85`; replace its `src` with an approved local palace/Fort photo such as `assets/images/fort-jadhavgadh.jpg`, and update its `alt`. Both `.celebration__video` and `.rsvp-section__video` use the temporary `Green_White_Floral_Traditional_Indian_Wedding_Invitation_Mobile_Video_2_tmsmb6.mp4` URL; replace each `<source src>` with approved local video or image artwork. Also update `og:image` in the `<head>` when replacing the hero artwork. The new transparent jharokha line-art is original and local at `assets/images/jharokha-frame.svg`.

Colors and fonts are defined at the top of `style.css` in `:root`. Google Fonts are optional; the CSS includes local serif fallbacks. The Ganpati image and jharokha frame are separate assets in `assets/images/`.

## Publish with GitHub Pages

1. Create a new repository on GitHub (public is simplest for GitHub Pages).
2. Upload the contents of this folder to the repository root. `index.html` must be at the root—not nested in another folder.
3. Edit `script.js`, add any photographs/audio you want, and commit the changes. Use relative paths such as `assets/images/couple.jpg`; do not use paths beginning with `/` because those may break when the repository is published as a project site.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**. Select your publishing branch (usually `main`) and the `/ (root)` folder, then save.
6. Wait for the Pages deployment to complete. Open the URL shown in **Settings → Pages** (typically `https://YOUR-USER.github.io/REPOSITORY/`). A user-site repository named `YOUR-USER.github.io` publishes at the domain root.
7. After updates, allow GitHub Pages a short time to redeploy. If changes do not appear, hard-refresh or check the latest deployment status in the repository's **Actions** tab.

## Troubleshooting

- **Page is blank / assets are missing:** Ensure `index.html`, `style.css`, `script.js`, and `assets/` are in the publishing root. Check letter case; GitHub Pages paths are case-sensitive. Use relative asset paths.
- **Countdown is wrong:** Verify the ISO date, time and UTC offset in `weddingDateISO`, and ensure `dateLabel` matches. The countdown displays the visitor's remaining time to that instant.
- **Directions are missing:** Add a valid Google Maps directions URL to `directionsUrl`. It is intentionally hidden when blank.
- **Music does not play:** Add the MP3 at the configured path and test after a user presses the music button. Mobile browsers block autoplay; this invitation never starts audio without a tap.
- **External video or Google Fonts unavailable:** The invitation remains readable on its warm-ivory background and uses local serif fallbacks. For a reliable, on-brand result, replace the temporary hero photo and both MP4 source URLs with approved local artwork.

## Accessibility and privacy notes

The page supports keyboard focus, semantic headings/landmarks, reduced-motion preferences, descriptive photo alt text and responsive layouts. The RSVP panel only displays contact information; it has no form or response storage.
