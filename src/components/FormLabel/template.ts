const template = `
<label class="form__label {{labelClassName}}">
    <span class="form__span">{{spanHint}}</span>
    <input 
        class="form__input"
        id={{inputId}}
        name={{inputName}}
        type={{inputType}}
        placeHolder={{inputPlaceHolder}}
        aria-describedby={{ariaDescribedby}}
        pattern={{validPattern}}
        data-error-message="{{errorMessage}}"
        minlength={{minLength}}
        maxlength={{maxLength}}
        {{#if required}}
            required
        {{/if}}
    />
    <span class="form__error {{ errorClassname }}" id={{ariaDescribedby}}></span>
</label>
`;
export default template;