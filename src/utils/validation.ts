import Component from "../services/Component";

export function checkInputValidity(inputElement: HTMLInputElement) {
    if (inputElement.validity.patternMismatch) {
        const errorMessage = inputElement.dataset.errorMessage;
        inputElement.setCustomValidity(errorMessage ? errorMessage : "");
      } else {
        inputElement.setCustomValidity(checkLengthMismatch(inputElement));
      }
}

function checkLengthMismatch(inputElement: HTMLInputElement) {
    if (inputElement.type !== 'text' && inputElement.type !== 'password') {
      return '';
    }
    const valueLength = inputElement.value.trim().length;
    if (valueLength < inputElement.minLength) {
      return `Минимальное количество символов: ${inputElement.minLength}`;
    }
    return '';
}

export function toggleInputError(inputElement: HTMLInputElement) {
    if (!inputElement.validity.valid) {
      toggleErrorSpan(inputElement, inputElement.validationMessage);
    } else {
      toggleErrorSpan(inputElement);
    }
}

function toggleErrorSpan(inputElement: HTMLInputElement, errorMessage?: string){
    const inputClassname = inputElement.className.split('__')[0]; 
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    if(errorElement !== null) {
        if (errorMessage) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add(`${inputClassname}__error_type_active`);
          } else {
            errorElement.textContent = '';
            errorElement.classList.remove(`${inputClassname}__error_type_active`);
          }
    }
}

export function hasInvalidInput(inputList: HTMLInputElement[] | HTMLInputElement) {
    if(Array.isArray(inputList)) {
        return (
            inputList.some(inputElement => !inputElement.validity.valid))
    }
    return !inputList.validity.valid;
}

export function toggleButton(inputList: HTMLInputElement, submitButton: Component) {
    if (hasInvalidInput(inputList)) {
      submitButton.setProps({
        attr: {
            class: "submit-button submit-button_type_disabled",
            'aria-disabled': 'true',
        }
      });
    } else {
        submitButton.setProps({
            attr: {
                class: "submit-button",
                'aria-disabled': 'false',
            }
          });
    }
  }