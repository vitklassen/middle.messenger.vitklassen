const template = `
<div class="popup">
    <div class="popup__container {{containerClassname}}">
        <h2 class="popup__title">{{popupTitle}}</h2>
        <form class="popup-form" novalidate>
        <label class="popup-form__label {{labelClassName}}">
            <span class="popup-form__span">{{spanHint}}</span>
            <input 
                class="popup-form__input"
                type="text"
                placeHolder="Введите логин"
                required
            />
        </label>
        <button type="submit" class="popup-form__submit-button">{{buttonText}}</button>
        <form>
    </div>
</div>
`;
export default template;