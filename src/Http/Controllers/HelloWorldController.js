import {get} from "@fusion.io/framework/Http";
import {singleton, Logger} from "@fusion.io/bare";
import SayHello from "../../SayHello";

@singleton(SayHello)
class HelloWorldController {

    constructor(helloService) {
        this.helloService = helloService;
    }

    @get('/', [], [Logger])
    index(context, next, logger) {
        logger.info('Index route visited');

        context.body = {message: this.helloService.run()};
    }
}
