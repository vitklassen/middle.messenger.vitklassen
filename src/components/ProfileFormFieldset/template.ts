const template = `
<fieldset class="profile-form__fieldset" form="profile-form"> 
    <label class="profile-form__label" for={{inputId}}>{{labelText}}</label>
    <input 
        class="profile-form__input" 
        id={{inputId}}
        name={{inputName}}
        type={{inputType}}
        placeHolder="{{inputPlaceHolder}}"
        aria-describedby={{ariaDescribedby}}
        pattern={{validPattern}}
        data-error-message="{{errorMessage}}"
        minlength={{minLength}}
        maxlength={{maxLength}}
        {{#if disabled}}
            disabled
        {{/if}}
        {{#if reqired}}
            reqired
        {{/if}}
    />
    <span class="form__error {{errorClassname}}" id={{ariaDescribedby}}></span>
</fieldset>
`;
export default template;