const template = `
<form class="form" method="post" novalidate>
    <h2 class="form__title">{{formTitle}}</h2>
    {{#each childrenId}}
        <div data-id={{this}}></div>
    {{/each}}
    <a href={{href}} class="form__link">{{linkText}}</a>
</form>
`;

export default template;