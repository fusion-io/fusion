import {container} from "@fusion.io/framework";
import {Kernel} from "@fusion.io/framework/Contracts";
import bootstrap from "./bootstrap";
import {Config} from "@fusion.io/framework/Contracts";


bootstrap().then(() => {
    const kernel = container.make(Kernel);
    const config = container.make(Config);

    kernel.listen(config.get('http.port'), () => {
        console.log(`> Server started at ${config.get('http.port')}`);
    });
});
