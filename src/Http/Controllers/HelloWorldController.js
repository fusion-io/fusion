import {get} from "@fusion.io/framework/Http";
import {singleton} from "@fusion.io/bare";

@singleton()
class HelloWorldController {

    @get('/')
    index(context) {
        context.body = {message: this.helloService.run()};
    }
}
