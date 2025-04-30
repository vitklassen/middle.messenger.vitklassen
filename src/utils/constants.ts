const formElementsDescription = {
    login: {
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
        required: true,
    },
    password: {
        inputName: "password",
        inputType: "password",
        inputPlaceHolder: "Пароль",
        validPattern: "[a-zA-Z]{8,40}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат пароля",
        minLength: 8,
        maxLength: 40,
        required: true
    },
    firstName: {
        inputId: "input__first_name",
        inputName: "first_name",
        inputType: "text",
        inputPlaceHolder: "Виктор",
        ariaDescribedby: "first_name-error",
        validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат имени",
        errorClassname: "input__first_name-error",
        minLength: 0,
        maxLength: 100,
        reqiured: true,
    },
    secondName: {
        inputId: "input__second_name",
        inputName: "second_name",
        inputType: "text",
        inputPlaceHolder: "Классен",
        ariaDescribedby: "second_name-error",
        validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат фамилии",
        errorClassname: "input__second_name-error",
        minLength: 0,
        maxLength: 100,
        reqiured: true,
    },
    displayName: {
        inputId: 'input__display_name',
        labelText: 'Имя в чате',
        inputName: 'display_name',
        inputType: 'text',
        inputPlaceHolder:'Виктор',
        ariaDescribedby: 'display_name-error',
        validPattern: '',
        errorMessage: '',
        minLength: 0,
        maxLength: 10000,
        disabled: true,
        required: true,
    },
    email: {
        inputId: "input__email",
        inputName: "email",
        inputType: "email",
        inputPlaceHolder: "vit.klassen@yandex.ru",
        ariaDescribedby: "email-error",
        validPattern: "[a-zA-Z]{2,30}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат почты",
        errorClassname: "input__email-error",
        minLength: 0,
        maxLength: 100,
        required: true,
    },
    phone: {
        inputId: "input__phone",
        inputName: "phone",
        inputType: "tel",
        inputPlaceHolder: "+7-(800)-555-35-35",
        ariaDescribedby: "phone-error",
        validPattern: "[0-9]{10,15}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат телефона",
        errorClassname: "input__phone-error",
        minLength: 10,
        maxLength: 15,
        required: true,
    },
    oldPassword: {
        inputId: 'input__oldPassword',
        labelText: 'Старый пароль',
        inputName: 'oldPassword',
        inputType: 'password',
        ariaDescribedby: 'oldPassword-error',
        validPattern: "[a-zA-Z]{8,40}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат пароля",
        minLength: 8,
        maxLength: 40,
        required: true,
    },
    newPassword: {
        inputName: 'newPassword',
        inputType: 'password',
        validPattern: "[a-zA-Z]{8,40}$", //добавить нормальное регулярное выражение
        errorMessage: "Неверный формат пароля",
        minLength: 8,
        maxLength: 40,
        required: true,
    },
    message: {

    },

};

export const signInFormLabelsInfo = [
    {
        ...formElementsDescription.login,
        labelClassName: "form__label_type_login",
        spanHint: "Логин",
    },
    {
        ...formElementsDescription.password,
        labelClassName: "form__label_type_login",
        spanHint: "Пароль",
        inputId: "input__password",
        ariaDescribedby: "password-error",
        errorClassname: "input__password-error",
    }
];

export const signUpFormLabelsInfo = [
    {
        ...formElementsDescription.email,
        labelClassName: "form__label_type_register",
        spanHint: "Почта",
    },
    {
        ...formElementsDescription.login,
        labelClassName: "form__label_type_register",
        spanHint: "Логин",
    },
    {
        ...formElementsDescription.firstName,
        labelClassName: "form__label_type_register",
        spanHint: "Имя",
    },
    {
        ...formElementsDescription.secondName,
        labelClassName: "form__label_type_register",
        spanHint: "Фамилия",
    },
    {
        ...formElementsDescription.phone,
        labelClassName: "form__label_type_register",
        spanHint: "Телефон",
    },
    {
        ...formElementsDescription.password,
        labelClassName: "form__label_type_login",
        spanHint: "Пароль",
        inputId: "input__password_1",
        ariaDescribedby: "password_1-error",
        errorClassname: "input__password_1-error",
    },
    {
        ...formElementsDescription.password,
        labelClassName: "form__label_type_login",
        spanHint: "Пароль (еще раз)",
        inputId: "input__password_2",
        inputPlaceHolder: "Пароль",
        ariaDescribedby: "password_2-error",
        errorClassname: "input__password_2-error",
    },
];

export const profileChangeData = [
    {
        ...formElementsDescription.email,
        labelText: 'Почта',
        disabled: true,
    },
    {
        ...formElementsDescription.login,
        labelText: 'Логин',
        disabled: true,
    },
    {
        ...formElementsDescription.firstName,
        labelText: 'Имя',
        disabled: true,
    },
    {
        ...formElementsDescription.secondName,
        labelText: 'Фамилия',
        disabled: true,
    },
    {
        ...formElementsDescription.displayName,
    },
    {
        ...formElementsDescription.phone,
        labelText: 'Телефон',
        disabled: true,
    }
];

export const passwordChangeData = [
    {
        ...formElementsDescription.oldPassword,
        disabled: false,
    },
    {
        ...formElementsDescription.newPassword,
        inputId: 'input__newPassword_1',
        labelText: 'Новый пароль',
        ariaDescribedby: 'newPassword_1-error',
        errorMessage: '',
        disabled: false,
    },
    {
        ...formElementsDescription.newPassword,
        inputId: 'input__newPassword_2',
        labelText: 'Повторите новый пароль',
        ariaDescribedby: 'newPassword_2-error',
        errorMessage: '',
        disabled: false,
    }
];
