export default function validateForm(
    formElement: HTMLFormElement, 
    inputList: HTMLInputElement[], 
    submitButton: HTMLButtonElement
): void {
    toggleButton(inputList, submitButton);
    
}

function toggleButton(inputList: HTMLInputElement[], submitButton: HTMLButtonElement) {
    if (hasInvalidInput(inputList)) {
        submitButton.classList.add('button_type_inactive')
        submitButton.setAttribute('aria-disabled', 'true')
      } else {
        submitButton.classList.remove('button_type_inactive')
        submitButton.setAttribute('aria-disabled', 'false')
      }
}

function hasInvalidInput(inputList: HTMLInputElement[]) {
    return (
      inputList.some(inputElement => !inputElement.validity.valid))
  }