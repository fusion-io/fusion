import {get, singleton} from "@fusion.io/framework";

@singleton()
export default class HelloWorldController {

    @get('/')
    async index(context) {
        // context.body = { message: 'Hello world'};
        return context.with('message', 'foobar').redirectToRoute("HelloWorldController.hello", {user: 'world'});
    }

    @get('/hello/:user')
    async hello(context) {
        context.body = {
            hello: context.params.user,
            message: context.session.get('message')
        };

        context.statusCode = 201;
    }
}
