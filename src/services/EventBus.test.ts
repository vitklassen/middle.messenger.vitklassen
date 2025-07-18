import Sinon from 'sinon';
import EventBus from './EventBus';
import { assert, expect } from 'chai';

describe('EventBus', () => {
  let eventBus: EventBus<() => void>;
  const firstEventName = 'EVENT_1';
  const secondEventName = 'EVENT_2';

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('Проверка метода подписки на событие', () => {
    const testHandler = Sinon.stub();
    const testArgs = ['arg1', 'arg2'];
    eventBus.on(firstEventName, testHandler);
    eventBus.notify(firstEventName, ...testArgs);

    expect(testHandler.calledOnceWith(...testArgs)).to.be.true;
  });

  it('Проверка того, что вызывается только метод определенного события', () => {
    const testHandler1 = Sinon.stub();
    const testHandler2 = Sinon.stub();
    eventBus.on(firstEventName, testHandler1);
    eventBus.on(secondEventName, testHandler2);
    eventBus.notify(firstEventName);
        
    expect(testHandler1.calledOnce).to.be.true;
    expect(testHandler2.calledOnce).to.be.false;
  });

  it('Проверка вызова нескольких коллбэков для одного события', () => {
    const testHandler1 = Sinon.stub();
    const testHandler2 = Sinon.stub();
    eventBus.on(firstEventName, testHandler1);
    eventBus.on(firstEventName, testHandler2);
    eventBus.notify(firstEventName);
        
    expect(testHandler1.calledOnce).to.be.true;
    expect(testHandler2.calledOnce).to.be.true;
  });

  it('Проверка вызова несуществующего события', () => {
    assert.throw(() => eventBus.notify(firstEventName));
  });
});
