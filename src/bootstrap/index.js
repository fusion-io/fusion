import loadConfig from "./loadConfig";
import bootServiceProviders from "./bootServiceProviders";

export default async (event) => {

    event.emit('fusion.server.bootstrapping');

    // -----------------------------------------------------------------------------------------------------------------
    // | Your initialization tasks
    // -----------------------------------------------------------------------------------------------------------------
    // | Sometimes, we need to run some tasks to set up the server even before the app bootstrap
    // | and those tasks might run asynchronously. This is where you can run those tasks.
    // |
    // | We suggest to write it in a separate file and import it here.
    // |


    await loadConfig(event);

    await bootServiceProviders(event);

    // Your task here

    event.emit('fusion.server.bootstrapped');
};
