import {singleton} from "@fusion.io/bare";

@singleton()
export default class SayHello {

    run() {
        return "Hello World";
    }
}
