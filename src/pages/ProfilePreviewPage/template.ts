const template = `
<main class="content content_type_profile"> 
    <div class="back-link-container">
        <a class="back-link" href="/messenger" data-ref="/messenger"></a>
    </div>
    <div class="profile">
        {{{ProfileHeader}}}
        {{{ProfileForm}}}
        <footer class="profile__footer">
            <a class="profile__footer-link" href="/settings/general" data-ref="/settings/general">Изменить данные</a>
            <a class="profile__footer-link" href="/settings/password" data-ref="/settings/password">Изменить пароль</a>
            <form class="profile__footer-form" method="post" novalidate>
                <button class="profile__footer-button" type="submit">Выйти</button>
            </form>
        </footer>
    </div>
</main>
`;
export default template;
