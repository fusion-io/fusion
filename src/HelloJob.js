import {job, inject} from "@fusion.io/framework";
import {Logger} from "@fusion.io/framework/Contracts";

@job(job => job.getMessage(), message => new HelloJob(message))
export default class HelloJob {

    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return this.message;
    }

    @inject(Logger)
    execute(logger) {
        logger.info(this.getMessage());
    }
}