import ProfileFooter from "../../components/ProfileFooter/ProfileFooter";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileFormFieldset from "../../components/ProfileFormFieldset/ProfileFormFieldset";
import Component from "../../services/Component";
import template from "./template";
import { profileChangeData, passwordChangeData } from '../../utils/constants';

const profileForm = new ProfileForm({
    fieldsets: [...profileChangeData.map(item => {
        return new ProfileFormFieldset({...item})
    })],
    buttonText: "Сохранить",
    isButton: false,
});
const profileFooter = new ProfileFooter({
    events: {
        click: (evt: Event) => {
            evt.stopPropagation();
            const button = evt.target as HTMLButtonElement;
            if(button.textContent === "Изменить данные") {       
                profileForm.setProps({
                    fieldsets: [...profileChangeData.map(item => {
                        return new ProfileFormFieldset({...item, disabled: false})
                    })],
                    buttonClassName: "profile-form__submit-button_type_change-data",
                    isButton: true,
                });
            }
            else if(button.textContent === "Изменить пароль") {
                profileForm.setProps({
                    fieldsets: [...passwordChangeData.map(item => {
                        return new ProfileFormFieldset({...item})
                    })],
                    buttonClassName: "profile-form__submit-button_type_change-password profile-form__submit-button_state_disabled",
                    isButton: true,
                })
            }
            profileFooter.setProps({
                attr: {
                    class: "profile__footer_display_none"
                }
            })
        }
    }
});

export default class ProfilePage extends Component {
    constructor() {
        super({
            ProfileForm: profileForm,
            ProfileFooter: profileFooter,

        });
    }

    override render() {
        console.log('profilePage is render');
        return template;
    }
}