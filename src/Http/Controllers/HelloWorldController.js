import {singleton, get} from "@fusion.io/framework";

@singleton()
export default class HelloWorldController {

    @get('/', [])
    index(context) {

        context.body = {message: "Hello World"};
    }
}
