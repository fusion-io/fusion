import {
    HttpServiceProvider as FrameworkProvider,
    ServeStatic,
    StartSession,
    AccessLogger,
    RenderView,
    RenderNunjuckView
} from "@fusion.io/framework";

import HelloWorldController from "./Controllers/HelloWorldController";

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
            AccessLogger,
            ServeStatic,
            RenderView
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
                StartSession,
                RenderNunjuckView
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
            .group({middleware: 'web'}, router => this.webRouting(router))
            .group({middleware: 'api', prefix: '/api/v1'}, router => this.apiRouting(router))
        ;
    }

    /**
     *
     * @param router
     */
    webRouting(router) {
        router.controller(HelloWorldController);
    }

    /**
     *
     * @param router
     */
    apiRouting(router) {
        router.get('api.user', '/user/:name', ctx => ctx.body = {message: `Hello ${ctx.params.name}`});
    }
}
