const template = `
<main class="content">
    <nav class="navigation">
        <ul class="navigation__list">
          <li class="navigation__item">
            <a href="error-404" data-ref="error-404" class="navigation__link">Страница 404</a>
          </li>
          <li class="navigation__item">
            <a href="error-5**" data-ref="error-5**" class="navigation__link">Страница 5**</a>
          </li>
          <li class="navigation__item">
            <a href="signin" data-ref="signin" class="navigation__link">Страница авторизации</a>
          </li>
          <li class="navigation__item">
            <a href="signup" data-ref="signup" class="navigation__link">Страница регистрации</a>
          </li>
          <li class="navigation__item">
            <a href="profile" data-ref="profile" class="navigation__link">Страница профиля</a>
          </li>
          <li class="navigation__item">
            <a href="chat" data-ref="chat" class="navigation__link">Страница с чатами</a>
          </li>
        </ul>
      </nav>
</main>
`;
export default template;
