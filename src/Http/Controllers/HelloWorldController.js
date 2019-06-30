import {get} from "@fusion.io/framework/Http";
import {singleton} from "@fusion.io/bare";
import SayHello from "../../SayHello";

@singleton(SayHello)
class HelloWorldController {

    constructor(helloService) {
        this.helloService = helloService;
    }

    @get('/')
    index(context) {
        context.body = {message: this.helloService.run()};
    }
}
