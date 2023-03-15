import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stepInput = form.elements.step;
const amountInput = form.elements.amount;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let position = 1; position <= amount; position++) {
    try {
      await createPromise(position, delay);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } catch (error) {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }
    delay += step;
  }
});
