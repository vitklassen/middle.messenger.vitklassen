const template = `
<li class="message-box">
    <img class="message-box__avatar" src="../../../image/message-box__avatar-image.png"></img>
    <div class="message-box__info">
        <h2 class="message-box__chat">{{chatName}}</h2>
        <p class="message-box__time">{{time}}</p>
        <p class="message-box__text">{{lastMessage}}</p>
    </div>
</li>
`;

export default template;
