const template = `
    <form class="profile-form" id="profile-form" novalidate> 
        <div class="profile-form__avatar-wrapper">
            <input name="avatar" type="file" id="avatar" class="profile-form__avatar-input">
            <img src="/profile__avatar-button-image.svg" class="profile-form__avatar-image">
            <label for="avatar" class="profile-form__avatar-label">
               <span class="profile-form__avatar-span">Поменять аватар</span>
            </label>
         </div>
        <h2 class="profile__name">{{profileName}}</h2>
        {{{fieldsets}}}
        {{#if isButton}}
            <button type="submit" class="profile-form__submit-button {{buttonClassName}}">{{buttonText}}</button>
        {{/if}}
    </form>
`;
export default template;
