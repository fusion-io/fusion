import {get, singleton} from "@fusion.io/framework";
import HelloJob from "../../HelloJob";

@singleton()
export default class HelloWorldController {

    @get('/')
    async index(context) {
        await new HelloJob(Date.now()).dispatch();
        return await context.render('welcome');
    }
}
