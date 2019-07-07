import {job, inject} from "@fusion.io/framework";
import {Logger} from "@fusion.io/framework/Contracts";

@job(
    job => job.message,
    message => new LogJob(message)
)
export default class LogJob {

    constructor(message) {
        this.message  = message;
    }

    @inject(Logger)
    async execute(logger) {
        logger.info(this.message);
    }
}
