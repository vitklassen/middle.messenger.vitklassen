const template = `
<li class="message-box" data-id={{_id}}>
    <img class="message-box__avatar" src="/message-box__avatar-image.png"></img>
    <div class="message-box__info">
        <div class="message-box__info-part">
            <h2 class="message-box__chat">{{chatName}}</h2>
            <p class="message-box__time">{{time}}</p>
        </div>
        <div class="message-box__info-part">
            <p class="message-box__text">{{lastMessage}}</p>
            {{#if unreadMessages}}
                <span class="message-box__unread-messages">{{unreadMessages}}</span>
            {{/if}}
        </div>
    </div>
</li>
`;

export default template;
