import {get, singleton} from "@fusion.io/framework";
import {Storage} from "@fusion.io/framework/Contracts";

@singleton()
export default class HelloWorldController {

    @get('/', Storage)
    async index(context, next, storage) {
        // await storage.store('foo', {foo: 'bar'});
        console.log(await storage.get('foo'));
        context.body = { message: 'Hello world'};
    }
}
