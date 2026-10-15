# Wedding Invitation

A responsive, romantic wedding invitation made with plain HTML, CSS and vanilla JavaScript. It has no build step, backend, or required packages and can be hosted directly on GitHub Pages.

> **Important:** Couple names are still placeholders. Update them in `script.js` before publishing. RSVP is informational only; guests can call the listed contact numbers.

## Project files

- `index.html` — semantic page structure, SEO/social metadata and type loading.
- `style.css` — responsive styling, animations, color/type variables and reduced-motion support.
- `script.js` — the editable `WEDDING` configuration, event cards, countdown, reveal effects and music.
- `assets/images/mandala.svg` — original lightweight decorative illustration and favicon.
- `assets/audio/` — optional folder for a music file you have permission to use.

## Customize the invitation

Open `script.js` and edit the `WEDDING` object at the top:

1. Replace `bride`, `groom`, `brideFamily`, `groomFamily` and `invitationMessage`.
2. Set `weddingDateISO` to an ISO date/time with the correct local UTC offset, such as `2027-02-14T17:00:00+05:30`. Update the human-readable `dateLabel` to match. The countdown uses the ISO value.
3. Replace `venue`, `address` and optionally `directionsUrl` with a Google Maps directions link. Leave the URL blank to keep the button hidden.
4. Edit the `events` array. Each event has `date`, `title`, `time`, `description`, `dressCode`, and `venue` fields. Add/remove objects as needed.
5. The RSVP section displays the supplied contact numbers as tap-to-call links. There is no RSVP form or response storage.
6. The audio control uses `assets/audio/kulakovka-indian-295883.mp3` by default. Music starts when a guest opens the invitation (a deliberate tap/click), and the floating control toggles it off/on. To use another track, change `audioSrc` in `script.js` to a public audio URL or a relative asset path. If the media cannot load, playback stays off and the page remains usable.

To use your own photos, replace the hero image URL in `index.html` with a relative path such as `assets/images/couple.jpg`, and update its alt text. Add optimized JPG/WebP images to `assets/images/`; keep the hero reasonably compressed and provide descriptive alt text. The current hero uses an external Unsplash image, so a local image is recommended for reliable/offline hosting. Social preview metadata in `index.html` should also be updated if you change the hero image.

Colors and fonts are defined at the top of `style.css` in `:root`. Google Fonts are optional; the CSS includes local serif fallbacks. The small mandala illustration is an original SVG and can be replaced with your own optimized decorative SVG.

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
- **External hero image or Google Fonts unavailable:** The site still works with a CSS background fallback and system fonts. For reliable performance, put your own optimized photo in `assets/images/` and use local assets.

## Accessibility and privacy notes

The page supports keyboard focus, semantic headings/landmarks, reduced-motion preferences, descriptive photo alt text and responsive layouts. RSVP fields are not transmitted or saved by the website itself: only when configured does the form create a WhatsApp draft that the guest chooses whether to send. Do not collect private guest details on a public static site without an appropriate, disclosed service.
