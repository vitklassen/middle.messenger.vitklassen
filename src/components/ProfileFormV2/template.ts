const template = `
    <form class="profile-form" id="profile-form" novalidate> 
        <div class="profile-form__avatar-wrapper">
            <input name="avatar" type="file" id="avatar" class="profile-form__avatar-input">
            <img src="/profile__avatar-button-image.svg" class="profile-form__avatar-image">
            <label for="avatar" class="profile-form__avatar-label">
               <span class="profile-form__avatar-span">Поменять аватар</span>
            </label>
         </div>
        {{#if isActiveName}}
            <h2 class="profile__name">{{profileName}}</h2>
        {{/if}}
        {{#each fieldsets}}
            <fieldset class="profile-form__fieldset" form="profile-form"> 
                <div class="profile-form__label-wrapper">
                    <label class="profile-form__label" for={{this.inputId}}>{{this.labelText}}</label>
                    <input 
                        class="profile-form__input" 
                        id={{this.inputId}}
                        name={{this.inputName}}
                        type={{this.inputType}}
                        placeHolder="{{this.inputPlaceHolder}}"
                        value="{{this.value}}"
                        aria-describedby={{this.ariaDescribedby}}
                        pattern={{this.validPattern}}
                        data-error-message="{{this.errorMessage}}"
                        minlength={{this.minLength}}
                        maxlength={{this.maxLength}}
                        {{#if disabled}}
                            disabled
                        {{/if}}
                        {{#if this.required}}
                            required
                        {{/if}}
                    />
                </div>
                <span class="profile-form__error {{this.errorClassname}}" id={{this.ariaDescribedby}}></span>
            </fieldset>
        {{/each}}
        {{#if isActiveForm}}
            <button type="submit" class="profile-form__submit-button {{buttonClassName}}">{{buttonText}}</button>
        {{/if}}
    </form>
`;
export default template;