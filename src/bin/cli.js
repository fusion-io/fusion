import CliProgress from "cli-progress";
import chalk from "chalk";

export default (event, verbose = true) => {

    const serviceLoadingProgressBar      = new CliProgress.Bar({}, CliProgress.Presets.shades_classic);

    event.on('fusion.server.started', port => {
        console.log(chalk.cyanBright("Server listening on " + port));
    });

    event.on('fusion.server.config.env.failed', error => {
        console.warn(chalk.yellow(`> [Warning] Could not load the environment configuration`));
        console.warn(chalk.yellow(`>>> Reason: ${chalk.gray(error.message)}`))
    });

    if (verbose) {
        event.on('fusion.server.starting', () => {
            console.log(chalk.cyan("Starting http server"));
        });

        event.on('fusion.server.bootstrapping', () => {
            console.log(chalk.gray("> Bootstrapping your application"));
        });

        event.on('fusion.server.bootstrapped', () => {
            console.log(chalk.gray("> Bootstrapped"));
        });

        event.on('fusion.server.config.loading', () => {
            console.log(chalk.gray("> Loading server's configuration"));
        });

        event.on('fusion.server.config.env', (env, file) => {
            console.log(chalk.gray(`> Detected the environment configuration [${chalk.cyan(env)}]`));
            console.log(chalk.gray(`> Loading external config at [${chalk.cyan(file)}]`));
        });

        event.on('fusion.server.config.loaded', (config) => {

            if (config.get('debug') && ('production' === process.env.NODE_ENV)) {
                console.warn(chalk.gray(chalk.bgYellowBright(
                    `[SECURITY ALERT] Your application is running in production mode, however the [debug] flag is turning on        \n` +
                    '  Please verify:                                                                                               \n' +
                    '   - [APP_DEBUG] environment variable. It should NOT be set.                                                   \n' +
                    '   - [config/index.js] config file, the [debug] field\'s value. It should NOT be true.                          \n' +
                    '   - [config/env/production.env.js] config file. If it existed, the [debug] field\'s value should NOT be true.  \n'
                )))
            }

            console.log(chalk.gray('> The server has been configured'));
        });

        event.on('fusion.server.service.fetched', (services) => {
            console.log(chalk.gray(`> Loading ${services.length} service(s)`));

            serviceLoadingProgressBar.start(services.length, 0);
        });

        event.on('fusion.server.service.loaded', () => {
            serviceLoadingProgressBar.increment();
        });

        event.on('fusion.server.service.booted', () => {
            serviceLoadingProgressBar.stop();
        });
    }
}
