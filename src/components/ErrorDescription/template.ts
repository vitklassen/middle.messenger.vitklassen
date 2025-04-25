const template = `<div class="error">
    <h2 class="error__title">
        {{errorCode}}
    </h2>
    <h3 class="error__subtitle">
        {{errorMessage}}
    </h3>
    <a href="{{href}}" class="error__link">Назад к чатам</a>
</div>`;

export default template;