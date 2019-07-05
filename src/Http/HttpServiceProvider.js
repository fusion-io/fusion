import {HttpServiceProvider as FrameworkProvider, SessionStartMiddleware} from "@fusion.io/framework";
import HelloWorldController from "./Controllers/HelloWorldController";
import ServeStatic from "./Middlewares/ServeStatic";

/**
 * Our HttpServiceProvider, here we can specify how our Http layer works.
 *
 */
export default class HttpServiceProvider extends FrameworkProvider {

    /**
     * List of the global middleware.
     * It will be applied in the whole application.
     *
     * @return {*[]}
     */
    globalMiddlewares() {
        return [
            ServeStatic
        ]
    }

    /**
     * This is a universal place for grouping your middlewares
     * into a logical unit. So you can re-use it in several places.
     *
     * @return {{api: Array, web: *[]}}
     */
    middlewareGroups() {
        return {
            "api": [

            ],

            "web": [
                SessionStartMiddleware
            ]
        }
    }

    routing(router) {
        router.group({middleware: 'web'}, (router) => {
            router
                .controller(HelloWorldController)
            ;
        });
    }
}

