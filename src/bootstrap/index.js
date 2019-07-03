import loadConfig from "./loadConfig";
import bootServiceProviders from "./bootServiceProviders";

export default async () => {

    // -----------------------------------------------------------------------------------------------------------------
    // | Your initialization tasks
    // -----------------------------------------------------------------------------------------------------------------
    // | Sometimes, we need to run some tasks to set up the server even before the app bootstrap
    // | and those tasks might run asynchronously. This is where you can run those tasks.
    // |
    // | We suggest to write it in a separate file and import it here.
    // |


    await loadConfig();

    await bootServiceProviders();

    // Your task here
};
