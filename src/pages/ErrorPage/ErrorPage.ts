import NewBlock, {BlockProps} from "../../framework/NewBlock";
import template from "./template";

export default class ErrorPage extends NewBlock {
    constructor(props: BlockProps) {
        super({...props});
    }
    override render() {
        return template;
    }
}