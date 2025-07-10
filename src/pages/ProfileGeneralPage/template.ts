import { Routes } from '../../utils/constants';

const template = `
<main class="content content_type_profile"> 
    <div class="back-link-container">
        <a class="back-link" href=${Routes.Settings} data-ref=${Routes.Settings}></a>
    </div>
    <div class="profile">
        {{{ProfileHeader}}}
        {{{ProfileForm}}}
    </div>
</main>
`;
export default template;
