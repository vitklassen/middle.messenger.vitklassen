const template = `
<form class="form" method="post" novalidate>
    <h2 class="form__title">{{formTitle}}</h2>
    {{#each fieldsets}}
        <label class="form__label {{this.labelClassName}}">
            <span class="form__span">{{this.spanHint}}</span>
            <input 
                class="form__input"
                id={{this.inputId}}
                name={{this.inputName}}
                type={{this.inputType}}
                placeHolder={{this.inputPlaceHolder}}
                aria-describedby={{this.ariaDescribedby}}
                pattern={{this.validPattern}}
                data-error-message="{{this.errorMessage}}"
                minlength={{this.minLength}}
                maxlength={{this.maxLength}}
                {{#if this.required}}
                    required
                {{/if}}
            />
            <span class="form__error {{this.errorClassname}}" id={{this.ariaDescribedby}}></span>
        </label>
    {{/each}}
    <button type="submit" class="form__submit-button {{buttonClassName}}">{{buttonText}}</button>
    <a href={{href}} data-ref={{href}} class="form__link">{{linkText}}</a>
</form>
`;

export default template;
