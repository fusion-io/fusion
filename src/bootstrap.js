import ConfigManager from "@fusion.io/framework/Config/ConfigManager";
import {container} from "@fusion.io/framework";
import configValue from "./../config";
import {Config, Kernel} from "@fusion.io/framework/Contracts";
import path from "path";
import fs from 'fs';

(async () => {

    // -----------------------------------------------------------------------------------------------------------------
    // | Initialize ConfigManager
    // -----------------------------------------------------------------------------------------------------------------
    // |
    // |
    const config = new ConfigManager(configValue);

    container.value(Config, config);

    // Loading the environment based config
    const env           = configValue.env;
    const configFile    = path.resolve(__dirname + '/../config/env/' + env + '.env.js');

    config.setEnv(env);

    // Try to load the environment config
    if (fs.existsSync(configFile)) {
        try {
            const envConfig = await import(configFile);

            config.merge(envConfig.default);
        } catch (e) {
            console.warn(`Warning: Failed to load the environment config for [${env}].`);
            console.warn(e.stack);
        }
    }

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
    // | Your initialization tasks
    // -----------------------------------------------------------------------------------------------------------------
    // | Sometimes, we need to run some tasks to set up the server even before the app bootstrap
    // | and those tasks might run asynchronously. This is where you can run those tasks.
    // |
    // | We suggest to write it in a separate file and import it here.
    // |

    // Ex:
    //
    //  await myHeavyTask(container);


    // -----------------------------------------------------------------------------------------------------------------
    // | Spin up the kernel
    // -----------------------------------------------------------------------------------------------------------------
    // |
    // |
    const kernel = container.make(Kernel);


    kernel.listen(config.get('http.port'));
})();
