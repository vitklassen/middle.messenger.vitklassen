
const template = `
<form class="popup-form" novalidate>
    <label class="popup-form__label">
        <span class="popup-form__span">Логин</span>
        <input 
            class="popup-form__input"
            id="input__login"
            name="login"
            type="text"
            placeHolder="Введите логин"
            aria-describedby="login-error"
            pattern="^[A-Za-z][A-Za-z0-9\\-_]{2,30}$"
            data-error-message="Неверный логин"
            minlength=3
            maxlength=20
            required
        />
        <span class="form__error input__login-error" id="login-error"></span>
    </label>
    <button type="submit" class="popup-form__submit-button {{buttonClassName}}">{{buttonText}}</button>
<form>
`;

export default template;
