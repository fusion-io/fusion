import {container} from "@fusion.io/framework";
import {Config} from "@fusion.io/framework/Contracts";

export default async () => {

    // -----------------------------------------------------------------------------------------------------------------
    // | Initialize the bootstrap sequence
    // -----------------------------------------------------------------------------------------------------------------
    // |

    const config          = container.make(Config);
    const providersConfig = config.get('providers');


    // Try to resolve the service providers class
    const Providers       = await Promise.all(
        providersConfig.map(providerPath => providerPath.startsWith('.') ?

            // This is the "local" service provider (defined by the user)
            import('./../' + providerPath) :

            // This is the library service provider
            import(providerPath))
    );

    // Here we'll load service providers and run the registration steps
    const providers = Providers.map(Provider => new Provider.default(container));

    providers.forEach(provider => provider.register());

    // After the registration has been finished, we'll start bootstrap the services.
    providers.forEach(provider => provider.boot());
}
