import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import FormLabel from "../../components/FormLabel/FormLabel";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import NewBlock, { BlockProps } from "../../framework/NewBlock";

export default class SignInPage extends NewBlock {
    constructor(props: BlockProps) {
        super({...props, 
            children: [new Form({
                events: {
                    submit: (event: Event) => {
                        event.preventDefault();
                        console.log();
                    }
                },
                children: [
                    new FormLabel({
                        children: [
                            new FormInput({
                                
                            })
                        ]
                    }),
                    new FormLabel({
                        children: [
                            new FormInput({
                                
                            })
                        ]
                    }),
                    new SubmitButton({

                    })
                ]
            })]
        });
    }
}