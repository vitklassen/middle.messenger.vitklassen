import { expect } from 'chai';
import Component, { ComponentProps } from './Component';
import Sinon from 'sinon';
/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('Component', () => {
  let TestComponent: typeof Component;

  before(() => {
    class SomeComponent extends Component {
      constructor(props: ComponentProps) {
        super({ ...props });
      }

      override render(): string {
        return `
        <div>
            <p id="test-p">{{text}}</p>
        </div>
        `;
      }
    }

    TestComponent = SomeComponent;
  });

  it('Создание экземпляра класса Component с переданными пропсами', () => {
    const text = 'Test';
    const testComponent = new TestComponent({ text });
    const pText = testComponent.getContent().querySelector('#test-p')?.textContent;

    expect(pText).to.be.eq(text);
  });

  it('Проверка работоспособности реактивности компонента', () => {
    const newTextValue = 'new value';
    const testComponent = new TestComponent({ text: 'Text' });
    testComponent.setProps({ text: newTextValue });
    const pText = testComponent.getContent().querySelector('#test-p')?.textContent;

    expect(pText).to.eq(newTextValue);
  });

  it('Проверка добавления слушателя события на элемент', () => {
    const clickHandler = Sinon.stub();
    const testComponent = new TestComponent({ 
      events: {
        click: clickHandler,
      } });
    const clickEvent = new MouseEvent('click');
    testComponent.getContent().dispatchEvent(clickEvent);

    expect(clickHandler.calledOnce).to.be.true;
  });
});
