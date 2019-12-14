import {sleep} from "./dashAPI";
import {receive_users_info} from "../components/main/UserDisplay";

export default class WebSocketHolder {

    private websocket: WebSocket = undefined;
    private pending = [];
    private connecting: boolean = false;
    private connected: boolean = false;
    private handlers = {};
    private pending_questions = {};

    constructor(login) {
        this.handlers = {
            hello: login,
            pong: this.heartbeat,
            reply: this.answerbox,
            users_info: receive_users_info,
            error: (data) => alert(data)
        };
    }

    // initiate uplink and register handlers
    private connect = () => {
        this.connecting = true;
        this.websocket = new WebSocket(`${process.env.API_SECURE == "true" ? "wss" : "ws"}://${process.env.API_ROOT}/ws`);
        this.websocket.onopen = this.onopen;
        this.websocket.onclose = this.cancelKeepAlive;
        this.websocket.onmessage = this.receiver;
    };

    // uplink established, send data
    private onopen = () => {
        this.connecting = false;
        this.connected = true;
        this.pending.forEach((data) => this.send(data.type, data.message));
        this.keepAlive()
    };

    // we got mail! send it to the right receiver
    private receiver = (event) => {
        const message = JSON.parse(event.data);
        if (! this.handlers[message.type])
            console.error("unhandled reply!", message.type)
        this.handlers[message.type](message.content)
    };


    // deliver the message to the api
    send = (type, message?) => {
        if (this.websocket == undefined && !this.connecting)
            this.connect();
        if (this.connected)
            this.websocket.send(JSON.stringify({type: type, message: message}));
        else
            this.pending.push({type: type, message: message})
    };

    // hi i would like some updates please!
    subscribe = ({channel, subkey = null, handler}) => {
        this.handlers[channel] = handler;
        this.send("subscribe", {channel: channel, subkey: subkey})
    };

    // sorry you're no longer interesting enough
    unsubscribe = (channel) => {
        delete this.handlers[channel];
        this.send("unsubscribe", {channel: channel})
    };

    // hey do you know the answer to this o all knowing api?
    ask_the_bot = (question, info, receiver) => {
        this._ask("question", question, info, receiver)
    };


    ask_the_api = (question, info, receiver) => {
        this._ask("question_api", question, info, receiver)
    };

    _ask = (type, question, info, receiver) => {
        const uid = Math.random().toString(36).substr(2, 9) + "-" + Math.random().toString(36).substr(2, 9);
        this.send(
            type,
            {
                question: question,
                info: info,
                uid: uid
            }
        );
        this.pending_questions[uid] = receiver
    };

    // oh it does know the answer!
    answerbox = (data) => {
        const {uid, answer} = data;
        this.pending_questions[uid](answer);
        delete this.pending_questions[uid];
    };


    // keepalive
    private timerID;
    keepAlive = () => {
        if (this.websocket.readyState == this.websocket.OPEN) {
            this.websocket.send('{"type":"ping"}');
        }
        this.timerID = setTimeout(this.keepAlive, 20000);
    };


    cancelKeepAlive = () => {
        if (this.timerID) {
            clearTimeout(this.timerID);
        }
    };

    heartbeat = () => {
    };

}