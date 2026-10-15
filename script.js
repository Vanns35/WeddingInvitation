/*
 * WEDDING DETAILS — customize this section for your invitation.
 * Dates use the ISO 8601 format; include your local UTC offset where possible.
 * RSVP is informational; the supplied contact numbers are in index.html.
 */
const WEDDING = {
  bride: "Swati",
  groom: "Pranshu",
  familyLine1: "Son of Dr. Madhumita Gupta and Mr. Mukul Saurastri",
  familyLine2: "Daughter of Mrs. Usha Kulkarni and Col. B.B Kulkarni",
  invitationMessage: "With the blessings of our families, we invite you to join us as we begin our life together.",
  weddingDateISO: "2026-12-10T17:00:00+05:30",
  dateLabel: "9th & 10th December 2026",
  venue: "Fort JadhavGadh",
  address: "Hadapsar Saswad- jejuri road, Maharashtra",
  directionsUrl: "https://maps.app.goo.gl/Rpm3NE33j8dtgdB59?g_st=iw",
  audioSrc: "assets/audio/kulakovka-indian-295883.mp3", // Local wedding music track.
  events: [
    {
      date: "9th December 2026",
      title: "Engagement & Cocktail Ceremony",
      theme: "engagement",
      time: "7:30 PM",
      dressCode: "Classic western formals in Black or Red colour",
      venue: "Lawn No.1"
    },
    {
      date: "10th December 2026",
      title: "Haldi Ceremony",
      theme: "haldi",
      time: "10:30 AM",
      dressCode: "Bright comfortable and casual ethnic wear in shades of yellow",
      venue: "Pool Side"
    },
    {
      date: "10th December 2026",
      title: "Wedding Ceremony",
      theme: "wedding",
      time: "5:00 PM Onwards",
      schedule: [
        { title: "Assembly of Baraat", time: "5:00 PM" },
        { title: "Varmala Ceremony followed by Vidhi", time: "6:40 PM to 8:00 PM" }
      ],
      dressCode: "Elegant traditional wear with vibrant fabrics",
      venue: "Aai Museum",
      note: "Venue being a fort, we recommend you to carry comfortable footwear."
    }
  ]
};

const copyFields = {
  bride: WEDDING.bride,
  groom: WEDDING.groom,
  familyLine1: WEDDING.familyLine1,
  familyLine2: WEDDING.familyLine2,
  invitationMessage: WEDDING.invitationMessage,
  dateLabel: WEDDING.dateLabel,
  venue: WEDDING.venue,
  address: WEDDING.address
};

document.querySelectorAll('[data-copy]').forEach((element) => {
  const value = copyFields[element.dataset.copy];
  if (value) element.textContent = value;
});

document.title = `The Wedding of ${WEDDING.groom} & ${WEDDING.bride}`;
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) metaDescription.content = `Join ${WEDDING.bride} and ${WEDDING.groom} as they celebrate their wedding.`;
const socialTitle = document.querySelector('meta[property="og:title"]');
const socialDescription = document.querySelector('meta[property="og:description"]');
if (socialTitle) socialTitle.content = document.title;
if (socialDescription) socialDescription.content = metaDescription.content;

const eventLists = {
  haldi: document.getElementById('event-list-haldi'),
  engagement: document.getElementById('event-list-engagement'),
  wedding: document.getElementById('event-list-wedding')
};
const makeElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

WEDDING.events.forEach((event) => {
  const card = makeElement('article', `event-card event-card--${event.theme || 'classic'} reveal`);
  const date = makeElement('div', 'event-card__date');
  date.append(makeElement('span', 'event-card__date-icon', '❀'), document.createTextNode(event.date));
  const title = makeElement('h3', '', event.title);
  const time = makeElement('p', 'event-card__time', event.time);
  const dress = makeElement('div', 'event-card__dress');
  dress.append(makeElement('strong', '', 'Dress Code'), document.createTextNode(event.dressCode));
  const venue = makeElement('p', 'event-card__venue', event.venue);
  card.append(date, title, time);
  if (event.schedule?.length) {
    const schedule = makeElement('div', 'event-card__schedule');
    event.schedule.forEach((item) => {
      const row = makeElement('div', 'event-card__schedule-item');
      row.append(makeElement('span', '', item.title), makeElement('span', '', item.time));
      schedule.append(row);
    });
    card.append(schedule);
  }
  card.append(dress, venue);
  if (event.note) {
    card.append(makeElement('p', 'event-card__note', `Note for our guests: ${event.note}`));
  }
  const target = eventLists[event.theme];
  if (target) target.append(card);
});

const directionsLink = document.getElementById('directions-link');
const directionsHint = document.getElementById('directions-hint');
if (WEDDING.directionsUrl.trim()) {
  directionsLink.href = WEDDING.directionsUrl.trim();
  directionsLink.hidden = false;
  directionsHint.hidden = true;
}

const countdownMessage = document.getElementById('countdown-message');
const countdownUnits = Object.fromEntries(
  [...document.querySelectorAll('[data-count]')].map((element) => [element.dataset.count, element])
);
const weddingTimestamp = Date.parse(WEDDING.weddingDateISO);
const pad = (value) => String(value).padStart(2, '0');
function updateCountdown() {
  if (!Number.isFinite(weddingTimestamp)) {
    countdownMessage.textContent = 'Add a valid wedding date in script.js to start the countdown.';
    return;
  }
  const secondsLeft = Math.floor((weddingTimestamp - Date.now()) / 1000);
  if (secondsLeft < 0) {
    Object.values(countdownUnits).forEach((unit) => { unit.textContent = '00'; });
    countdownMessage.textContent = 'The celebration has begun — thank you for being part of it.';
    return;
  }
  countdownUnits.days.textContent = pad(Math.floor(secondsLeft / 86400));
  countdownUnits.hours.textContent = pad(Math.floor((secondsLeft % 86400) / 3600));
  countdownUnits.minutes.textContent = pad(Math.floor((secondsLeft % 3600) / 60));
  countdownUnits.seconds.textContent = pad(secondsLeft % 60);
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

const cover = document.getElementById('invitation-cover');
const openInvitation = document.getElementById('open-invitation');
openInvitation.addEventListener('click', () => {
  cover.classList.add('is-open');
  window.setTimeout(() => { cover.hidden = true; }, 900);
  if (musicConfigured) {
    audio.play().then(() => setMusicState(true)).catch(() => {
      setMusicState(false);
      musicStatus.textContent = 'Music could not be played. Check the media URL or your connection.';
    });
  }
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const heroPhoto = document.querySelector('.hero__photo');
heroPhoto.addEventListener('error', () => heroPhoto.classList.add('is-unavailable'));

const ambientVideos = document.querySelectorAll('.celebration__video, .rsvp-section__video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { rootMargin: '180px 0px' });
  ambientVideos.forEach((video) => videoObserver.observe(video));
} else {
  ambientVideos.forEach((video) => video.pause());
}

const musicButton = document.getElementById('music-toggle');
const audio = document.getElementById('wedding-audio');
const musicStatus = document.getElementById('music-status');
const musicConfigured = Boolean(WEDDING.audioSrc.trim());
if (musicConfigured) audio.src = WEDDING.audioSrc.trim();
function setMusicState(playing) {
  musicButton.classList.toggle('is-playing', playing);
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  musicButton.querySelector('.music-toggle__icon').textContent = playing ? '♫' : '♪';
  musicStatus.textContent = playing ? 'Background music is playing.' : 'Background music is paused.';
}
setMusicState(false);
musicButton.addEventListener('click', async () => {
  if (!musicConfigured) {
    musicStatus.textContent = 'Music is not configured. Add an audio file path in WEDDING.audioSrc to enable playback.';
    return;
  }
  if (!audio.paused) {
    audio.pause();
    setMusicState(false);
    return;
  }
  try {
    await audio.play();
    setMusicState(true);
  } catch (_error) {
    setMusicState(false);
    musicStatus.textContent = 'Music is unavailable. Add an audio file at the configured path in script.js.';
  }
});
audio.addEventListener('ended', () => setMusicState(false));
audio.addEventListener('pause', () => setMusicState(false));
audio.addEventListener('error', () => {
  setMusicState(false);
  musicStatus.textContent = 'Music could not be loaded. Check the media URL or your connection.';
});
// RSVP is contact-only; guests use the telephone links in the page.

