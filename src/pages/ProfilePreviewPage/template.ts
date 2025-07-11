import { Routes } from '../../utils/constants';

const template = `
<main class="content content_type_profile"> 
    <div class="back-link-container">
        <a class="back-link" href=${Routes.Messenger} data-ref=${Routes.Messenger}></a>
    </div>
    <div class="profile">
        {{{ProfileHeader}}}
        {{{ProfileForm}}}
        <footer class="profile__footer">
            <a class="profile__footer-link" href=${Routes.SettingsGeneral} data-ref=${Routes.SettingsGeneral}>Изменить данные</a>
            <a class="profile__footer-link" href=${Routes.SettingsPassword} data-ref=${Routes.SettingsPassword}>Изменить пароль</a>
            <form class="profile__footer-form" method="post" novalidate>
                <button class="profile__footer-button" type="submit">Выйти</button>
            </form>
        </footer>
    </div>
</main>
`;
export default template;
