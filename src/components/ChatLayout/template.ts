const template = `
<div class="chat-layout">
    <section class="chat-layout__header">
        <img class="chat-layout__avatar" src="../../../image/message-box__avatar-image.png"></img>
        <div class="chat-layout__info">
            <h2 class="chat-layout__chat-name">Вадим</h2>
            <button class="chat-layout__button" popovertarget="my-popover"></button>
            <div id="my-popover" popover>
                <p>Я — простой, но крутой поповер</p>
            </div>
        </div>
    </section>
    <section class="chat-layout__dialog"></section>
    {{{MessageForm}}}
</div>
`;

export default template;