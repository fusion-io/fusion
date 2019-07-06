import bootstrap from "../bootstrap";
import {EventEmitter} from "events";
import {container, QueueWorker} from "@fusion.io/framework";
import {Event, Queue} from "@fusion.io/framework/Contracts";

const event = new EventEmitter();

container.value(Event, event);

bootstrap(event).then(() => {

    const worker = container.make(QueueWorker);
    const qm     = container.make(Queue);

    qm.queue().pull(async (job) => {
        await worker.work(job);
    })
});
