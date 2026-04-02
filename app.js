const launchTime = new Date("2026-04-01T22:35:00Z");
const plannedMissionHours = 240;
const soundPreferenceKey = "artemis-phase-chime-enabled";

const missionDays = [
  {
    day: "Launch / Flight Day 1",
    startHours: 0,
    endHours: 24,
    title: "Launch, high Earth orbit, and Orion checkout",
    summary: "Launch, upper-stage practice, early system checks, and the first sleep shift in space."
  },
  {
    day: "Flight Day 2",
    startHours: 24,
    endHours: 48,
    title: "Workout checks and translunar injection",
    summary: "The crew tests exercise gear and performs the major burn that sends Orion toward the Moon."
  },
  {
    day: "Flight Day 3",
    startHours: 48,
    endHours: 72,
    title: "Outbound correction and medical demonstrations",
    summary: "A small trajectory correction burn, CPR-in-space practice, medical kit checks, and Moon observation rehearsal."
  },
  {
    day: "Flight Day 4",
    startHours: 72,
    endHours: 96,
    title: "More outbound refinement and Moon-target prep",
    summary: "Another course correction, geography target review, and dedicated celestial photography time."
  },
  {
    day: "Flight Day 5",
    startHours: 96,
    endHours: 120,
    title: "Entering the Moon's neighborhood",
    summary: "Spacesuit testing in space and the final outbound correction before the close lunar pass."
  },
  {
    day: "Flight Day 6",
    startHours: 120,
    endHours: 144,
    title: "Closest approach to the Moon",
    summary: "Photo and video work near the Moon, real-time observation logging, and a blackout while passing behind the Moon."
  },
  {
    day: "Flight Day 7",
    startHours: 144,
    endHours: 168,
    title: "Leaving the Moon and starting the trip home",
    summary: "Exit the Moon's sphere of influence, talk with scientists, complete a return correction, and rest."
  },
  {
    day: "Flight Day 8",
    startHours: 168,
    endHours: 192,
    title: "Radiation shelter drill and manual piloting",
    summary: "The crew practises building a radiation shelter and tests Orion's manual handling and attitude control."
  },
  {
    day: "Flight Day 9",
    startHours: 192,
    endHours: 216,
    title: "Return prep and fit checks",
    summary: "The crew studies re-entry procedures, performs another return correction burn, and checks backup cabin routines."
  },
  {
    day: "Flight Day 10",
    startHours: 216,
    endHours: 240,
    title: "Re-entry, parachutes, and splashdown",
    summary: "Cabin reset, suits back on, service module separation, fiery re-entry, parachutes, and Pacific splashdown."
  }
];

const locationStates = [
  {
    startHours: Number.NEGATIVE_INFINITY,
    endHours: 0,
    route: "Waiting for launch",
    distance: "Still on Earth at Kennedy Space Center",
    summary: "Orion is still on the pad, ready for launch.",
    narrative: "The mission clock has not started yet, so Orion is still resting on Earth and waiting for liftoff.",
    familyPrompt: "Count down together and remember how the rocket looked on the launch pad."
  },
  {
    startHours: 0,
    endHours: 8,
    route: "Leaving Earth",
    distance: "Just above Earth and still close to home",
    summary: "Orion has launched and is still near Earth while the crew settles in.",
    narrative: "This is the early mission setup window, with the spacecraft close to Earth and the crew getting organised.",
    familyPrompt: "Launch is still the big memory. Ask what the rumble and brightness felt like in person."
  },
  {
    startHours: 8,
    endHours: 24,
    route: "High Earth orbit",
    distance: "Still in Earth's neighborhood",
    summary: "Orion is circling near Earth before the journey outward really gets going.",
    narrative: "The crew is checking systems, testing routines, and getting the cabin ready for the rest of the flight.",
    familyPrompt: "Look up at the night sky and imagine the crew getting their first sleep in space."
  },
  {
    startHours: 24,
    endHours: 96,
    route: "Outbound to the Moon",
    distance: "Traveling farther from Earth every hour",
    summary: "Orion is on its long outbound leg between Earth and the Moon.",
    narrative: "This part of the mission is all about long-distance travel, small correction burns, and getting ready for lunar space.",
    familyPrompt: "This is a good night to notice how far a small spacecraft can go with one big burn and patient navigation."
  },
  {
    startHours: 96,
    endHours: 120,
    route: "Closing on the Moon",
    distance: "Almost in lunar space",
    summary: "Orion is nearing the Moon and preparing for the closest pass.",
    narrative: "The crew is almost there, testing gear and making sure the spacecraft is lined up for the Moon flyby.",
    familyPrompt: "Find the Moon outside if you can and imagine Orion drawing closer to it hour by hour."
  },
  {
    startHours: 120,
    endHours: 144,
    route: "Near the Moon",
    distance: "At the Moon for the closest pass",
    summary: "Orion is at its most dramatic point, swinging around the Moon.",
    narrative: "This is the Moon moment: photos, observations, and the quiet stretch behind the lunar far side.",
    familyPrompt: "Moon day is the one to remember. Ask what the far side sounds like when radio goes quiet."
  },
  {
    startHours: 144,
    endHours: 216,
    route: "Free-return path home",
    distance: "Heading back from the Moon toward Earth",
    summary: "Orion is now on the long return leg back home.",
    narrative: "The spacecraft has rounded the Moon and is gradually shrinking the gap back to Earth.",
    familyPrompt: "The crew is on the home stretch now. It is a good time to talk about how navigation brings people back safely."
  },
  {
    startHours: 216,
    endHours: 240,
    route: "Final return",
    distance: "Racing into Earth's neighborhood for re-entry",
    summary: "Orion is back near Earth and preparing for the hottest, fastest part of the mission.",
    narrative: "Everything is turning toward re-entry, parachutes, and splashdown in the Pacific.",
    familyPrompt: "Re-entry day is a great one to talk about heat shields, parachutes, and why coming home is hard."
  },
  {
    startHours: 240,
    endHours: Number.POSITIVE_INFINITY,
    route: "Mission complete",
    distance: "Back on Earth after splashdown",
    summary: "Orion has completed the planned mission and returned home.",
    narrative: "The published mission timeline is complete, so the story has moved from spaceflight to recovery and homecoming.",
    familyPrompt: "The trip is complete. Look back at the launch memory and pick your favourite part of the mission."
  }
];

const qas = [
  {
    q: "Why were the launch workers wearing masks?",
    a: "To protect the crew from germs. NASA keeps astronauts in health stabilisation before flight so even a simple cold does not ruin the mission."
  },
  {
    q: "Why is the Canadian on the mission?",
    a: "Canada earned a seat through its Artemis partnership and its work on Canadarm3 for Gateway. Jeremy Hansen is the first Canadian headed around the Moon."
  },
  {
    q: "What was Bermuda's role?",
    a: "Bermuda helped NASA track spacecraft for decades from Cooper's Island and still sits inside the wider communications story of modern missions."
  },
  {
    q: "How do they use the bathroom?",
    a: "Orion has a compact space toilet that uses airflow rather than gravity. It is clever, necessary, and less glamorous than the posters."
  },
  {
    q: "How do they sleep?",
    a: "They clip sleeping bags to the walls so they do not drift. In zero gravity, you do not need a mattress under you."
  },
  {
    q: "What about privacy and smells?",
    a: "There is a little privacy, not much. The toilet area is screened off and the cabin air is filtered and circulated to keep odours under control."
  },
  {
    q: "Why is it called space and not the void?",
    a: "Because it is a huge open place, not a complete nothing. 'Void' sounds dramatic, but 'space' fits better because there are still stars, dust, light, gas, and worlds out there."
  }
];

const crew = [
  {
    name: "Reid Wiseman",
    role: "Commander",
    bio: "Engineer, Navy pilot, space station astronaut, and former head of NASA's astronaut office.",
    focus: "He keeps the whole mission steady and makes the big crew calls."
  },
  {
    name: "Victor Glover",
    role: "Pilot",
    bio: "Engineer, naval aviator, test pilot, and veteran of Crew-1 to the International Space Station.",
    focus: "He helps fly Orion and watches the spacecraft's systems closely."
  },
  {
    name: "Christina Koch",
    role: "Mission Specialist",
    bio: "Engineer, physicist, Antarctica veteran, and one of NASA's most experienced long-duration astronauts.",
    focus: "She brings deep science and spaceflight experience to the mission."
  },
  {
    name: "Jeremy Hansen",
    role: "Mission Specialist",
    bio: "Canadian fighter and test pilot, astronaut, and former capcom for NASA missions.",
    focus: "He represents Canada on the first crewed trip around the Moon in the Artemis era."
  }
];

const dom = {
  missionClock: document.getElementById("missionClock"),
  currentPhase: document.getElementById("currentPhase"),
  flightDay: document.getElementById("flightDay"),
  routeLabel: document.getElementById("routeLabel"),
  distanceLabel: document.getElementById("distanceLabel"),
  locationSummary: document.getElementById("locationSummary"),
  locationNarrative: document.getElementById("locationNarrative"),
  familyPrompt: document.getElementById("familyPrompt"),
  timeline: document.getElementById("timeline"),
  qaList: document.getElementById("qaList"),
  crewList: document.getElementById("crewList"),
  orionMarker: document.getElementById("orionMarker"),
  soundToggle: document.getElementById("soundToggle"),
  soundStatus: document.getElementById("soundStatus")
};

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioContext;
let lastPhase = "";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function missionHoursElapsed(now = new Date()) {
  return (now.getTime() - launchTime.getTime()) / 36e5;
}

function formatElapsed(now = new Date()) {
  const diffMs = now.getTime() - launchTime.getTime();
  const sign = diffMs < 0 ? "-" : "";
  const abs = Math.abs(diffMs);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const mins = Math.floor((abs % 3600000) / 60000);
  return `${sign}${days}d ${hours}h ${mins}m`;
}

function getCurrentMissionDay(hoursElapsed) {
  if (hoursElapsed < 0) return null;
  return missionDays.find(item => hoursElapsed >= item.startHours && hoursElapsed < item.endHours) || null;
}

function getCurrentPhase(hoursElapsed) {
  if (hoursElapsed < 0) return "Pre-launch";
  const current = getCurrentMissionDay(hoursElapsed);
  if (current) return current.title;
  return "Mission complete";
}

function getFlightDayLabel(hoursElapsed) {
  if (hoursElapsed < 0) return "Launch countdown";
  const current = getCurrentMissionDay(hoursElapsed);
  return current ? current.day : "Splashdown complete";
}

function getLocationState(hoursElapsed) {
  return locationStates.find(item => hoursElapsed >= item.startHours && hoursElapsed < item.endHours) || locationStates[locationStates.length - 1];
}

function getOrbitPosition(hoursElapsed) {
  if (hoursElapsed < 0) {
    return { left: "8%", top: "82%" };
  }

  const clampedHours = clamp(hoursElapsed, 0, plannedMissionHours);

  if (clampedHours <= 120) {
    const t = clampedHours / 120;
    const left = 12 + 70 * t;
    const top = 68 - 34 * (4 * t * (1 - t));
    return { left: `${left}%`, top: `${top}%` };
  }

  if (clampedHours <= 144) {
    const t = (clampedHours - 120) / 24;
    const left = 82 + 1.5 * Math.sin(t * Math.PI * 2);
    const top = 60 + 8 * Math.cos(t * Math.PI);
    return { left: `${left}%`, top: `${top}%` };
  }

  const t = clamp((clampedHours - 144) / 96, 0, 1);
  const left = 82 - 70 * t;
  const top = 68 + 28 * (4 * t * (1 - t));
  return { left: `${left}%`, top: `${top}%` };
}

function renderTimeline(hoursElapsed) {
  dom.timeline.innerHTML = "";

  missionDays.forEach(item => {
    const article = document.createElement("article");
    const active = hoursElapsed >= item.startHours && hoursElapsed < item.endHours;
    const complete = hoursElapsed >= item.endHours;
    const status = active ? "Now" : complete ? "Done" : "Coming up";

    article.className = "timeline-item";
    if (active) article.classList.add("active");
    if (complete) article.classList.add("complete");

    article.innerHTML = `
      <div class="timeline-top">
        <span class="day-badge">${item.day}</span>
        <span class="timeline-status">${status}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
    `;

    dom.timeline.appendChild(article);
  });
}

function renderQA() {
  dom.qaList.innerHTML = "";

  qas.forEach((item, index) => {
    const details = document.createElement("details");
    details.className = "qa-item";
    if (index === 0) details.open = true;
    details.innerHTML = `
      <summary>${item.q}</summary>
      <div class="qa-answer">${item.a}</div>
    `;
    dom.qaList.appendChild(details);
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderCrew() {
  dom.crewList.innerHTML = "";

  crew.forEach(person => {
    const article = document.createElement("article");
    article.className = "crew-card";
    article.innerHTML = `
      <div class="crew-card-top">
        <div class="crew-badge">${getInitials(person.name)}</div>
        <div>
          <h3>${person.name}</h3>
          <p class="crew-role">${person.role}</p>
        </div>
      </div>
      <p class="crew-bio">${person.bio}</p>
      <div class="crew-foot">
        <span class="crew-tag">Why they matter</span>
        <p class="crew-focus">${person.focus}</p>
      </div>
    `;
    dom.crewList.appendChild(article);
  });
}

function readStoredSoundPreference() {
  try {
    return window.localStorage.getItem(soundPreferenceKey) === "true";
  } catch {
    return false;
  }
}

function writeStoredSoundPreference(enabled) {
  try {
    window.localStorage.setItem(soundPreferenceKey, String(enabled));
  } catch {
    return;
  }
}

function ensureAudioContext() {
  if (!AudioContextClass) {
    dom.soundStatus.textContent = "This browser does not support the mission sounds.";
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playSequence(sequence) {
  const context = ensureAudioContext();
  if (!context) return false;

  let cursor = context.currentTime + 0.03;

  sequence.forEach(tone => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = tone.type || "sine";
    oscillator.frequency.setValueAtTime(tone.from, cursor);
    oscillator.frequency.exponentialRampToValueAtTime(tone.to || tone.from, cursor + tone.duration);
    gain.gain.setValueAtTime(0.0001, cursor);
    gain.gain.exponentialRampToValueAtTime(tone.volume || 0.09, cursor + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, cursor + tone.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(cursor);
    oscillator.stop(cursor + tone.duration + 0.02);
    cursor += tone.duration + (tone.gap || 0.05);
  });

  return true;
}

function playMissionSound(name) {
  const sounds = {
    launch: {
      label: "Launch pulse played.",
      sequence: [
        { type: "sawtooth", from: 160, to: 110, duration: 0.22, volume: 0.05, gap: 0.04 },
        { type: "triangle", from: 220, to: 320, duration: 0.18, volume: 0.08, gap: 0.03 },
        { type: "sine", from: 420, to: 520, duration: 0.2, volume: 0.09 }
      ]
    },
    cruise: {
      label: "Space hum played.",
      sequence: [
        { type: "sine", from: 240, to: 240, duration: 0.22, volume: 0.06, gap: 0.05 },
        { type: "sine", from: 300, to: 340, duration: 0.26, volume: 0.07, gap: 0.05 },
        { type: "triangle", from: 280, to: 260, duration: 0.22, volume: 0.06 }
      ]
    },
    moon: {
      label: "Moon hello played.",
      sequence: [
        { type: "triangle", from: 460, to: 620, duration: 0.16, volume: 0.08, gap: 0.04 },
        { type: "triangle", from: 620, to: 780, duration: 0.18, volume: 0.09, gap: 0.04 },
        { type: "sine", from: 820, to: 960, duration: 0.22, volume: 0.08 }
      ]
    },
    phase: {
      label: "Phase chime played.",
      sequence: [
        { type: "triangle", from: 520, to: 620, duration: 0.12, volume: 0.07, gap: 0.03 },
        { type: "triangle", from: 660, to: 760, duration: 0.16, volume: 0.08 }
      ]
    }
  };

  const sound = sounds[name];
  if (!sound) return;

  if (playSequence(sound.sequence)) {
    dom.soundStatus.textContent = sound.label;
  }
}

function maybePlayPhaseChime(nextPhase) {
  if (nextPhase === lastPhase) return;

  const enabled = dom.soundToggle.checked;
  const canPlay = audioContext && audioContext.state !== "closed";

  if (lastPhase && enabled && canPlay) {
    playMissionSound("phase");
  }

  lastPhase = nextPhase;
}

function updateMissionView() {
  const hoursElapsed = missionHoursElapsed();
  const currentPhase = getCurrentPhase(hoursElapsed);
  const currentDay = getFlightDayLabel(hoursElapsed);
  const locationState = getLocationState(hoursElapsed);
  const position = getOrbitPosition(hoursElapsed);

  dom.missionClock.textContent = formatElapsed();
  dom.currentPhase.textContent = currentPhase;
  dom.flightDay.textContent = currentDay;
  dom.routeLabel.textContent = locationState.route;
  dom.distanceLabel.textContent = locationState.distance;
  dom.locationSummary.textContent = locationState.summary;
  dom.locationNarrative.textContent = locationState.narrative;
  dom.familyPrompt.textContent = locationState.familyPrompt;
  dom.orionMarker.style.left = position.left;
  dom.orionMarker.style.top = position.top;

  renderTimeline(hoursElapsed);
  maybePlayPhaseChime(currentPhase);
}

function wireSoundButtons() {
  document.querySelectorAll("[data-sound]").forEach(button => {
    button.addEventListener("click", event => {
      const soundName = event.currentTarget.getAttribute("data-sound");
      playMissionSound(soundName);
    });
  });

  dom.soundToggle.checked = readStoredSoundPreference();
  dom.soundStatus.textContent = dom.soundToggle.checked
    ? "Phase chimes are on after the first tap."
    : "Sound is ready when you are.";
  dom.soundToggle.addEventListener("change", event => {
    const enabled = event.currentTarget.checked;
    writeStoredSoundPreference(enabled);

    if (enabled) {
      ensureAudioContext();
      dom.soundStatus.textContent = "Phase chimes are on. Tap a sound button any time too.";
      return;
    }

    dom.soundStatus.textContent = "Phase chimes are off, but the sound buttons still work when tapped.";
  });
}

renderQA();
renderCrew();
wireSoundButtons();
updateMissionView();
setInterval(updateMissionView, 30000);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateMissionView();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
