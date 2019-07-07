import {get, singleton} from "@fusion.io/framework";

@singleton()
export default class HelloWorldController {

    @get('/')
    index(context) {
        return context.render('welcome');
    }
}
