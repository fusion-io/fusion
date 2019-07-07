import {get, singleton} from "@fusion.io/framework";
import LogJob from "../../LogJob";

@singleton()
export default class HelloWorldController {

    @get('/')
    async index(context) {

        await new LogJob("Hello world").dispatch("database");

        return context.body = {
            hello: "world"
        };
    }
}
