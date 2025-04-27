import template from "./template";
import Component from "../../services/Component";
import Form from "../../components/Form/Form";
import FormLabel from "../../components/FormLabel/FormLabel";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const submitButton = new SubmitButton({
    buttonText: "Зарегистрироваться",
});

const emailLabelElement = new FormLabel({
    labelClassName: "form__label_type_register",
    spanHint: "Почта",
    inputId: "input__email",
    inputName: "email",
    inputType: "email",
    inputPlaceHolder: "Виктор",
    ariaDescribedby: "email-error",
    validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
    errorMessage: "Неверный формат почты",
    errorClassname: "input__email-error",
})

const loginLabelElement = new FormLabel({
    labelClassName: "form__label_type_register",
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

const firstNameLabelElement = new FormLabel({
    labelClassName: "form__label_type_register",
    spanHint: "Имя",
    inputId: "input__first_name",
    inputName: "first_name",
    inputType: "text",
    inputPlaceHolder: "Виктор",
    ariaDescribedby: "first_name-error",
    validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
    errorMessage: "Неверный формат имени",
    errorClassname: "input__first_name-error",
});

const secondNameLabelElement = new FormLabel({
    labelClassName: "form__label_type_register",
    spanHint: "Фамилия",
    inputId: "input__second_name",
    inputName: "second_name",
    inputType: "text",
    inputPlaceHolder: "Классен",
    ariaDescribedby: "second_name-error",
    validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
    errorMessage: "Неверный формат фамилии",
    errorClassname: "input__second_name-error",
});

const phoneLabelElement = new FormLabel({
    labelClassName: "form__label_type_register",
    spanHint: "Телефон",
    inputId: "input__phone",
    inputName: "phone",
    inputType: "tel",
    inputPlaceHolder: "+7-(800)-555-35-35",
    ariaDescribedby: "phone-error",
    validPattern: "[0-9]{2,30}$", //добавить нормальное регулярное выражение
    errorMessage: "Неверный формат телефона",
    errorClassname: "input__phone-error",
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

const repeatPasswordLabelElement = new FormLabel({
    labelClassName: "form__label_type_login",
    spanHint: "Пароль (еще раз)",
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
    formTitle: "Регистрация",
    labels: [
        emailLabelElement, 
        loginLabelElement, 
        firstNameLabelElement,
        secondNameLabelElement,
        phoneLabelElement,
        passwordLabelElement,
        repeatPasswordLabelElement
    ],
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