import {job} from "@fusion.io/framework";

@job(
    job => job.message,
    message => new LogJob(message)
)
export default class LogJob {

    constructor(message) {
        this.message  = message;
    }

    async execute() {
        console.log(this.message);
    }
}
