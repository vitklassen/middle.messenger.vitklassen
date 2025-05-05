const template = `
<form class="form" method="post" novalidate>
    <h2 class="form__title">{{formTitle}}</h2>
    {{{labels}}}
    <button type="submit" class="submit-button submit-button_type_change-data">{{buttonText}}</button>
    <a href={{href}} data-ref={{href}} class="form__link">{{linkText}}</a>
</form>
`;

export default template;