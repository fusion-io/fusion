import {ServiceProvider} from "@fusion.io/framework";
import {QueueRegistry} from "@fusion.io/framework";
import HelloJob from "./HelloJob";

export default class AppServiceProvider extends ServiceProvider {

    register() {

    }

    boot() {
        const registry = this.container.make(QueueRegistry);

        registry.register(HelloJob);
    }
}
