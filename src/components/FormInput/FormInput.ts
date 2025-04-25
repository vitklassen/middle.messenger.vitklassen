import template from "./template";
import NewBlock, {BlockProps} from "../../framework/NewBlock";



export default class FormInput extends NewBlock {
    constructor(props: BlockProps) {
        super({...props,
            events: {
                blur: (event: Event) => {
                    console.log(event);
                }
            }
        } 
        );
    }
    override render() {
        return template;
    }

}