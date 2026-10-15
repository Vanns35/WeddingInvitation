/*
 * WEDDING DETAILS — customize this section for your invitation.
 * Dates use the ISO 8601 format; include your local UTC offset where possible.
 * Keep RSVP_WHATSAPP empty until you add a real number in international format.
 */
const WEDDING = {
  bride: "Bride's Name",
  groom: "Groom's Name",
  familyLine1: "Together with their families",
  familyLine2: "invite you to share their joy",
  invitationMessage: "With the blessings of our families, we joyfully invite you to celebrate the beginning of our forever.",
  weddingDateISO: "2027-02-14T17:00:00+05:30", // Placeholder date and time — replace this.
  dateLabel: "14 February 2027 · 5:00 PM", // Placeholder display label — replace this.
  venue: "Wedding Venue", // Placeholder — replace this.
  address: "Venue address to be announced", // Placeholder — replace this.
  directionsUrl: "", // Paste a Google Maps directions URL, for example https://maps.google.com/?q=...
  audioSrc: "assets/audio/kulakovka-indian-295883.mp3", // Local wedding music track.
  rsvpWhatsApp: "", // International digits only, e.g. 919876543210. Blank = RSVP is not configured.
  events: [
    {
      date: "Date to be announced",
      title: "Mehendi Ceremony",
      time: "Time to be announced",
      description: "An afternoon of henna, laughter and joyful traditions.",
      dressCode: "Festive attire in your favourite colours",
      venue: "Venue to be announced"
    },
    {
      date: "Date to be announced",
      title: "Sangeet Celebration",
      time: "Time to be announced",
      description: "Join us for music, dancing and a night full of memories.",
      dressCode: "Celebration-ready formal or traditional wear",
      venue: "Venue to be announced"
    },
    {
      date: "Date to be announced",
      title: "Wedding Ceremony",
      time: "Time to be announced",
      description: "Together with our families, we invite you to witness our vows.",
      dressCode: "Elegant traditional attire",
      venue: "Venue to be announced"
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

document.title = `The Wedding of ${WEDDING.bride} & ${WEDDING.groom}`;
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) metaDescription.content = `Join ${WEDDING.bride} and ${WEDDING.groom} as they celebrate their wedding.`;
const socialTitle = document.querySelector('meta[property="og:title"]');
const socialDescription = document.querySelector('meta[property="og:description"]');
if (socialTitle) socialTitle.content = document.title;
if (socialDescription) socialDescription.content = metaDescription.content;

const eventList = document.getElementById('event-list');
const makeElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

WEDDING.events.forEach((event) => {
  const card = makeElement('article', 'event-card reveal');
  const date = makeElement('div', 'event-card__date');
  date.append(makeElement('span', 'event-card__date-icon', '▦'), document.createTextNode(event.date));
  const title = makeElement('h3', '', event.title);
  const time = makeElement('p', 'event-card__time', `◷  ${event.time}`);
  const description = makeElement('p', 'event-card__description', event.description);
  const dress = makeElement('div', 'event-card__dress');
  dress.append(makeElement('strong', '', '✧  Dress code'), document.createTextNode(event.dressCode));
  const venue = makeElement('p', 'event-card__venue', `⌖  ${event.venue}`);
  card.append(date, title, time, description, dress, venue);
  eventList.append(card);
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

const rsvpForm = document.getElementById('rsvp-form');
const rsvpNote = document.getElementById('rsvp-note');
rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const phone = WEDDING.rsvpWhatsApp.replace(/\D/g, '');
  if (!phone) {
    rsvpNote.textContent = 'RSVP is not connected yet. Add a WhatsApp number in script.js before sharing this invitation.';
    return;
  }
  const formData = new FormData(rsvpForm);
  const message = [
    `Wedding RSVP for ${WEDDING.bride} & ${WEDDING.groom}`,
    `Name: ${formData.get('name')}`,
    `Attendance: ${formData.get('attendance')}`,
    `Guests: ${formData.get('guests')}`,
    formData.get('message') ? `Message: ${formData.get('message')}` : ''
  ].filter(Boolean).join('\n');
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  rsvpNote.textContent = 'Your RSVP draft opened in WhatsApp. Please send it there; this website does not store responses.';
});
