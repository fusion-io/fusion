import {Form, form, bind} from "@fusion.io/framework";

@bind()
@form({
    foo: 'required|contains:foo',
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

        return context.redirectToRoute('HelloWorldController.showForm').with('errors', result.translate());
    }
}
