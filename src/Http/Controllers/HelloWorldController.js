import {get, singleton, middleware} from "@fusion.io/framework";
import FooBarForm from "../FooBarForm";

@singleton()
export default class HelloWorldController {

    @get('/')
    index(context) {
        return context.render('welcome');
    }

    @get('/foobar-form')
    showForm(context) {
        context.body = {message: context.session.get('errors')};
    }

    @get('/handle')
    @middleware(FooBarForm)
    handleForm(context) {
        context.body = {
            form:  context.foobarForm.value()
        };
    }
}
