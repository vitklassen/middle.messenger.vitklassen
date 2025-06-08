const template = `
<div class="popup">
    <div class="popup__container">
        <h2 class="popup__title">{{popupTitle}}</h2>
        {{{Form}}}
        {{#if isCloseButton}}
            <button class="popup__close-button">Отмена</button>
        {{/if}}
    </div>
</div>
`;
export default template;
