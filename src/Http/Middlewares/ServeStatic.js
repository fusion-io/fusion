import {singleton} from '@fusion.io/framework';
import {Config} from "@fusion.io/framework/Contracts";
import koaStatic from "koa-static";

@singleton(Config)
export default class ServeStatic {
    constructor(config) {
        this.config = config;
    }

    handle(context, next) {
        const {root, opts} = this.config.get('http.static');

        return koaStatic(root, opts)(context, next);
    }
}
