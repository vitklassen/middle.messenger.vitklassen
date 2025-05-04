const template = `
<section class="sidebar">
    <a class="sidebar__link" href="profile" data-ref="profile">Профиль</a>
    <form class="search-form" novalidate>
        <input type="search" class="search-form__input" name="search" placeholder="Поиск">
    </form>
    <ul class="chat-list">
        {{{messages}}}
    </ul>
</section>
`;

export default template;