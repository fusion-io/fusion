import ConfigManager from "@fusion.io/framework/Config/ConfigManager";
import {container} from "@fusion.io/framework";

import configValue from "./../config";
import environmentConfig from "./../config/env";

import {Config, Kernel} from "@fusion.io/framework/Contracts";


// First we'll instantiate ConfigManager
const config = new ConfigManager(configValue);

container.value(Config, config);

// Overwrite the config base on the application's environment
config.setEnv(config.get('env'), environmentConfig[config.get('env')]);

(async () => {
    // Initiate the bootstrap sequence.
    const providersConfig = config.get('providers');
    const Providers = await Promise.all(providersConfig.map(providerPath => import(providerPath)));

    // Here we'll load service providers and run the registration steps
    const providers = Providers.map(Provider => new Provider.default(container));

    providers.forEach(provider => provider.register());

    // After the registration has been finished, we'll start bootstrap the services.
    providers.forEach(provider => provider.boot());

    // Load the booted kernel
    const kernel = container.make(Kernel);

    // Start the web server
    kernel.listen(config.get('http.port'));
})();
