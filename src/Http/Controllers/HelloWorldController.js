import {singleton, middleware} from "@fusion.io/framework";
import {route} from "@fusion.io/framework/Http/HttpResolver";
import {Logger} from "@fusion.io/framework/Contracts";

@singleton()
@middleware('web')
export default class HelloWorldController {

    @route('get', '/', Logger)
    index(context) {
        context.body = {message: "Hello World"};
    }
}
