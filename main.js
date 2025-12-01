const labelDay = document.querySelector('.label.day');
const labelMonth = document.querySelector('.label.month');
const labelYear = document.querySelector('.label.year');

const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');

const displayDay = document.querySelector('.days > span');
const displayMonth = document.querySelector('.months > span');
const displayYear = document.querySelector('.years > span');

const validationDay = document.querySelector('.day-validation');
const validationDayEmpty = document.querySelector('.day-validation-empty');

const validationMonth = document.querySelector('.month-validation');
const validationMonthEmpty = document.querySelector('.month-validation-empty');

const validationYear = document.querySelector('.year-validation');
const validationYearEmpty = document.querySelector('.year-validation-empty');

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

function calculateAge(birthDate) {
  const today = new Date();

  let dayDifference = today.getDate() - birthDate.getDate();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  let ageInYears = today.getFullYear() - birthDate.getFullYear();

  if (monthDifference < 0 || (!monthDifference && dayDifference < 0)) {
    ageInYears--;
  }

  if (monthDifference < 0) monthDifference += 12;

  if (dayDifference < 0) {
    monthDifference--;

    dayDifference += new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    if (monthDifference < 0) {
      ageInYears--;
      monthDifference += 12;
    }
  }

  return { ageInYears, ageInMonths: monthDifference, ageInDays: dayDifference };
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
  let invalid = false;
  let dob = new Date(inputYear.value, inputMonth.value - 1, inputDay.value);

  if (!inputDay.value) {
    labelDay.classList.add('invalid');
    inputDay.classList.add('invalid');
    validationDay.classList.add('d-none');
    validationDayEmpty.classList.remove('d-none');
    invalid = true;
  }

  if (inputDay.value > 31) {
    labelDay.classList.add('invalid');
    inputDay.classList.add('invalid');
    validationDay.classList.remove('d-none');
    validationDayEmpty.classList.add('d-none');
    invalid = true;
  }

  if (!inputMonth.value) {
    labelMonth.classList.add('invalid');
    inputMonth.classList.add('invalid');
    validationMonth.classList.add('d-none');
    validationMonthEmpty.classList.remove('d-none');
    invalid = true;
  }

  if (inputMonth.value > 12) {
    labelMonth.classList.add('invalid');
    inputMonth.classList.add('invalid');
    validationMonth.classList.remove('d-none');
    validationMonthEmpty.classList.add('d-none');
    invalid = true;
  }

  if (!inputYear.value) {
    labelYear.classList.add('invalid');
    inputYear.classList.add('invalid');
    validationYear.classList.add('d-none');
    validationYearEmpty.classList.remove('d-none');
    invalid = true;
  }

  if (inputYear.value > new Date().getFullYear()) {
    labelYear.classList.add('invalid');
    inputYear.classList.add('invalid');
    validationYear.classList.remove('d-none');
    validationYearEmpty.classList.add('d-none');
    invalid = true;
  }

  if (dob >= new Date().getFullYear()) {
    dobValidation.classList.remove('d-none');
    invalid = true;
  }

  if (invalid) return;

  dob = new Date(`${inputYear.value}-${inputMonth.value}-${inputDay.value}`);
  dob.setHours(0);
  dob.setMinutes(0);
  dob.setSeconds(0);
  dob.setMilliseconds(0);

  const age = calculateAge(dob);
  displayDay.textContent = age.ageInDays;
  displayMonth.textContent = age.ageInMonths;
  displayYear.textContent = age.ageInYears;
});
