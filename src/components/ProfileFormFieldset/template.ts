const template = `
<fieldset class="profile-form__fieldset" form="profile-form"> 
    <div class="profile-form__label-wrapper">
        <label class="profile-form__label" for={{inputId}}>{{labelText}}</label>
        <input 
            class="profile-form__input" 
            id={{inputId}}
            name={{inputName}}
            type={{inputType}}
            placeHolder="{{inputPlaceHolder}}"
            value="{{value}}"
            aria-describedby={{ariaDescribedby}}
            pattern={{validPattern}}
            data-error-message="{{errorMessage}}"
            minlength={{minLength}}
            maxlength={{maxLength}}
            {{#if disabled}}
                disabled
            {{/if}}
            {{#if required}}
                required
            {{/if}}
        />
    </div>
    <span class="profile-form__error {{errorClassname}}" id={{ariaDescribedby}}></span>
</fieldset>
`;
export default template;
