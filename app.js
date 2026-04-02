const launchTime = new Date('2026-04-01T22:35:00Z');

const missionDays = [
  {
    day: 'Launch / Flight Day 1',
    startHours: 0,
    endHours: 24,
    title: 'Launch, high Earth orbit, and Orion checkout',
    summary: 'Launch, proximity operations practice with the upper stage, early system checks, first sleep period, and setup of the cabin for life in space.'
  },
  {
    day: 'Flight Day 2',
    startHours: 24,
    endHours: 48,
    title: 'Workout checks and translunar injection',
    summary: 'The crew tests exercise gear and then performs the major burn that sends Orion onto its free-return path around the Moon.'
  },
  {
    day: 'Flight Day 3',
    startHours: 48,
    endHours: 72,
    title: 'Outbound correction and medical demonstrations',
    summary: 'A small trajectory correction burn, CPR in space practice, medical kit checks, and rehearsal for Moon observation work.'
  },
  {
    day: 'Flight Day 4',
    startHours: 72,
    endHours: 96,
    title: 'More outbound refinement and Moon-target prep',
    summary: 'Another course correction, geography target review, and dedicated celestial photography time.'
  },
  {
    day: 'Flight Day 5',
    startHours: 96,
    endHours: 120,
    title: 'Entering the Moon’s sphere of influence',
    summary: 'Spacesuit testing in space and the final outbound correction before the close lunar pass.'
  },
  {
    day: 'Flight Day 6',
    startHours: 120,
    endHours: 144,
    title: 'Closest approach to the Moon',
    summary: 'Photo and video work near the Moon, real-time observation logging, and a communications blackout while passing behind the Moon.'
  },
  {
    day: 'Flight Day 7',
    startHours: 144,
    endHours: 168,
    title: 'Leaving the Moon and beginning the trip home',
    summary: 'Exit the Moon’s sphere of influence, speak with scientists, complete the first return trajectory correction, and rest.'
  },
  {
    day: 'Flight Day 8',
    startHours: 168,
    endHours: 192,
    title: 'Radiation shelter drill and manual piloting',
    summary: 'The crew practises building a radiation shelter and tests Orion’s manual handling and attitude control.'
  },
  {
    day: 'Flight Day 9',
    startHours: 192,
    endHours: 216,
    title: 'Return prep and fit checks',
    summary: 'The crew studies re-entry procedures, performs another return correction burn, and tests backup waste and garment procedures.'
  },
  {
    day: 'Flight Day 10',
    startHours: 216,
    endHours: 240,
    title: 'Re-entry, parachutes, and splashdown',
    summary: 'Cabin reset, suits back on, service module separation, fiery re-entry, parachutes, and Pacific splashdown.'
  }
];

const qas = [
  {
    q: 'Why were the launch workers wearing masks?',
    a: 'To protect the crew from germs. NASA keeps the astronauts in health stabilisation before flight so even a simple cold does not ruin the mission.'
  },
  {
    q: 'Why is the Canadian on the mission?',
    a: 'Canada earned a seat through its Artemis partnership and its work on Canadarm3 for Gateway. Jeremy Hansen is the first Canadian headed around the Moon.'
  },
  {
    q: 'What was Bermuda’s role?',
    a: 'Bermuda helped NASA track spacecraft for decades from Cooper’s Island and still sits within the wider communications picture used for modern missions.'
  },
  {
    q: 'How do they use the bathroom?',
    a: 'Orion has a compact space toilet that uses airflow rather than gravity. It is clever, necessary, and a bit less glamorous than the posters.'
  },
  {
    q: 'How do they sleep?',
    a: 'They clip sleeping bags to the walls so they do not drift. In zero gravity, you do not need a mattress underneath you.'
  },
  {
    q: 'What about privacy and smells?',
    a: 'There is a little privacy, not much. The toilet area is screened off and the cabin air is filtered and circulated to keep odours under control.'
  },
  {
    q: 'Why is it called space and not the void?',
    a: 'Because it is a huge open place, not a complete nothing. “Void” sounds cool, but “space” fits better because there are still stars, dust, light, gas, and worlds out there.'
  }
];

const crew = [
  {
    name: 'Reid Wiseman',
    role: 'Commander',
    bio: 'Engineer, U.S. Navy pilot, International Space Station astronaut, and later chief of the Astronaut Office. He leads the crew.'
  },
  {
    name: 'Victor Glover',
    role: 'Pilot',
    bio: 'Engineer, naval aviator, test pilot, and Crew-1 astronaut. He helps fly and manage Orion.'
  },
  {
    name: 'Christina Koch',
    role: 'Mission Specialist',
    bio: 'Engineer, physicist, Antarctica veteran, long-duration spaceflier, and one of the most experienced members of the crew.'
  },
  {
    name: 'Jeremy Hansen',
    role: 'Mission Specialist',
    bio: 'Canadian fighter and test pilot, astronaut, and former capcom. Artemis II makes him the first Canadian to go around the Moon.'
  }
];

function missionHoursElapsed(now = new Date()) {
  return (now.getTime() - launchTime.getTime()) / 36e5;
}

function formatElapsed(now = new Date()) {
  const diffMs = now - launchTime;
  const sign = diffMs < 0 ? '-' : '';
  const abs = Math.abs(diffMs);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const mins = Math.floor((abs % 3600000) / 60000);
  return `${sign}${days}d ${hours}h ${mins}m`;
}

function getCurrentPhase(hoursElapsed) {
  if (hoursElapsed < 0) return 'Pre-launch';
  const current = missionDays.find(d => hoursElapsed >= d.startHours && hoursElapsed < d.endHours);
  if (current) return current.title;
  return 'Mission complete or beyond planned timeline';
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  const hours = missionHoursElapsed();
  container.innerHTML = '';
  missionDays.forEach(item => {
    const section = document.createElement('article');
    section.className = 'timeline-item';
    if (hours >= item.startHours && hours < item.endHours) {
      section.classList.add('active');
    }
    section.innerHTML = `
      <span class="day-badge">${item.day}</span>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
    `;
    container.appendChild(section);
  });
}

function renderQA() {
  const container = document.getElementById('qaList');
  container.innerHTML = '';
  qas.forEach(item => {
    const div = document.createElement('article');
    div.className = 'qa-item';
    div.innerHTML = `<h3>${item.q}</h3><p>${item.a}</p>`;
    container.appendChild(div);
  });
}

function renderCrew() {
  const container = document.getElementById('crewList');
  container.innerHTML = '';
  crew.forEach(person => {
    const div = document.createElement('article');
    div.className = 'crew-item';
    div.innerHTML = `<h3>${person.name}</h3><span class="role">${person.role}</span><p>${person.bio}</p>`;
    container.appendChild(div);
  });
}

function updateClock() {
  document.getElementById('missionClock').textContent = formatElapsed();
  document.getElementById('currentPhase').textContent = getCurrentPhase(missionHoursElapsed());
  renderTimeline();
}

renderQA();
renderCrew();
updateClock();
setInterval(updateClock, 30000);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}
