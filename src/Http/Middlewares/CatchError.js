import {singleton} from "@fusion.io/framework";

@singleton()
export default class CatchError {
    async handle(context, next) {
        try {
            await next();
        } catch (err) {
            context.app.emit('error', err, context);
        }
    }
}
