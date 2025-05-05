import Component, {ComponentProps} from "../services/Component";
import { checkInputValidity, toggleInputError, hasInvalidInput } from "./validation";

// export default class FormComponent extends Component {
//     constructor(props: ComponentProps) {
//         super({...props, 
//             events: {
//                 submit: (evt: Event) => {
//                     evt.preventDefault();
//                     const inputList = Array.from(this.getContent().querySelectorAll("input"));
//                     if(!hasInvalidInput(inputList)) {
//                         const request: Record<string, string | number> = {};
//                         inputList.forEach(input => {
//                             request[input.name] = input.value;
//                         });
//                         console.log(request);
//                     }
//                     else {
//                         console.log("not valid");
//                     }
//                 },
//                 blur: (evt: Event) => {
//                     const inputElement = evt.target as HTMLInputElement;
//                     checkInputValidity(inputElement);
//                     toggleInputError(inputElement);
//                 }
//             }
//         })
//     }
//     override addEvents(): void {
//         const {events = {}} = this._props;
//         Object.entries(events).forEach(([eventName, eventCallback]) => {
//             if(eventName === "blur") {
//                 const inputList = this.getContent().querySelectorAll("input");
//                 inputList?.forEach(input => {
//                     input.addEventListener(eventName, eventCallback);
//                 });
//             }
//             else {
//                 this.getContent().addEventListener(eventName, eventCallback);
//             }
//         });
//     }
// }

export default class FormComponentV2 extends Component {
    constructor(props: ComponentProps) {
        super({...props,
            events: {
                submit: (evt: Event) => {
                    evt.preventDefault();
                    //if()
                    const inputList = Array.from(this.getContent().querySelectorAll("input"));
                    const request: Record<string, string | number> = {};
                        inputList.forEach(input => {
                            request[input.name] = input.value;
                        });
                        console.log(request);
                },
                blur: (evt: Event) => {
                    const inputElement = evt.target as HTMLInputElement;
                    this._checkInputValidity(inputElement);
                    this._toggleInputError(inputElement);
                    this._toggleButton();
                }
            }
        });
    }
    override addEvents(): void {
        const {events = {}} = this._props;
        Object.entries(events).forEach(([eventName, eventCallback]) => {
            if(eventName === "blur") {
                const inputList = this.getContent().querySelectorAll("input");
                inputList?.forEach(input => {
                    input.addEventListener(eventName, eventCallback);
                });
            }
            else {
                this.getContent().addEventListener(eventName, eventCallback);
            }
        });
    }
    public enableValidation() {
        this._toggleButton();
    }
    private _checkInputValidity(inputElement: HTMLInputElement): void {
        if (inputElement.validity.patternMismatch) {
            const errorMessage = inputElement.dataset.errorMessage;
            inputElement.setCustomValidity(errorMessage ? errorMessage : "");
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
    private _hasInvalidInput() {
        const inputList = Array.from(this.getContent().querySelectorAll("input"));
        return (inputList.some(inputElement => !inputElement.validity.valid));
    }
    private _toggleButton() {
        const submitButton = this.getContent().querySelector('button');
        if(!this._hasInvalidInput()) {
            submitButton?.classList.add('button-inactive');
            submitButton?.setAttribute('aria-disabled', 'true')
        }
        else {
            submitButton?.classList.remove('button-inactive');
            submitButton?.setAttribute('aria-disabled', 'false')
        }

    }
}