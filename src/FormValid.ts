//@ts-nocheck
const form = document.querySelector('.form') as HTMLFormElement;
const inputList = Array.from(form.querySelectorAll('.form__input'))
const buttonElement = form.querySelector('.button')
const formErrorElement = form.querySelector('.form__empty-error')

startValidation()

function startValidation() {
  toggleButton()
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (hasInvalidInput()) {
      formError()
      inputList.forEach((inputElement) => {
        checkInputValidity(inputElement)
        toggleInputError(inputElement)
      })
    }
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('blur', () => {
      checkInputValidity(inputElement)
      toggleButton()
      toggleInputError(inputElement)
    });
  })
}

function checkInputValidity(inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity(checkLengthMismatch(inputElement))
  }
}

function checkLengthMismatch(inputElement) {
  if (inputElement.type !== 'text') {
    return ''
  }
  const valueLength = inputElement.value.trim().length
  if (valueLength < inputElement.minLength) {
    return `Минимальное количество символов: ${inputElement.minLength}`
  }
  return ''
}

function hasInvalidInput() {
  return (
    inputList.some(inputElement => !inputElement.validity.valid))
}

function toggleErrorSpan(inputElement, errorMessage){
  const errorElement = document.querySelector(`.${inputElement.id}-error`)
  if (errorMessage) {
    inputElement.classList.add('form__input-error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('form__error-active')
  } else {
    inputElement.classList.remove('form__input-error')
    errorElement.textContent = ''
    errorElement.classList.remove('form__error-active')
  }
}

function toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      toggleErrorSpan(inputElement, inputElement.validationMessage)
    } else {
      toggleErrorSpan(inputElement)
    }
  }

function toggleButton() {
  if (hasInvalidInput()) {
    buttonElement.classList.add('button_type_inactive')
    buttonElement.setAttribute('aria-disabled', 'true')
    formErrorElement.textContent = 'Заполните все поля для отправки формы.';
  } else {
    buttonElement.classList.remove('button_type_inactive')
    buttonElement.setAttribute('aria-disabled', 'false')
    formErrorElement.textContent = ''
  }
}

function formError() {
  const errorMessage = 'Заполните все поля для отправки формы.'
  formErrorElement.textContent = errorMessage
}
