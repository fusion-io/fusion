import {get, singleton} from "@fusion.io/framework";
import {Queue} from "@fusion.io/framework/Contracts";
import LogJob from "../../LogJob";

@singleton()
export default class HelloWorldController {

    @get('/', Queue)
    async index(context, next, queue) {

        await new LogJob("Hello World").dispatch();

        return context.body = {
            message: "Hello World"
        };
    }
}
