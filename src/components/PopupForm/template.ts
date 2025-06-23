
const template = `
<form class="popup-form" novalidate>
    {{#if isUserAction}}
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
    {{else if isChatDeleting}}
        <h3 class="popup-form__subtitle">Вы уверены, что хотите удалить этот чат?</h3>
    {{else if isChatAdding}}
        <label class="popup-form__label">
            <span class="popup-form__span">Название чата</span>
            <input 
                class="popup-form__input"
                id="input__title"
                name="title"
                type="text"
                placeHolder="Введите название чата"
                aria-describedby="title-error"
                pattern="^[A-Za-z0-9][A-Za-z0-9\\-_]{2,30}$"
                data-error-message="Некорректное имя чата"
                minlength=1
                maxlength=20
                required
            />
            <span class="form__error input__title-error" id="title-error"></span>
        </label>
    {{else}}
        {{#isEqual avatarFileName ""}}
            <span class="popup-form__avatar-file-name">{{avatarFileName}}</span>
        {{else}}
            <div class="popup-form__avatar-wrapper">
                <input name="avatar" type="file" id="avatar" class="popup-form__avatar-input">
                <label for="avatar" class="popup-form__avatar-label">
                    <span class="popup-form__avatar-span">Выбрать файл на компьютере</span>
                </label>
            </div>
        {{/isEqual}}
    {{/if}}
    <button type="submit" class="popup-form__submit-button {{buttonClassName}}">{{buttonText}}</button>
<form>
`;
export default template;
