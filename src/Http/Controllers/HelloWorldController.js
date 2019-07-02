import {singleton, middleware} from "@fusion.io/framework";
import {route, get} from "@fusion.io/framework/Http/HttpResolver";
import {Logger, Url} from "@fusion.io/framework/Contracts";

@singleton()
@middleware('web')
export default class HelloWorldController {

    @route('get', '/user/:name', Logger)
    index(context) {
        context.body = {message: "Hello World", name: context.params.name};
    }
}
