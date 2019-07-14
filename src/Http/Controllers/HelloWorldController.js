import {get, singleton} from "@fusion.io/framework";
import HelloJob from "../../HelloJob";
import {Storage} from "@fusion.io/framework/Contracts";

@singleton()
export default class HelloWorldController {

    @get('/', Storage)
    async index(context, next, storage) {
        await storage.store('foo', "bar", {tags: ['some', 'tag']});
        await storage.store('foo2', "bar2", {tags: ['some', 'tag', 'here']});
        await new HelloJob(Date.now()).dispatch();
        return await context.render('welcome');
    }
}
