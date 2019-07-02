import {singleton} from "@fusion.io/framework";
import {get} from "@fusion.io/framework/Http/HttpResolver";

@singleton()
export default class HelloWorldController {

    @get('/')
    index(context) {
        context.body = {message: "Hello World"};
    }
}
