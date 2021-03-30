import SocketServer from "./socket.js";
import Event from 'events'
import { constants } from "./constants.js";
import Controller from "./controller.js";
const eventEmitter = new Event()

const port = process.env.PORT || 9898
const socketServer = new SocketServer({ port })
const server = await socketServer.initialize(eventEmitter)
console.log('socket server is runing at', server.address().port)

const controller = new Controller({ socketServer })


eventEmitter.on(
    constants.event.NEW_USER_CONNECTED,
    controller.onNewConnection.bind(controller) // O bind é pra definir que o this é do controller, se não ele pegaria o this do EventEmitter
    )