import {container} from "@fusion.io/framework";
import bootstrap from "./bootstrap";
import {Config, Event, Kernel} from "@fusion.io/framework/Contracts";
import {EventEmitter} from "events";
import runCliOutput from "./bin/cli";

const event = new EventEmitter();

container.value(Event, event);

runCliOutput(event);

event.emit('fusion.server.starting');

bootstrap(event).then(() => {
    const kernel = container.make(Kernel);
    const config = container.make(Config);

    kernel.listen(config.get('http.port'), () => {
        event.emit('fusion.server.started', config.get('http.port'));
    });
});
