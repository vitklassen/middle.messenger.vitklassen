import template from "./template";
import Component from "../../services/Component";
import Form from "../../components/Form/Form";
import FormLabel from "../../components/FormLabel/FormLabel";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { signUpFormLabelsInfo } from "../../utils/constants";

const submitButton = new SubmitButton({
    buttonText: "Зарегистрироваться",
});

const formElement = new Form({
    formTitle: "Регистрация",
    labels: [...signUpFormLabelsInfo.map(item => 
        new FormLabel({
            labelClassName: item.labelClassName,
            spanHint: item.spanHint,
            inputId: item.inputId,
            inputName: item.inputName,
            inputType: item.inputType,
            inputPlaceHolder: item.inputPlaceHolder,
            ariaDescribedby: item.ariaDescribedby,
            validPattern: item.validPattern,
            errorMessage: item.errorMessage,
            errorClassname: item.errorClassname,
            minLength: item.minLength,
            maxLength: item.maxLength,
        })
    )],
    href: "#",
    linkText: "Войти",
    SubmitButton: submitButton,
});
export default class SignUpPage extends Component {
    constructor() {
        super({
            Form: formElement,
        });
    }
    override render() {
        return template;
    }
}