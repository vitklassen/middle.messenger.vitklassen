const template = `
<div class="chat-layout">
    {{#if isEmptyChat}}
        <section class="chat-layout__empty-chat">
            <h2 class="chat-layout__hint">Выберите чат, чтобы отправить сообщение</h2>
        </section>
    {{else}}
        {{{ChatHeader}}}
        <ul class="chat-layout__dialogue">
            {{#each chats}}
                <li class="chat-layout__chat-part">
                    <h3 class="chat-layout__chat-date">{{date}}</h3>
                    {{#each messages}}
                        {{#if isCurrentUser}}
                            <div class="chat-layout__message-container chat-layout__message-container_type_my-message">
                                <p class="chat-layout__message-content">{{content}}</p>
                                <p class="chat-layout__message-time chat-layout__message-time_type_my-message">{{time}}</p>
                            </div>
                        {{else}}
                            <div class="chat-layout__message-container chat-layout__message-container_type_other-message">
                                <p class="chat-layout__message-content">{{content}}</p>
                                <p class="chat-layout__message-time chat-layout__message-time_type_other-message">{{time}}</p>
                            </div>
                        {{/if}}
                    {{/each}}
                </li>
            {{/each}}
        </ul>
        {{{MessageForm}}}
    {{/if}}
</div>
`;

export default template;
