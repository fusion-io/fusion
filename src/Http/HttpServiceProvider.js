import {HttpServiceProvider as FrameworkProvider, SessionStartMiddleware as StartSession} from "@fusion.io/framework";
import HelloWorldController from "./Controllers/HelloWorldController";
import CatchError from "./Middlewares/CatchError";
import ServeStatic from "./Middlewares/ServeStatic";

/**
 * Our HttpServiceProvider, here we can specify how our Http layer works.
 * We can tweak it from a simple API server to very sophisticated Web application.
 *
 */
export default class HttpServiceProvider extends FrameworkProvider {

    /**
     * List of controllers that will be used
     *
     * @return Array
     */
    controllers() {
        return [
            HelloWorldController
        ]
    }

    middlewareGroups() {
        return {

            "api": [

            ],

            "web": [
                StartSession
            ]
        }
    }

    globalMiddlewares() {
        return [
            ServeStatic,
            CatchError
        ]
    }
}
