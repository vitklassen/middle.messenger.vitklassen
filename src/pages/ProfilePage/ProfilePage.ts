import ProfileFooter from "../../components/ProfileFooter/ProfileFooter";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileFormFieldset from "../../components/ProfileFormFieldset/ProfileFormFieldset";
import Component from "../../services/Component";
import template from "./template";
import { profileChangeData, passwordChangeData } from '../../utils/constants';
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const submitButton = new SubmitButton({
    buttonText: "Сохранить",
    attr: {
        class: "submit-button submit-button_type_change-data",
    }
})

const profileForm = new ProfileForm({
    fieldsets: [...profileChangeData.map(item => {
        return new ProfileFormFieldset({...item})
    })],
    events: {
        submit: (evt: Event) => {
            evt.preventDefault()
            console.log('profileform is sumbit')
        }
    }
});
const profileFooter = new ProfileFooter({
    events: {
        click: (evt: Event) => {
            evt.stopPropagation();
            const button = evt.target as HTMLButtonElement;
            if(button.textContent === "Изменить данные") { 
                submitButton.setProps({
                    attr: {
                        class: "submit-button submit-button_type_change-data",
                    }
                });        
                profileForm.setProps({
                    fieldsets: [...profileChangeData.map(item => {
                        return new ProfileFormFieldset({...item, disabled: false})
                    })],
                    SubmitButton: submitButton,
                });
            }
            else if(button.textContent === "Изменить пароль") {
                submitButton.setProps({
                    attr: {
                        class: "submit-button submit-button_type_change-password",
                    }
                });
                profileForm.setProps({
                    fieldsets: [...passwordChangeData.map(item => {
                        return new ProfileFormFieldset({...item})
                    })],
                    SubmitButton: submitButton,
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