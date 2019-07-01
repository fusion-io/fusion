import {get} from "@fusion.io/framework/Http";
import {singleton} from "@fusion.io/container";

@singleton()
export default class HelloWorldController {

    @get('/', [])
    index(context) {

        context.body = {message: "Hello World"};
    }
}
