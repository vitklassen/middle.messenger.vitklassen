import Block from "../../framework/Block";
import template from './template';
import NewBlock from "../../framework/NewBlock";
type SubmitButtonProps = {
    buttonText: string;
}

export default class SubmitButton extends NewBlock {
    constructor(props: SubmitButtonProps) {
        super({...props,             
            attr: {
                class: 'submit-button'
            },
    });
    }
    override render() {
        return template;
    }
}