import ConfigManager from "@fusion.io/framework/Config/ConfigManager";
import {container} from "@fusion.io/framework";
import configValue from "./../config";
import environmentConfig from "./../config/env";
import {Config, Kernel} from "@fusion.io/framework/Contracts";

// ---------------------------------------------------------------------------------------------------------------------
// | Initialize ConfigManager
// ---------------------------------------------------------------------------------------------------------------------
// |
// |
const config = new ConfigManager(configValue);

container.value(Config, config);

config.setEnv(config.get('env'), environmentConfig[config.get('env')]);

(async () => {

    // -----------------------------------------------------------------------------------------------------------------
    // | Your initialization tasks
    // -----------------------------------------------------------------------------------------------------------------
    // | Sometimes, we need to run some tasks to set up the server even before the app bootstrap
    // | and those tasks might run asynchronously. This is where you can run those tasks.
    // |
    // | We suggest to write it in a separate file and import it here.
    // |

    // Ex:
    //
    //  await myHeavyTask();


    // -----------------------------------------------------------------------------------------------------------------
    // | Initialize the bootstrap sequence
    // -----------------------------------------------------------------------------------------------------------------
    // |

    const providersConfig = config.get('providers');
    const Providers = await Promise.all(providersConfig.map(providerPath => import(providerPath)));

    // Here we'll load service providers and run the registration steps
    const providers = Providers.map(Provider => new Provider.default(container));

    providers.forEach(provider => provider.register());

    // After the registration has been finished, we'll start bootstrap the services.
    providers.forEach(provider => provider.boot());


    // -----------------------------------------------------------------------------------------------------------------
    // | Spin up the kernel
    // -----------------------------------------------------------------------------------------------------------------
    // |
    // |
    const kernel = container.make(Kernel);


    kernel.listen(config.get('http.port'));
})();
