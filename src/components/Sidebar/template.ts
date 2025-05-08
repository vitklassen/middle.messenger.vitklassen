const template = `
<section class="sidebar">
    <a class="sidebar__link" href="profile" data-ref="profile">Профиль</a>
    <form class="search-form" novalidate>
        <input type="search" class="search-form__input" name="search" placeholder="Поиск">
    </form>
    {{{ChatList}}}
</section>
`;
export default template;
