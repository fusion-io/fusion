import {get} from "@fusion.io/framework/Http";
import {singleton} from "@fusion.io/bare";
import SessionStartMiddleware from "@fusion.io/framework/Session/SessionStartMiddleware";

@singleton()
class HelloWorldController {

    @get('/', [SessionStartMiddleware])
    index(context) {
        const {Session} = context;

        const count = Session.get('count', 0);

        Session.set('count', count + 1);

        context.body = {message: "Hello World", count};
    }
}
