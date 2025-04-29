const template = `
    <form class="profile-form" id="profile-form" novalidate> 
        <div class="profile-form__avatar-wrapper">
            <input name="avatar" type="file" id="avatar" class="profile-form__avatar-input">
            <img src="../../image/profile__avatar-button-image.svg" class="profile-form__avatar-image">
            <label for="avatar" class="profile-form__avatar-label">
               <span class="profile-form__avatar-span">Поменять аватар</span>
            </label>
         </div>
        <h2 class="profile__name">{{profileName}}</h2>
        {{{fieldsets}}}
        {{{SubmitButton}}}
    </form>
`;

export default template;