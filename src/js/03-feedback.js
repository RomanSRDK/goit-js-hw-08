import throttle from 'lodash.throttle';

import localStorageAPI from './localstorage';

const feedbackFormEl = document.querySelector('.feedback-form');

feedbackFormEl.addEventListener('submit', event => {
  event.preventDefault();

  localStorage.removeItem(FEEDBACK_FORM_STATE);
  event.currentTarget.reset();
});

const FEEDBACK_FORM_STATE = 'feedback-form-state';

// Запись данных в local Storage
const feedbackFormState = localStorageAPI.load(FEEDBACK_FORM_STATE) || {};

const onFormInput = ({ target }) => {
  const formElName = target.name;
  const formElValue = target.value;

  feedbackFormState[formElName] = formElValue;
  localStorageAPI.save(FEEDBACK_FORM_STATE, feedbackFormState);
};

feedbackFormEl.addEventListener('input', throttle(onFormInput, 500));

// Выгрузка данных из local Storage
const fillFormEl = () => {
  const dataFromForm = localStorageAPI.load(FEEDBACK_FORM_STATE);

  const formElements = feedbackFormEl.elements;

  for (const key in dataFromForm) {
    if (dataFromForm.hasOwnProperty(key)) {
      formElements[key].value = dataFromForm[key];
    }
  }
};

fillFormEl();
