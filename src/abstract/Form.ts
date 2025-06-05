import Component, { CallbackTuple, ComponentProps } from '../services/Component';
import router from '../services/Router';

export default class Form extends Component {
  constructor(props: ComponentProps) {
    super({ ...props,
      events: Object.assign(props.events ? props.events : {}, 
        {
          blur: (evt: Event) => {
            const inputElement = evt.target as HTMLInputElement;
            this._checkInputValidity(inputElement);
            this._toggleInputError(inputElement);
            this._toggleButton(); 
          },
          
          click: (evt: Event) => {
            evt.preventDefault();
            const linkElement = evt.target as HTMLLinkElement;
            router.go(linkElement.dataset.ref);
          },
        },
      ),
    });
  }

  override addEvents(): void {
    const { events = {} } = this._props;
    Object.entries(events).forEach(([eventName, eventCallback]: CallbackTuple) => {
      if (eventName === 'blur') {
        const inputList = this.getContent().querySelectorAll('input');
        inputList?.forEach(input => {
          input.addEventListener(eventName, eventCallback);
        });
      } else if (eventName === 'click') {
        const linkElement = this.getContent().querySelector('[href^="/"]') as HTMLLinkElement;
        linkElement?.addEventListener(eventName, eventCallback); 
      } else {
        this.getContent().addEventListener(eventName, eventCallback);
      }
    });
  }
  
  private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (inputElement.validity.patternMismatch) {
      const errorMessage = inputElement.dataset.errorMessage;
      inputElement.setCustomValidity(errorMessage ? errorMessage : '');
    } else {
      inputElement.setCustomValidity(this._checkLengthMismatch(inputElement));
    }
  }
  
  private _checkLengthMismatch(inputElement: HTMLInputElement) {
    if (inputElement.type !== 'text' && inputElement.type !== 'password') {
      return '';
    }
    const valueLength = inputElement.value.trim().length;
    if (valueLength < inputElement.minLength) {
      return `Минимальное количество символов: ${inputElement.minLength}`;
    }
    return '';
  }
  
  private _toggleInputError(inputElement: HTMLInputElement) {
    if (!inputElement.validity.valid) {
      this._toggleErrorSpan(inputElement, inputElement.validationMessage);
    } else {
      this._toggleErrorSpan(inputElement);
    }
  }
  
  private _toggleErrorSpan(inputElement: HTMLInputElement, errorMessage?: string) {
    const inputClassname = inputElement.className.split('__')[0]; 
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    if (errorElement !== null) {
      if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${inputClassname}__error_type_active`);
      } else {
        errorElement.textContent = '';
        errorElement.classList.remove(`${inputClassname}__error_type_active`);
      }
    }
  }
  
  public hasInvalidInput() {
    const inputList = Array.from(this.getContent().querySelectorAll('input'));
    const isCommonValidity = inputList.some(inputElement => !inputElement.validity.valid);
    if (isCommonValidity) {
      return isCommonValidity;
    }
    const passwordInput = [...inputList.filter(input => input.type === 'password')];
    if (passwordInput.length <= 1) {
      return isCommonValidity;
    } else {
      const isPasswordValidity = this._checkPasswordValidity(passwordInput);
      return !isPasswordValidity;
    }
  }
  
  private _toggleButton() {
    const submitButton = this.getContent().querySelector('button');
    const submitButtonClassname = submitButton?.classList[0];
    if (this.hasInvalidInput()) {
      submitButton?.classList.add(submitButtonClassname + '_state_disabled');
      submitButton?.setAttribute('aria-disabled', 'true');
    } else {
      submitButton?.classList.remove(submitButtonClassname + '_state_disabled');
      submitButton?.setAttribute('aria-disabled', 'false');
    }
  }
  
  private _checkPasswordValidity(inputList: HTMLInputElement[]) {
    const newPasswords = inputList.filter(input => input.name === 'newPassword');
    if (newPasswords.length === 2) {
      const oldPassword = inputList.filter(input => input.name === 'oldPassword');
      return (newPasswords[0].value === newPasswords[1].value) && (newPasswords[0].value !== oldPassword[0].value);
    } else {
      return inputList[0].value === inputList[1].value;
    }
  }
}
