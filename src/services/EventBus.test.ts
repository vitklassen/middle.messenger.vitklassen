import Sinon from "sinon";
import EventBus from "./EventBus"

describe('EventBus', () => {
    let eventBus: EventBus<() => void>;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it('Проверка метода подписки на событие', () => {
        const testFn = Sinon.stub();
    });
})