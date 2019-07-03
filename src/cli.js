import CliProgress from "cli-progress";
import chalk from "chalk";

export default (event) => {

    const bar1      = new CliProgress.Bar({}, CliProgress.Presets.shades_classic);

    event.on('fusion.server.starting', () => {
        console.log(chalk.cyan("Starting http server"));
    });

    event.on('fusion.server.started', (port) => {
        console.log(chalk.cyanBright("Server listening on port: " + port));
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
        console.log(chalk.gray(`> Loading external config at ${chalk.cyan(file)}`));
    });

    event.on('fusion.server.config.env.failed', error => {
        console.warn(`> Could not load the environment configuration. Reason ${error.message}`)
    });

    event.on('fusion.server.config.loaded', () => {
        console.log(chalk.gray('> The server has been configured'));
    });

    event.on('fusion.server.service.fetched', (services) => {
        console.log(chalk.gray(`> Loading ${services.length} service(s)`));

        bar1.start(services.length, 0);
    });

    event.on('fusion.server.service.loaded', () => {
        bar1.increment();
    });

    event.on('fusion.server.service.booted', () => {
        bar1.stop();
    })
}
