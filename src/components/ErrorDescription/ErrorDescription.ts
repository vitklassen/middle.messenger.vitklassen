import Block from "../../framework/Block";
import template from "./template";

type ErrorDescriptionProps = {
    errorCode: number;
    errorMessage: string;
    href: string;
}

export default class ErrorDescription extends Block {
    constructor(props: ErrorDescriptionProps) {
        super({...props});
    }
    override render() {
        return template;
    }
}