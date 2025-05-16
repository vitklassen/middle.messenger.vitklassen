const template = `
<section class="sidebar">
    <a class="sidebar__link" href="/settings" data-ref="/settings">Профиль</a>
    <form class="search-form" novalidate>
        <input type="search" class="search-form__input" name="search" placeholder="Поиск">
    </form>
    {{{ChatList}}}
</section>
`;
export default template;
