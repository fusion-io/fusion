import {HalTemplate, hal} from "@fusion.io/framework";

@hal(() => '/message/welcome')
export default class Message extends HalTemplate {

    render({message, from}) {
        this
            .state('content', message)
            .state('from', from)
        ;
    }
}
