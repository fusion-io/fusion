import {Config} from "@fusion.io/bare";
import FrameworkProvider from "@fusion.io/framework/Http/HttpServiceProvider";

import koaStatic from "koa-static";

// import your controller here to make it works
import "./Controllers/HelloWorldController";

/**
 * Our HttpServiceProvider, here we can specify how our Http layer works. We can tweak it from a simple API server
 * to even very sophisticated Web application
 */
export default class HttpServiceProvider extends FrameworkProvider {

    /**
     * Our Kernel is just a Koa app instance.
     *
     */
    bootstrapKernel() {

        const kernel = super.bootstrapKernel();
        const config = this.container.resolve(Config);

        // TODO applying kernel tweak here.
        kernel.use(koaStatic(config.get('http.static.root'), config.get('http.static.opts')));

        return kernel;
    }

    /**
     * Our Router is just a KoaRouter instance.
     *
     */
    bootstrapRoutes() {
        const router = super.bootstrapRoutes();

        // TODO applying router tweak here.
        router.get('/user/:name', context => context.body = {message: `Hi ${context.params.name}`});

        return router;
    }
}
