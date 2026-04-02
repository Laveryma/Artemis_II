const defaultLaunchTimeIso = "2026-04-01T22:35:00Z";
const launchTimeStorageKey = "artemis-launch-time-iso";
const soundPreferenceKey = "artemis-phase-chime-enabled";
const earthMoonDistanceKm = 384400;
const maxMoonPassDistanceKm = 391800;
const maxSpeedKmH = 32000;
const totalMissionDays = 10;
const numberFormatter = new Intl.NumberFormat("en-GB");

function getSavedLaunchTime() {
  try {
    const stored = window.localStorage.getItem(launchTimeStorageKey);
    if (stored) {
      const parsed = new Date(stored);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
  } catch {
    return new Date(defaultLaunchTimeIso);
  }

  const actualLaunchTime = new Date(defaultLaunchTimeIso);

  try {
    window.localStorage.setItem(launchTimeStorageKey, actualLaunchTime.toISOString());
  } catch {
    return actualLaunchTime;
  }

  return actualLaunchTime;
}

const launchTime = getSavedLaunchTime();

const missionDays = [
  {
    day: "Launch / Flight Day 1",
    startHours: 0,
    endHours: 24,
    title: "Launch, high Earth orbit, and Orion checkout",
    summary: "Launch, upper-stage practice, early system checks, and the first sleep shift in space.",
    familyPrompt: "Retell the loudest launch moment together and ask what everyone noticed first once Orion cleared the tower."
  },
  {
    day: "Flight Day 2",
    startHours: 24,
    endHours: 48,
    title: "Workout checks and translunar injection",
    summary: "The crew tests exercise gear and performs the major burn that sends Orion toward the Moon.",
    familyPrompt: "Talk about the big translunar burn and guess how small Earth would look after one powerful push away from home."
  },
  {
    day: "Flight Day 3",
    startHours: 48,
    endHours: 72,
    title: "Outbound correction and medical demonstrations",
    summary: "A small trajectory correction burn, CPR-in-space practice, medical kit checks, and Moon observation rehearsal.",
    familyPrompt: "Try a quick pretend emergency drill with a pillow patient and talk about why crews practise helping each other far from Earth."
  },
  {
    day: "Flight Day 4",
    startHours: 72,
    endHours: 96,
    title: "More outbound refinement and Moon-target prep",
    summary: "Another course correction, geography target review, and dedicated celestial photography time.",
    familyPrompt: "Look for the Moon and imagine aiming for it without roads, signs, or straight lines, just timing and careful navigation."
  },
  {
    day: "Flight Day 5",
    startHours: 96,
    endHours: 120,
    title: "Entering the Moon's neighborhood",
    summary: "Spacesuit testing in space and the final outbound correction before the close lunar pass.",
    familyPrompt: "Suit day is a good night to ask why zips, gloves, and seals all matter more when the Moon is finally close."
  },
  {
    day: "Flight Day 6",
    startHours: 120,
    endHours: 144,
    title: "Closest approach to the Moon",
    summary: "Photo and video work near the Moon, real-time observation logging, and a blackout while passing behind the Moon.",
    familyPrompt: "Step outside, find the Moon, and imagine the quiet moment when Orion slips behind it and radio goes still."
  },
  {
    day: "Flight Day 7",
    startHours: 144,
    endHours: 168,
    title: "Leaving the Moon and starting the trip home",
    summary: "Exit the Moon's sphere of influence, talk with scientists, complete a return correction, and rest.",
    familyPrompt: "Talk about how the Moon can bend a spacecraft's path home, and why coming back safely is its own skill."
  },
  {
    day: "Flight Day 8",
    startHours: 168,
    endHours: 192,
    title: "Radiation shelter drill and manual piloting",
    summary: "The crew practises building a radiation shelter and tests Orion's manual handling and attitude control.",
    familyPrompt: "Build a tiny blanket fort shelter and compare it with how astronauts rehearse safe places even when space looks calm."
  },
  {
    day: "Flight Day 9",
    startHours: 192,
    endHours: 216,
    title: "Return prep and fit checks",
    summary: "The crew studies re-entry procedures, performs another return correction burn, and checks backup cabin routines.",
    familyPrompt: "Make a simple checklist tonight and compare it with how crews prepare for re-entry with no skipped steps."
  },
  {
    day: "Flight Day 10",
    startHours: 216,
    endHours: 240,
    title: "Re-entry, parachutes, and splashdown",
    summary: "Cabin reset, suits back on, service module separation, fiery re-entry, parachutes, and Pacific splashdown.",
    familyPrompt: "Today is splashdown day. Ask which part sounds hardest: the heat, the parachutes, or the ocean landing."
  }
];

const prelaunchFamilyPrompt = "Count down together and remember how the rocket looked on the launch pad before Orion ever moved.";
const postMissionFamilyPrompt = "The trip is complete. Pick your favourite family mission memory and the moment you would tell someone else about first.";
const moonLoopReturnProgress = 0.18;

const locationStates = [
  {
    startHours: Number.NEGATIVE_INFINITY,
    endHours: 0,
    route: "Waiting for launch",
    summary: "Orion is still on the pad, ready for launch.",
    narrative: "The mission clock has not started yet, so Orion is still resting on Earth and waiting for liftoff.",
    familyPrompt: "Count down together and remember how the rocket looked on the launch pad."
  },
  {
    startHours: 0,
    endHours: 8,
    route: "Leaving Earth",
    summary: "Orion has launched and is still near Earth while the crew settles in.",
    narrative: "This is the early mission setup window, with the spacecraft close to Earth and the crew getting organised.",
    familyPrompt: "Launch is still the big memory. Ask what the rumble and brightness felt like in person."
  },
  {
    startHours: 8,
    endHours: 24,
    route: "High Earth orbit",
    summary: "Orion is circling near Earth before the journey outward really gets going.",
    narrative: "The crew is checking systems, testing routines, and getting the cabin ready for the rest of the flight.",
    familyPrompt: "Look up at the night sky and imagine the crew getting their first sleep in space."
  },
  {
    startHours: 24,
    endHours: 96,
    route: "Outbound to the Moon",
    summary: "Orion is on its long outbound leg between Earth and the Moon.",
    narrative: "This is the long outbound stretch, with correction burns, science practice, and the Moon getting closer every day.",
    familyPrompt: "This is a good night to notice how far a small spacecraft can go with one big burn and patient navigation."
  },
  {
    startHours: 96,
    endHours: 120,
    route: "Closing on the Moon",
    summary: "Orion is nearing the Moon and preparing for the closest pass.",
    narrative: "The crew is almost there, testing gear and making sure the spacecraft is lined up for the Moon flyby.",
    familyPrompt: "Find the Moon outside if you can and imagine Orion drawing closer to it hour by hour."
  },
  {
    startHours: 120,
    endHours: 144,
    route: "Near the Moon",
    summary: "Orion is at its most dramatic point, swinging around the Moon.",
    narrative: "This is the Moon moment: photos, observations, and the quiet stretch behind the lunar far side.",
    familyPrompt: "Moon day is the one to remember. Ask what the far side sounds like when radio goes quiet."
  },
  {
    startHours: 144,
    endHours: 216,
    route: "Free-return path home",
    summary: "Orion is now on the long return leg back home.",
    narrative: "The spacecraft has rounded the Moon and is gradually shrinking the gap back to Earth.",
    familyPrompt: "The crew is on the home stretch now. It is a good time to talk about how navigation brings people back safely."
  },
  {
    startHours: 216,
    endHours: 240,
    route: "Final return",
    summary: "Orion is back near Earth and preparing for the hottest, fastest part of the mission.",
    narrative: "Everything is turning toward re-entry, parachutes, and splashdown in the Pacific.",
    familyPrompt: "Re-entry day is a great one to talk about heat shields, parachutes, and why coming home is hard."
  },
  {
    startHours: 240,
    endHours: Number.POSITIVE_INFINITY,
    route: "Mission complete",
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
    priorDaysInSpace: 165,
    bio: "Engineer, Navy pilot, space station astronaut, and former head of NASA's astronaut office.",
    focus: "He keeps the whole mission steady and makes the big crew calls.",
    photo: "./images/reid-wiseman.jpg",
    photoPosition: "center 18%"
  },
  {
    name: "Victor Glover",
    role: "Pilot",
    priorDaysInSpace: 168,
    bio: "Engineer, naval aviator, test pilot, and veteran of Crew-1 to the International Space Station.",
    focus: "He helps fly Orion and watches the spacecraft's systems closely.",
    photo: "./images/victor-glover.jpg",
    photoPosition: "center 18%"
  },
  {
    name: "Christina Koch",
    role: "Mission Specialist",
    priorDaysInSpace: 328,
    bio: "Engineer, physicist, Antarctica veteran, and one of NASA's most experienced long-duration astronauts.",
    focus: "She brings deep science and spaceflight experience to the mission.",
    photo: "./images/christina-koch.jpg",
    photoPosition: "center 18%"
  },
  {
    name: "Jeremy Hansen",
    role: "Mission Specialist",
    priorDaysInSpace: 0,
    bio: "Canadian fighter and test pilot, astronaut, and former capcom for NASA missions.",
    focus: "He represents Canada on the first crewed trip around the Moon in the Artemis era.",
    photo: "./images/jeremy-hansen.jpg",
    photoPosition: "center 18%"
  }
];

const dom = {
  missionClock: document.getElementById("missionClock"),
  missionClockCompact: document.getElementById("missionClockCompact"),
  currentPhase: document.getElementById("currentPhase"),
  missionDayCounter: document.getElementById("missionDayCounter"),
  missionDayCounterCompact: document.getElementById("missionDayCounterCompact"),
  routeLabel: document.getElementById("routeLabel"),
  distanceLabel: document.getElementById("distanceLabel"),
  locationSummary: document.getElementById("locationSummary"),
  locationNarrative: document.getElementById("locationNarrative"),
  familyPrompt: document.getElementById("familyPrompt"),
  liveStatusDot: document.getElementById("liveStatusDot"),
  crewModal: document.getElementById("crewModal"),
  dayOverlayButton: document.getElementById("dayOverlayButton"),
  dayOverlayBadge: document.getElementById("dayOverlayBadge"),
  dayOverlayTitle: document.getElementById("dayOverlayTitle"),
  timeline: document.getElementById("timeline"),
  qaList: document.getElementById("qaList"),
  crewList: document.getElementById("crewList"),
  orbitPathOutbound: document.getElementById("orbitPathOutbound"),
  orbitPathReturn: document.getElementById("orbitPathReturn"),
  orionMarker: document.getElementById("orionMarker"),
  distanceToMoonValue: document.getElementById("distanceToMoonValue"),
  distanceToMoonFill: document.getElementById("distanceToMoonFill"),
  distanceFromEarthValue: document.getElementById("distanceFromEarthValue"),
  distanceFromEarthFill: document.getElementById("distanceFromEarthFill"),
  speedValue: document.getElementById("speedValue"),
  speedFill: document.getElementById("speedFill"),
  soundToggle: document.getElementById("soundToggle"),
  soundStatus: document.getElementById("soundStatus"),
  resetServiceWorkerButton: document.getElementById("resetServiceWorkerButton"),
  settingsStatus: document.getElementById("settingsStatus"),
  dayInfoBadge: document.getElementById("dayInfoBadge"),
  dayInfoTitle: document.getElementById("dayInfoModalTitle"),
  dayInfoText: document.getElementById("dayInfoText"),
  kidPhotoModalTitle: document.getElementById("kidPhotoModalTitle"),
  kidPhotoModalImage: document.getElementById("kidPhotoModalImage"),
  crewModalName: document.getElementById("crewModalName"),
  crewModalRole: document.getElementById("crewModalRole"),
  crewModalDaysValue: document.getElementById("crewModalDaysValue"),
  crewModalPhoto: document.getElementById("crewModalPhoto"),
  crewModalBio: document.getElementById("crewModalBio"),
  crewModalFocus: document.getElementById("crewModalFocus")
};

const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioContext;
let lastPhase = "";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
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

function formatDistanceKm(value) {
  return `${numberFormatter.format(Math.round(value))} km`;
}

function formatSpeedKmH(value) {
  return `${numberFormatter.format(Math.round(value))} km/h`;
}

function formatCrewDays(value) {
  return numberFormatter.format(value);
}

function getCurrentMissionDay(hoursElapsed) {
  if (hoursElapsed < 0) return null;
  return missionDays.find(item => hoursElapsed >= item.startHours && hoursElapsed < item.endHours) || null;
}

function getCompletedMissionDays(hoursElapsed) {
  if (hoursElapsed < 0) return 0;
  return clamp(Math.floor(hoursElapsed / 24), 0, totalMissionDays);
}

function getCurrentMissionDayNumber(hoursElapsed) {
  const currentDay = getCurrentMissionDay(hoursElapsed);

  if (currentDay) {
    return missionDays.indexOf(currentDay) + 1;
  }

  if (hoursElapsed >= 240) {
    return totalMissionDays;
  }

  return 0;
}

function getCurrentPhase(hoursElapsed) {
  if (hoursElapsed < 0) return "Pre-launch";
  const currentDay = getCurrentMissionDay(hoursElapsed);
  return currentDay ? currentDay.title : "Mission complete";
}

function getCrewDaysInSpace(person, hoursElapsed) {
  return person.priorDaysInSpace + getCompletedMissionDays(hoursElapsed);
}

function isIPhoneHomeApp() {
  const userAgent = navigator.userAgent || "";
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  return /iPhone/i.test(userAgent) && standalone;
}

function applyPlatformClasses() {
  document.body.classList.toggle("ios-home-app", isIPhoneHomeApp());
}

function getFamilyPrompt(hoursElapsed) {
  const currentDay = getCurrentMissionDay(hoursElapsed);

  if (currentDay?.familyPrompt) {
    return currentDay.familyPrompt;
  }

  if (hoursElapsed < 0) {
    return prelaunchFamilyPrompt;
  }

  return postMissionFamilyPrompt;
}

function getLocationState(hoursElapsed) {
  return locationStates.find(item => hoursElapsed >= item.startHours && hoursElapsed < item.endHours) || locationStates[locationStates.length - 1];
}

function getEstimatedTelemetry(hoursElapsed) {
  if (hoursElapsed < 0) {
    return {
      distanceFromEarthKm: 0,
      distanceToMoonKm: earthMoonDistanceKm,
      speedKmH: 0
    };
  }

  if (hoursElapsed <= 24) {
    const t = hoursElapsed / 24;
    const distanceFromEarthKm = lerp(0, 40000, t);
    const speedKmH = lerp(28000, 7800, t);
    return {
      distanceFromEarthKm,
      distanceToMoonKm: earthMoonDistanceKm - distanceFromEarthKm,
      speedKmH
    };
  }

  if (hoursElapsed <= 120) {
    const t = (hoursElapsed - 24) / 96;
    const distanceFromEarthKm = lerp(40000, 370000, t);
    const speedKmH = lerp(8800, 5600, t);
    return {
      distanceFromEarthKm,
      distanceToMoonKm: earthMoonDistanceKm - distanceFromEarthKm,
      speedKmH
    };
  }

  if (hoursElapsed <= 144) {
    const t = (hoursElapsed - 120) / 24;
    const distanceFromEarthKm = lerp(370000, maxMoonPassDistanceKm, t);
    const speedKmH = lerp(5600, 7300, t);
    return {
      distanceFromEarthKm,
      distanceToMoonKm: Math.abs(earthMoonDistanceKm - distanceFromEarthKm),
      speedKmH
    };
  }

  if (hoursElapsed <= 216) {
    const t = (hoursElapsed - 144) / 72;
    const distanceFromEarthKm = lerp(maxMoonPassDistanceKm, 40000, t);
    const speedKmH = lerp(7300, 15000, t);
    return {
      distanceFromEarthKm,
      distanceToMoonKm: Math.abs(earthMoonDistanceKm - distanceFromEarthKm),
      speedKmH
    };
  }

  if (hoursElapsed <= 240) {
    const t = (hoursElapsed - 216) / 24;
    const distanceFromEarthKm = lerp(40000, 0, t);
    const speedKmH = lerp(15000, maxSpeedKmH, t);
    return {
      distanceFromEarthKm,
      distanceToMoonKm: Math.abs(earthMoonDistanceKm - distanceFromEarthKm),
      speedKmH
    };
  }

  return {
    distanceFromEarthKm: 0,
    distanceToMoonKm: earthMoonDistanceKm,
    speedKmH: 0
  };
}

function getFallbackOrbitPosition(hoursElapsed) {
  if (hoursElapsed < 0) {
    return { left: "8%", top: "82%" };
  }

  const clampedHours = clamp(hoursElapsed, 0, 240);

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

function getPointAlongOrbitPath(pathElement, progress) {
  if (!pathElement || typeof pathElement.getTotalLength !== "function") {
    return null;
  }

  const svg = pathElement.ownerSVGElement;
  const viewBox = svg?.viewBox?.baseVal;

  if (!viewBox || !viewBox.width || !viewBox.height) {
    return null;
  }

  const point = pathElement.getPointAtLength(pathElement.getTotalLength() * clamp(progress, 0, 1));
  return {
    left: `${(point.x / viewBox.width) * 100}%`,
    top: `${(point.y / viewBox.height) * 100}%`
  };
}

function getOrbitPosition(hoursElapsed) {
  if (hoursElapsed < 0) {
    return getFallbackOrbitPosition(hoursElapsed);
  }

  const clampedHours = clamp(hoursElapsed, 0, 240);

  if (clampedHours <= 120) {
    return getPointAlongOrbitPath(dom.orbitPathOutbound, clampedHours / 120) || getFallbackOrbitPosition(clampedHours);
  }

  if (clampedHours <= 144) {
    const t = (clampedHours - 120) / 24;
    return getPointAlongOrbitPath(dom.orbitPathReturn, lerp(0, moonLoopReturnProgress, t)) || getFallbackOrbitPosition(clampedHours);
  }

  const t = clamp((clampedHours - 144) / 96, 0, 1);
  return getPointAlongOrbitPath(dom.orbitPathReturn, lerp(moonLoopReturnProgress, 1, t)) || getFallbackOrbitPosition(clampedHours);
}

function getOverlayCopy(hoursElapsed) {
  const currentDay = getCurrentMissionDay(hoursElapsed);

  if (currentDay) {
    return {
      badge: currentDay.day,
      title: currentDay.title,
      summary: currentDay.summary
    };
  }

  if (hoursElapsed < 0) {
    return {
      badge: "Countdown",
      title: "Waiting for launch",
      summary: "The mission clock is set to the saved launch time and Orion is still on the ground."
    };
  }

  return {
    badge: "Mission complete",
    title: "Splashdown complete",
    summary: "The published day-by-day timeline has finished and Orion is back on Earth."
  };
}

function getBestEstimateLabel(hoursElapsed, telemetry) {
  if (hoursElapsed < 0) {
    return "On the pad at Kennedy Space Center";
  }

  if (hoursElapsed > 240) {
    return "Recovered after splashdown";
  }

  return `~${formatDistanceKm(telemetry.distanceFromEarthKm)} from Earth`;
}

function setFill(element, ratio) {
  element.style.width = `${clamp(ratio, 0, 1) * 100}%`;
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

function openCrewModal(index) {
  const person = crew[index];
  if (!person) return;
  const hoursElapsed = missionHoursElapsed();

  dom.crewModalName.textContent = person.name;
  dom.crewModalRole.textContent = person.role;
  dom.crewModalDaysValue.textContent = formatCrewDays(getCrewDaysInSpace(person, hoursElapsed));
  dom.crewModalBio.textContent = person.bio;
  dom.crewModalFocus.textContent = person.focus;
  dom.crewModalPhoto.src = person.photo;
  dom.crewModalPhoto.alt = person.name;
  dom.crewModalPhoto.style.objectPosition = person.photoPosition;
  dom.crewModal.dataset.crewIndex = String(index);

  openModal("crewModal");
}

function renderCrew(hoursElapsed = missionHoursElapsed()) {
  dom.crewList.innerHTML = "";

  crew.forEach((person, index) => {
    const totalDaysInSpace = getCrewDaysInSpace(person, hoursElapsed);
    const button = document.createElement("button");
    button.className = "crew-card crew-button";
    button.type = "button";
    button.setAttribute("data-crew-index", String(index));
    button.innerHTML = `
      <div class="crew-card-top">
        <div class="crew-photo-wrap">
          <img class="crew-photo" src="${person.photo}" alt="${person.name}" loading="lazy" style="object-position: ${person.photoPosition};" />
        </div>
        <div class="crew-meta">
          <h3>${person.name}</h3>
          <p class="crew-role">${person.role}</p>
          <div class="crew-days-block">
            <span class="crew-days-label">Days in space</span>
            <strong class="crew-days-value">${formatCrewDays(totalDaysInSpace)}</strong>
          </div>
        </div>
      </div>
      <p class="crew-bio">${person.bio}</p>
      <div class="crew-foot">
        <span class="crew-tag">Why they matter</span>
        <p class="crew-focus">${person.focus}</p>
      </div>
    `;

    button.addEventListener("click", () => {
      openCrewModal(index);
    });

    dom.crewList.appendChild(button);
  });
}

function updateCrewDayDisplays(hoursElapsed) {
  document.querySelectorAll("[data-crew-index]").forEach(button => {
    const index = Number(button.getAttribute("data-crew-index"));
    const person = crew[index];
    const value = button.querySelector(".crew-days-value");

    if (!person || !value) return;
    value.textContent = formatCrewDays(getCrewDaysInSpace(person, hoursElapsed));
  });

  const activeIndex = Number(dom.crewModal.dataset.crewIndex);
  const activePerson = crew[activeIndex];

  if (!Number.isNaN(activeIndex) && activePerson && dom.crewModalDaysValue) {
    dom.crewModalDaysValue.textContent = formatCrewDays(getCrewDaysInSpace(activePerson, hoursElapsed));
  }
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
    reentry: {
      label: "Re-entry rush played.",
      sequence: [
        { type: "sawtooth", from: 280, to: 180, duration: 0.16, volume: 0.05, gap: 0.03 },
        { type: "triangle", from: 220, to: 140, duration: 0.2, volume: 0.07, gap: 0.04 },
        { type: "sine", from: 170, to: 90, duration: 0.24, volume: 0.06 }
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

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.hidden = true;
  const anyOpen = Array.from(document.querySelectorAll(".modal")).some(item => !item.hidden);
  document.body.classList.toggle("modal-open", anyOpen);
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.hidden = true;
  });
  document.body.classList.remove("modal-open");
}

function openKidPhotoModal(button) {
  const title = button.getAttribute("data-kid-photo-title");
  const src = button.getAttribute("data-kid-photo-src");
  const alt = button.getAttribute("data-kid-photo-alt") || title || "";

  if (!title || !src) return;

  dom.kidPhotoModalTitle.textContent = title;
  dom.kidPhotoModalImage.src = src;
  dom.kidPhotoModalImage.alt = alt;
  openModal("kidPhotoModal");
}

function wireModals() {
  document.querySelectorAll("[data-open-modal]").forEach(button => {
    button.addEventListener("click", event => {
      openModal(event.currentTarget.getAttribute("data-open-modal"));
    });
  });

  document.querySelectorAll("[data-kid-photo-title]").forEach(button => {
    button.addEventListener("click", event => {
      openKidPhotoModal(event.currentTarget);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(button => {
    button.addEventListener("click", event => {
      closeModal(event.currentTarget.getAttribute("data-close-modal"));
    });
  });

  if (dom.dayOverlayButton) {
    dom.dayOverlayButton.addEventListener("click", () => {
      openModal("dayInfoModal");
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
}

function updateMissionView() {
  const hoursElapsed = missionHoursElapsed();
  const currentPhase = getCurrentPhase(hoursElapsed);
  const currentMissionDayNumber = getCurrentMissionDayNumber(hoursElapsed);
  const currentDayOverlay = getOverlayCopy(hoursElapsed);
  const locationState = getLocationState(hoursElapsed);
  const telemetry = getEstimatedTelemetry(hoursElapsed);
  const position = getOrbitPosition(hoursElapsed);
  const liveNow = hoursElapsed >= 0 && hoursElapsed < 240;

  dom.missionClock.textContent = formatElapsed();
  dom.missionClockCompact.textContent = formatElapsed();
  dom.currentPhase.textContent = currentPhase;
  dom.missionDayCounter.textContent = `${currentMissionDayNumber} of ${totalMissionDays}`;
  dom.missionDayCounterCompact.textContent = `${currentMissionDayNumber} of ${totalMissionDays}`;
  dom.routeLabel.textContent = locationState.route;
  dom.distanceLabel.textContent = getBestEstimateLabel(hoursElapsed, telemetry);
  dom.locationSummary.textContent = locationState.summary;
  dom.locationNarrative.textContent = locationState.narrative;
  dom.familyPrompt.textContent = getFamilyPrompt(hoursElapsed);
  dom.dayOverlayBadge.textContent = currentDayOverlay.badge;
  dom.dayOverlayTitle.textContent = currentDayOverlay.title;
  dom.dayInfoBadge.textContent = currentDayOverlay.badge;
  dom.dayInfoTitle.textContent = currentDayOverlay.title;
  dom.dayInfoText.textContent = currentDayOverlay.summary;
  dom.orionMarker.style.left = position.left;
  dom.orionMarker.style.top = position.top;
  dom.liveStatusDot.classList.toggle("is-live", liveNow);
  dom.liveStatusDot.classList.toggle("is-idle", !liveNow);

  dom.distanceToMoonValue.textContent = formatDistanceKm(telemetry.distanceToMoonKm);
  dom.distanceFromEarthValue.textContent = formatDistanceKm(telemetry.distanceFromEarthKm);
  dom.speedValue.textContent = formatSpeedKmH(telemetry.speedKmH);
  setFill(dom.distanceToMoonFill, telemetry.distanceToMoonKm / earthMoonDistanceKm);
  setFill(dom.distanceFromEarthFill, telemetry.distanceFromEarthKm / maxMoonPassDistanceKm);
  setFill(dom.speedFill, telemetry.speedKmH / maxSpeedKmH);

  updateCrewDayDisplays(hoursElapsed);
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

async function redownloadServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    dom.settingsStatus.textContent = "This browser does not support service workers.";
    return;
  }

  dom.resetServiceWorkerButton.disabled = true;
  dom.settingsStatus.textContent = "Clearing the saved app version and fetching a fresh copy...";

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(registration => registration.unregister()));

    if ("caches" in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map(key => caches.delete(key)));
    }

    await fetch(`./service-worker.js?refresh=${Date.now()}`, { cache: "no-store" });
    dom.settingsStatus.textContent = "Fresh service worker requested. Reloading now...";
    window.location.replace(`./?refresh=${Date.now()}`);
  } catch {
    dom.resetServiceWorkerButton.disabled = false;
    dom.settingsStatus.textContent = "Could not redownload the service worker. Try again in a moment.";
  }
}

function wireSettings() {
  if (!dom.resetServiceWorkerButton) return;

  dom.resetServiceWorkerButton.addEventListener("click", () => {
    redownloadServiceWorker();
  });
}

applyPlatformClasses();
renderQA();
renderCrew();
wireModals();
wireSoundButtons();
wireSettings();
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
