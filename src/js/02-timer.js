import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const timer = document.querySelector('.timer');

const datePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      window.alert('Please choose a date in the future');
      timer.style.display = 'none';
      document.querySelector('[data-start]').disabled = true;
    } else {
      timer.style.display = 'flex';
      document.querySelector('[data-start]').disabled = false;
      const countdownInterval = setInterval(() => {
        const timeLeft = selectedDate - new Date();
        if (timeLeft < 0) {
          clearInterval(countdownInterval);
          document.querySelector('[data-start]').textContent =
            'Countdown Complete';
          return;
        }
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        document.querySelector('[data-days]').textContent = days
          .toString()
          .padStart(2, '0');
        document.querySelector('[data-hours]').textContent = hours
          .toString()
          .padStart(2, '0');
        document.querySelector('[data-minutes]').textContent = minutes
          .toString()
          .padStart(2, '0');
        document.querySelector('[data-seconds]').textContent = seconds
          .toString()
          .padStart(2, '0');
      }, 1000);
    }
  },
});

const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datePicker.destroy();
});
