import Sinon from 'sinon';
import router from './Router';
import { expect } from 'chai';

describe('Router', () => {
  it('Проверка работы метода go', () => {
    const spyPushState = Sinon.spy(window.history, 'pushState');
    router.go('/some-route');

    expect(spyPushState.calledOnce).to.eq(true);
  });

  it('Проверка работы метода back', () => {
    const spyBack = Sinon.spy(window.history, 'back');
    router.go('/some-route');
    router.back();

    expect(spyBack.calledOnce).to.eq(true);
  });

  it('Проверка работы метода forward', () => {
    const spyForward = Sinon.spy(window.history, 'forward');
    router.go('/some-route');
    router.forward();

    expect(spyForward.calledOnce).to.eq(true);
  });
});
