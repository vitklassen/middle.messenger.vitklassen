import { Routes } from '../../utils/constants';

const template = `
<section class="sidebar">
    <a class="sidebar__link" href=${Routes.Settings} data-ref=${Routes.Settings}>Профиль</a>
    <form class="search-form" novalidate>
        <input type="search" class="search-form__input" name="search" placeholder="Поиск">
    </form>
    <button class="sidebar__button" type="button">Добавить чат</button>
    {{{ChatList}}}
</section>
`;
export default template;
