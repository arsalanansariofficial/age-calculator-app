const validationYearEmpty = document.querySelector('.year-validation-empty');
const validationYear = document.querySelector('.year-validation');

const validationMonthEmpty = document.querySelector('.month-validation-empty');
const validationMonth = document.querySelector('.month-validation');

const validationDayEmpty = document.querySelector('.day-validation-empty');
const validationDay = document.querySelector('.day-validation');

const displayMonth = document.querySelector('.months > span');
const displayYear = document.querySelector('.years > span');
const displayDay = document.querySelector('.days > span');

const labelMonth = document.querySelector('.label.month');
const labelYear = document.querySelector('.label.year');
const labelDay = document.querySelector('.label.day');

const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const inputDay = document.querySelector('#day');

const dobValidation = document.querySelector('.dob-validation');
const form = document.querySelector('.age-form');

function updateInput(label, input, validationOne, validationTwo, maxLength) {
  label.classList.remove('invalid');
  input.classList.remove('invalid');
  dobValidation.classList.add('d-none');
  validationOne.classList.add('d-none');
  if (input.value.length > maxLength)
    input.value = input.value.slice(0, maxLength);
  validationTwo.classList.add('d-none');
}

inputDay.addEventListener(
  'input',
  updateInput.bind(
    this,
    labelDay,
    inputDay,
    validationDay,
    validationDayEmpty,
    2
  )
);

inputMonth.addEventListener(
  'input',
  updateInput.bind(
    this,
    labelMonth,
    inputMonth,
    validationMonth,
    validationMonthEmpty,
    2
  )
);

inputYear.addEventListener(
  'input',
  updateInput.bind(
    this,
    labelYear,
    inputYear,
    validationYear,
    validationYearEmpty,
    4
  )
);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  let dob = new Date(inputYear.value, inputMonth.value - 1, inputDay.value);
  let invalid = false;

  if (!inputDay.value) {
    validationDayEmpty.classList.remove('d-none');
    validationDay.classList.add('d-none');
    labelDay.classList.add('invalid');
    inputDay.classList.add('invalid');
    invalid = true;
  }

  if (inputDay.value > 31 || inputDay.value < 0) {
    validationDayEmpty.classList.add('d-none');
    validationDay.classList.remove('d-none');
    labelDay.classList.add('invalid');
    inputDay.classList.add('invalid');
    invalid = true;
  }

  if (!inputMonth.value) {
    validationMonthEmpty.classList.remove('d-none');
    validationMonth.classList.add('d-none');
    labelMonth.classList.add('invalid');
    inputMonth.classList.add('invalid');
    invalid = true;
  }

  if (inputMonth.value > 12 || inputMonth.value < 0) {
    validationMonthEmpty.classList.add('d-none');
    validationMonth.classList.remove('d-none');
    labelMonth.classList.add('invalid');
    inputMonth.classList.add('invalid');
    invalid = true;
  }

  if (!inputYear.value) {
    validationYearEmpty.classList.remove('d-none');
    validationYear.classList.add('d-none');
    labelYear.classList.add('invalid');
    inputYear.classList.add('invalid');
    invalid = true;
  }

  if (inputYear.value > new Date().getFullYear() || inputYear.value < 0) {
    validationYear.classList.remove('d-none');
    validationYearEmpty.classList.add('d-none');
    labelYear.classList.add('invalid');
    inputYear.classList.add('invalid');
    invalid = true;
  }

  if (dob >= new Date()) {
    dobValidation.classList.remove('d-none');
    invalid = true;
  }

  if (invalid) return;

  const age = dateFns.intervalToDuration({ start: dob, end: new Date() });
  displayMonth.textContent = age.months || 0;
  displayYear.textContent = age.years || 0;
  displayDay.textContent = age.days || 0;
});
