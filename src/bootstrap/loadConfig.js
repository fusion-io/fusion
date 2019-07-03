import ConfigManager from "@fusion.io/framework/Config/ConfigManager";
import configValue from "../../config";
import {container} from "@fusion.io/framework";
import {Config} from "@fusion.io/framework/Contracts";
import path from "path";
import fs from "fs";

export default async () => {

    const config = new ConfigManager(configValue);

    container.value(Config, config);

    // Loading the environment based config
    const env           = configValue.env;
    const configFile    = path.resolve(__dirname + '/../../config/env/' + env + '.env.js');

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
}
