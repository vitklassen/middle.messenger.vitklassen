const template = `
<div class="popup">
    <div class="popup__container">
        {{#if Form}}
            <h2 class="popup__title">{{popupTitle}}</h2>
            {{{Form}}}
        {{else}}
            <h2 class="popup__title">Удалить чат</h2>
            <h3 class="popup__subtitle">Вы уверены, что хотите удалить этот чат?</h3>
            <button class="popup__delete-chat-button">Удалить</button>
            <button  class="popup__close-button">Отмена</button>
        {{/if}}
    </div>
</div>
`;
export default template;
