import {get, singleton} from "@fusion.io/framework";
import {Database} from "@fusion.io/framework/Contracts";

@singleton()
export default class HelloWorldController {

    @get('/', Database)
    async index(context, next, database) {
        const result = await database.connection().raw('select "rikky" as author');

        context.body = {...result};
    }
}
