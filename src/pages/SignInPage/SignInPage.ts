import template from "./template";
import Component from "../../services/Component";
import Form from "../../components/Form/Form";
import FormLabel from "../../components/FormLabel/FormLabel";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const submitButton = new SubmitButton({
    buttonText: "Войти",
});

const loginLabelElement = new FormLabel({
    labelClassName: "form__label_type_login",
    spanHint: "Логин",
    inputId: "input__login",
    inputName: "login",
    inputType: "text",
    inputPlaceHolder: "vitklassen",
    ariaDescribedby: "login-error",
    validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
    errorMessage: "Неверный логин",
    errorClassname: "input__login-error",
    minLength: 3,
    maxLength: 20,
});

const passwordLabelElement = new FormLabel({
    labelClassName: "form__label_type_login",
    spanHint: "Пароль",
    inputId: "input__password",
    inputName: "password",
    inputType: "password",
    inputPlaceHolder: "Пароль",
    ariaDescribedby: "password-error",
    validPattern: "[a-zA-Z]{8,40}$", //добавить нормальное регулярное выражение
    errorMessage: "Неверный пароль",
    errorClassname: "input__password-error",
    minLength: 8,
    maxLength: 40,
});

const formElement = new Form({
    formTitle: "Вход",
    labels: [loginLabelElement, passwordLabelElement],
    href: "#",
    linkText: "Нет аккаунта?",
    SubmitButton: submitButton,
});
export default class SignInPage extends Component {
    constructor() {
        super({
            Form: formElement,
        });
    }
    override render() {
        return template;
    }
}