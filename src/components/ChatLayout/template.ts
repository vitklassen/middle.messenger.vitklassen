const template = `
<div class="chat-layout">
    <section class="chat-layout__header">
        <img class="chat-layout__avatar" src="../../../image/message-box__avatar-image.png"></img>
        <div class="chat-layout__info">
            <h2 class="chat-layout__chat-name">Вадим</h2>
            <button class="chat-layout__button" popovertarget="chat-layout-popover"></button>
            <div id="chat-layout-popover" popover class="chat-layout__popover-wrapper">
                <div class="chat-layout__button-container">
                    <button class="chat-layout__control-button chat-layout__control-button_type_add">
                        <img class="chat-layout__control-image" src="../../../image/person_add.svg"></img>
                        <span class="chat-layout__control-span">Добавить пользователя</span>
                    </button>
                    <button class="chat-layout__control-button chat-layout__control-button_type_add">
                        <img class="chat-layout__control-image" src="../../../image/person_cancel.svg"></img>
                        <span class="chat-layout__control-span">Удалить пользователя</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section class="chat-layout__dialogue"></section>
    {{{MessageForm}}}
</div>
`;

export default template;