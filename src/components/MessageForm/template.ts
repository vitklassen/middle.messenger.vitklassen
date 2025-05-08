const template = `
<form class="message-form" novalidate>
    <button type="button" class="message-form__attachment-button" popovertarget="message-form-popover"></button>
    <input type="text" class="message-form__input" placeholder="Сообщение" name="message" minLength=1/>
    <button type="submit" class="message-form__submit-button"></button>
    <div id="message-form-popover" popover class="message-form__popover-wrapper">
        <div class="message-form__button-container">
            <button class="message-form__control-button">
                <img class="message-form__control-image" src="/add_photo.svg"></img>
                <span class="message-form__control-span">Фото или Видео</span>
            </button>
            <button class="message-form__control-button">
                <img class="message-form__control-image" src="/upload_file.svg"></img>
                <span class="message-form__control-span">Файл</span>
            </button>
            <button class="message-form__control-button">
                <img class="message-form__control-image" src="/location_on.svg"></img>
                <span class="message-form__control-span">Локация</span>
            </button>
        </div>
    </div>
</form>
`;

export default template;
