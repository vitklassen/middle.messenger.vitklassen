import FormComponent from "../../abstract/FormComponent";
import { ComponentProps } from "../../services/Component";
import template from "./template";

export default class Form extends FormComponent {
    constructor(props: ComponentProps) {
    super({ ...props });
  }

  override render() {
    return template;
  }
}
