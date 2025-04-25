const template = `
<label class="{{labelClassName}}" for={{inputName}}>
    <span class="form__span">{{spanHint}}</span>
    {{#each childrenId}}
        <div data-id={{this}}></div>
    {{/each}}
    <span class="form__span form__span_type_error">{{spanError}}</span>
</label>
`;
export default template;