import {HttpServiceProvider as FrameworkProvider} from "@fusion.io/framework";
import koaStatic from "koa-static";

import HelloWorldController from "./Controllers/HelloWorldController";
import {Config} from "@fusion.io/framework/Contracts";

/**
 * Our HttpServiceProvider, here we can specify how our Http layer works. We can tweak it from a simple API server
 * to even very sophisticated Web application
 */
export default class HttpServiceProvider extends FrameworkProvider {

    get controllers() {
        return [
            HelloWorldController
        ]
    }

    get middlewares() {
        return {
            "api": [

            ],
            "web": [

            ]
        }
    }

    get globalMiddlewares() {
        return [

        ]
    }

    /**
     * Our Kernel is just a Koa app instance.
     *
     */
    bootstrapKernel() {

        const kernel = super.bootstrapKernel();
        const config = this.container.make(Config);

        // This is the place you can play around with the kernel and middlewares
        kernel.use(koaStatic(config.get('http.static.root'), config.get('http.static.opts')));

        // Handling error
        kernel.use(async (context, next) => {
            try {
                await next();
            } catch (err) {
                context.app.emit('error', err, context);
            }
        });

        return kernel;
    }

    /**
     * Our Router is just a KoaRouter instance.
     *
     */
    bootstrapRoutes() {
        const router = super.bootstrapRoutes();

        // This is the place you can play around with the router and route middlewares
        router.get('/user/:name', context => context.body = {message: `Hi ${context.params.name}`});

        return router;
    }
}
