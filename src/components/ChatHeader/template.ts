const template = `
<section class="chat-header">
    <img class="chat-header__avatar" src="../../../image/message-box__avatar-image.png"></img>
    <div class="chat-header__info">
        <h2 class="chat-header__chat-name">{{chatName}}</h2>
        <button class="chat-header__button" popovertarget="chat-header-popover"></button>
        <div id="chat-header-popover" popover class="chat-header__popover-wrapper">
            <div class="chat-header__button-container">
                <button class="chat-header__control-button chat-header__control-button_type_add" popovertarget="chat-header-popover" popovertargetaction="hide">
                    <img class="chat-header__control-image" src="../../../image/person_add.svg"></img>
                    <span class="chat-header__control-span">Добавить пользователя</span>
                </button>
                <button class="chat-header__control-button chat-header__control-button_type_delete" popovertarget="chat-header-popover" popovertargetaction="hide">
                    <img class="chat-header__control-image" src="../../../image/person_cancel.svg"></img>
                    <span class="chat-header__control-span">Удалить пользователя</span>
                </button>
                <button class="chat-header__control-button chat-header__control-button_type_delete-chat" popovertarget="chat-header-popover" popovertargetaction="hide">
                    <img class="chat-header__control-image" src="../../../image/chat_error.svg"></img>
                    <span class="chat-header__control-span">Удалить чат</span>
                </button>
            </div>
        </div>
    </div>
</section>
`;

export default template;
