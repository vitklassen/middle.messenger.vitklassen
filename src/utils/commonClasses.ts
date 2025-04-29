import Component, {ComponentProps} from "../services/Component";
import { checkInputValidity, toggleInputError, hasInvalidInput } from "./validation";

export default class FormComponent extends Component {
    constructor(props: ComponentProps) {
        super({...props, 
            events: {
                submit: (evt: Event) => {
                    evt.preventDefault();
                    const inputList = Array.from(this.getContent().querySelectorAll("input"));
                    if(!hasInvalidInput(inputList)) {
                        const request: Record<string, string | number> = {};
                        inputList.forEach(input => {
                            request[input.name] = input.value;
                        });
                        console.log(request);
                    }
                    else {
                        console.log("not valid");
                    }
                },
                blur: (evt: Event) => {
                    const inputElement = evt.target as HTMLInputElement;
                    checkInputValidity(inputElement);
                    toggleInputError(inputElement);
                }
            }
        })
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
}