import {get, singleton} from "@fusion.io/framework";
import {Storage} from "@fusion.io/framework/Contracts";

@singleton()
export default class HelloWorldController {

    @get('/', Storage)
    async index(context, next, storage) {
        console.log(await storage.store('foo', {foo: 'bar'}));
        context.body = { message: 'Hello world'};
    }
}
