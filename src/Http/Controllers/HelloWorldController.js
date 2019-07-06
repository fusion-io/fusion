import {get, singleton} from "@fusion.io/framework";

@singleton()
export default class HelloWorldController {

    @get('/')
    async index(context) {
        return context.body = {
            message: "Hello World"
        };
    }
}
