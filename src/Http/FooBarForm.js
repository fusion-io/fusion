import {Form, form, bind} from "@fusion.io/framework";

@bind()
@form({
    foo: 'contains:foo',
    bar: 'contains:bar'
})
export default class FooBarForm extends Form {

    async handle(context, next) {
        this.assign(context.query);

        let result = await this.validate();

        if (result.valid()) {
            context.foobarForm = this;
            return await next();
        }

        context.body = result.translate();

        // return context.redirectToRoute('HelloWorldController.showForm').with('errors', result);
    }
}
