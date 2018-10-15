const button = document.getElementById('button');
const firstParagraph = document.querySelector('p');
const secondParagraph = document.querySelector('p:nth-child(2)');

let clicks = window.localStorage.getItem('clicks') || 0;
let hour = window.localStorage.getItem('hour');
let minute = window.localStorage.getItem('minute');
let ampm = window.localStorage.getItem('dayornight');
let clickTime = window.localStorage.getItem('clickTime') || 0;
let seconds = window.localStorage.getItem('seconds');
let secondsCounter;
let minuteOrMinutes;
let dayOrNight;

if (clickTime > 1 || clickTime === 0) {
  minuteOrMinutes = 'minutes';
} else {
  minuteOrMinutes = 'minute';
}

if (clicks === 1) {
  firstParagraph.innerHTML = `Button clicked ${clicks} time`;
} else {
  firstParagraph.innerHTML = `Button clicked ${clicks} times`;
}

secondParagraph.innerHTML = `Last click at ${hour}:${minute} ${ampm} (${clickTime} ${minuteOrMinutes} ago)`;

if (!clicks) {
  firstParagraph.innerHTML = `Button clicked 0 times`;
}
if (!hour && !minute) {
  secondParagraph.innerHTML = `Last click never (never)`;
}

// onbeforeunload somewhere here

if (clicks || window.onbeforeunload) {
  secondsCounter = setInterval(function () {
    seconds++;
    window.localStorage.setItem('seconds', seconds);
    if (seconds % 60 === 0) {
      seconds = 0;
      clickTime++;
      window.localStorage.setItem('clickTime', clickTime);
      if (clickTime !== 1) {
        secondParagraph.innerHTML = `Last click at ${hour}:${minute} ${ampm} (${clickTime} minutes ago)`;
      } else {
        secondParagraph.innerHTML = `Last click at ${hour}:${minute} ${ampm} (${clickTime} minute  ago)`;
      }
    }
  }, 1000);
}

button.addEventListener('click', function (event) {
  clearInterval(secondsCounter);
  window.localStorage.setItem('seconds', '0');

  clicks++;
  let clickTime = 0;
  let seconds = 0;

  window.localStorage.setItem('clicks', clicks);

  if (clicks === 1) {
    firstParagraph.innerHTML = `Button clicked ${clicks} time`;
  } else {
    firstParagraph.innerHTML = `Button clicked ${clicks} times`;
  }

  let now = new Date();
  let hours = now.getHours();
  if (hours >= 12 && hours < 24) {
    dayOrNight = 'pm';
  } else {
    dayOrNight = 'am';
  }
  hours = ((hours + 11) % 12) + 1; // convert from 24hr to 12hr format
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  window.localStorage.setItem('hour', hours);
  window.localStorage.setItem('minute', minutes);
  window.localStorage.setItem('dayornight', dayOrNight);

  let hour = window.localStorage.getItem('hour');
  let minute = window.localStorage.getItem('minute');
  let ampm = window.localStorage.getItem('dayornight');

  window.localStorage.setItem('clickTime', clickTime);

  secondsCounter = setInterval(function () {
    seconds++;
    window.localStorage.setItem('seconds', seconds);
    if (seconds % 60 === 0) {
      seconds = 0;
      clickTime++;
      window.localStorage.setItem('clickTime', clickTime);
      if (clickTime !== 1) {
        secondParagraph.innerHTML = `Last click at ${hour}:${minute} ${ampm} (${clickTime} minutes ago)`;
      } else {
        secondParagraph.innerHTML = `Last click at ${hour}:${minute} ${ampm} (${clickTime} minute  ago)`;
      }
    }
  }, 1000);

  secondParagraph.innerHTML = `Last click at ${hour}:${minute} ${ampm} (${clickTime} minutes ago)`;
});
