const template = `
<div class="chat-layout">
    {{#if isEmptyChat}}
        <section class="chat-layout__empty-chat">
            <h2 class="chat-layout__hint">Выберите чат, чтобы отправить сообщение</h2>
        </section>
    {{else}}
        {{{ChatHeader}}}
        <section class="chat-layout__dialogue"></section>
        {{{MessageForm}}}
    {{/if}}
</div>
`;

export default template;