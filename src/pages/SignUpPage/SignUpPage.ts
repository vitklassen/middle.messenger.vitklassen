import template from "./template";
import Component from "../../services/Component";
import Form from "../../components/Form/Form";
import FormLabel from "../../components/FormLabel/FormLabel";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { signUpFormLabelsInfo } from "../../utils/constants";

const submitButton = new SubmitButton({
    buttonText: "Зарегистрироваться",
});

const formElement = new Form({
    formTitle: "Регистрация",
    labels: [...signUpFormLabelsInfo.map(item => 
        new FormLabel({...item})
    )],
    href: "#",
    linkText: "Войти",
    SubmitButton: submitButton,
});
export default class SignUpPage extends Component {
    constructor() {
        super({
            Form: formElement,
        });
    }
    override render() {
        return template;
    }
}
