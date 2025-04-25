const template = `<li class="message-box">
    <div class="message-box__avatar"></div>
    <div class="message-box__info">
        <h2 class="message-box__chat">{{chatName}}</h2>
        <p class="message-box__text">{{lastMessage}}</p>
        <p class="message-box__time">{{time}}</p>
        <div class="message-box__unread-messages">{{unreadMessages}}</div>
    </div>
</li>`;
export default template;