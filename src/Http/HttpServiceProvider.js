import {HttpServiceProvider as FrameworkProvider, SessionStartMiddleware, AccessLogger} from "@fusion.io/framework";
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
            ServeStatic,
            AccessLogger
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
                ServeStatic,
                SessionStartMiddleware
            ]
        }
    }

    /**
     * Define your routes here.
     *
     * @param router
     */
    routing(router) {
        router
            .group({middleware: 'web'}, webRouter => {
                webRouter
                    .controller(HelloWorldController)
                    //
                ;
            })
            .group({middlewares: 'api', prefix: '/api'}, apiRouter => {
                apiRouter
                    .get('/user/:name', ctx => ctx.body = {message: `Hello ${ctx.params.name}`})
                    //
                ;
            })
        ;
    }
}
