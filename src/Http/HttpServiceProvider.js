import {Config} from "@fusion.io/bare";
import FrameworkProvider from "@fusion.io/framework/Http/HttpServiceProvider";
import koaStatic from "koa-static";

import HelloWorldController from "./Controllers/HelloWorldController";

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
        const config = this.container.resolve(Config);

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
