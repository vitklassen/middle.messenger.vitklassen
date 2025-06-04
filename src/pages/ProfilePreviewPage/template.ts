const template = `
<main class="content content_type_profile"> 
    <div class="back-link-container">
        <a class="back-link" href={{linkPath}} data-ref={{linkPath}}></a>
    </div>
    <div class="profile">
        {{{ProfileForm}}}
        <footer class="profile__footer">
            <a class="profile__footer-button" href="/messenger" data-ref="/messenger">Изменить данные</a>
            <a class="profile__footer-button" href="/messenger" data-ref="/messenger">Изменить пароль</a>
            <form class="profile__footer-form" method="post" novalidate>
                <button class="profile__footer-button profile__footer-button_type_submit" type="submit">Выйти</button>
            </form>
        </footer>
    </div>
</main>
`;
export default template;