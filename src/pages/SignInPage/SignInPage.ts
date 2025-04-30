import template from "./template";
import Component from "../../services/Component";
import Form from "../../components/Form/Form";
import FormLabel from "../../components/FormLabel/FormLabel";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {signInFormLabelsInfo} from "../../utils/constants";

const submitButton = new SubmitButton({
    buttonText: "Войти",
});

const formElement = new Form({
    formTitle: "Вход",
    labels: [...signInFormLabelsInfo.map(item => 
        new FormLabel({...item})
    )],
    href: "#",
    linkText: "Нет аккаунта?",
    SubmitButton: submitButton,
});
export default class SignInPage extends Component {
    constructor() {
        super({
            Form: formElement,
        });
    }
    override render() {
        return template;
    }
}