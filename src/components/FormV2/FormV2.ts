import template from "./template";
import {ComponentProps} from "../../services/Component";
import FormComponentV2 from "../../utils/commonClasses";


export default class Form extends FormComponentV2 {
    constructor(props: ComponentProps){
        super({...props})
    }
    override render() {
        return template;
    }
}

