import {get} from "@fusion.io/framework/Http";
import {singleton, Session} from "@fusion.io/bare";
import SessionStartMiddleware from "@fusion.io/framework/Session/SessionStartMiddleware";

@singleton(Session)
class HelloWorldController {

    constructor(session) {
        this.session = session;
    }

    @get('/', [SessionStartMiddleware])
    index(context) {
        const count = this.session.get('count', 0);

        this.session.set('count', count + 1);
        context.body = {message: "Hello World", count};
    }
}
