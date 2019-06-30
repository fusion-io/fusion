import {container, Config} from "@fusion.io/bare";
import {KERNEL, REGISTRY, registry, ROUTER} from "@fusion.io/framework/Http";
import ConfigManager from "@fusion.io/framework/Config/ConfigManager";

import configValue from "./../config";
import environmentConfig from "./../config/env";

import Koa from "koa";
import Router from "koa-router";


// First we'll instantiate Koa, KoaRouter and ConfigManager
const kernel = new Koa();
const router = new Router();
const config = new ConfigManager(configValue);

// Overwrite the config base on the application's environment
config.setEnv(config.get('env'), environmentConfig[config.get('env')]);


// Initialize the ServiceContainer with initial services in it.
container.value(KERNEL, kernel);
container.value(ROUTER, router);
container.value(REGISTRY, registry);
container.value(Config, config);


(async () => {
    // Initiate the bootstrap sequence.
    const providersConfig = config.get('providers');
    const Providers = await Promise.all(providersConfig.map(providerPath => import(providerPath)));

    // Here we'll load service providers and run the registration steps
    const providers = Providers.map(Provider => new Provider.default(container));

    providers.forEach(provider => provider.register());

    // After the registration has been finished, we'll start bootstrap the services.
    providers.forEach(provider => provider.boot());

    // Start the web server
    kernel.listen(config.get('http.port'));
})();
