import {get} from "@fusion.io/framework/Http";
import {singleton} from "@fusion.io/bare";
import SessionStartMiddleware from "@fusion.io/framework/Session/SessionStartMiddleware";

@singleton()
class HelloWorldController {

    @get('/')
    index(context) {

        context.body = {message: "Hello World"};
    }
}
