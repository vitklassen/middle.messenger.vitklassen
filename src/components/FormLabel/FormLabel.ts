import template from "./template";
import NewBlock, {BlockProps} from "../../framework/NewBlock";

export default class FormLabel extends NewBlock {
    constructor(props: BlockProps) {
        super({...props});
    }
    override render () {
        return template;
    }
}