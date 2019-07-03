import {HttpServiceProvider as FrameworkProvider, SessionStartMiddleware as StartSession} from "@fusion.io/framework";
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
                StartSession
            ]
        }
    }

    /**
     * List of route groups. Here you can define the route prefix,
     * the related controllers, and the applied middleware (or middleware group).
     *
     */
    routeGroups() {
        return [
            {
                middlewares: ['web'],
                controllers: [
                    HelloWorldController
                ]
            }
        ]
    }

    /**
     * Bootstrap the Kernel.
     */
    boot() {
        super.boot();

        //
    }
}
