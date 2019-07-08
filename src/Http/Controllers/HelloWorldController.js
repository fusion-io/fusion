import {get, singleton, middleware} from "@fusion.io/framework";
import FoobarForm from "../../FoobarForm";

@singleton()
export default class HelloWorldController {

    @get('/')
    index(context) {
        return context.render('welcome');
    }

    @get('/show')
    show(ctx) {
        const errors = ctx.errors();


        ctx.body = {
            errors: errors ? errors.translate() : null
        }
    }

    @middleware(FoobarForm)
    @get('/handle')
    handle(ctx) {
        ctx.body = {
            message: 'done'
        }
    }
}
