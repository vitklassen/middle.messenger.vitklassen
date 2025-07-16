import { expect, use } from "chai";
import * as sinonChai from "sinon-chai";
import {createSandbox, SinonStub} from 'sinon';
import HTTPTransport from "./HTTPTransport";

describe('HTTP Transport', () => {
    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub<any>;
    
    beforeEach(() => {
        http = new HTTPTransport('');
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve());
    })
})