const template = `
<main class="content content_type_profile"> 
    <div class="back-button-container">
        <button class="back-button" id="navigate-button_to_messenger" data-ref="/messenger"></button>
    </div>
    <div class="profile">
        {{{ProfileForm}}}
        {{{ProfileFooter}}}
    </div>
</main>
`;
export default template;
