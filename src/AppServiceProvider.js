import {ServiceProvider} from "@fusion.io/framework";
import {QueueRegistry} from "@fusion.io/framework";
import LogJob from "./LogJob";
import {View} from "@fusion.io/framework/Contracts";

export default class AppServiceProvider extends ServiceProvider {

    register() {

    }

    boot() {
        const registry = this.container.make(QueueRegistry);

        registry
            .register(LogJob)
        ;

        const view = this.container.make(View);

        view.rendering('welcome', (view) => {
            view.with('date', new Date());
        })
    }
}
