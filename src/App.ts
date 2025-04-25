//@ts-nocheck
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ErrorDescription from "./components/ErrorDescription/ErrorDescription";
import Block from "./framework/Block";
import NewBlock from "./framework/NewBlock";

class TestLi extends NewBlock {
    constructor(props: any) {
        super({...props})
    }
    protected override render() {
        return `<li>{{linkText}} {{{Button}}}</li>`;
    }
}

class TestButton extends NewBlock{
    constructor(props: any) {
        super({...props,
        })
    }
    protected override render() {
        return `<button>Click</button>`;
    }
}

class TestUl extends NewBlock{
    constructor(props: any) {
        super({...props, 
            children: [
                new TestLi({
                    linkText: "Hello",
                    events: {
                        click: (evt: Event) => {
                            console.log('click on Li1');
                            evt.stopPropagation();
                        }
                    },
                }),
                new TestLi({
                    linkText: "Привет",
                    events: {
                        click: (evt: Event) => {
                            
                        }
                    }
                })
            ]
            
        })
    }
    protected override render() {
        return `<ul>
            {{#each childrenId}}
        <div data-id={{this}}></div>
    {{/each}}
        </ul>`
    }
}

const ul = new TestUl({}); 

export default class App {
    private appElement: HTMLElement | null;
    constructor() {
        this.appElement = document.getElementById('app');
    }
    public render() {
        if (this.appElement) {
            this.appElement.appendChild(ul.getContent());
        }
    }
     
}

window.myFunction = () => {
    const NewLi1 = new TestLi({
        linkText: "New Li",
    });
ul.setProps({children: [NewLi1]});
}