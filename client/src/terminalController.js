import ComponentsBuilder from "./components.js"
import { constants } from "./constants.js"

export default class TerminalController {
    #usersColors = new Map()
    constructor() { }

    #pickColor() {
        return `#` + ((1 << 24) * Math.random() | 0).toString(16) + `-fg`
    }
    #getUserColor(userName) {
        if(this.#usersColors.has(userName)) 
            return this.#usersColors.get(userName)
        
        const color = this.#pickColor()
        this.#usersColors.set(userName, color)

        return color

    }
    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue();
            eventEmitter.emit(constants.events.app.MESSAGE_SENT, message)
            this.clearValue();
        }
    }
    #onMessageReceived({ screen, chat }) {
        return msg => {
            const { userName, message } = msg;
            const color = this.#getUserColor(userName)
            chat.addItem(`{${color}}{bold}${userName}{/}: ${message}`);

            screen.render()
        }
    }
    #onLogChanged({ screen, activityLog }) {
        
        return msg => {
            // ramonoliveira left
            // ramonoliveira join
            const [userName] = msg.split(/\s/) //Realiza split nos espaços
            const color = this.#getUserColor(userName)
            activityLog.addItem(`{${color}}{bold}${msg.toString()}{/}`);
            screen.render()        
        }
    }
    #onStatusChanged({ screen, status }) {
        
        // ['ramonoliveira', 'mariazinha'] array de usuários
        return users => {
            // Vamos pegar o primeiro item da lista    
            const { content } = status.items.shift() //retira o primeiro elemento e retorna
            status.clearItems()
            status.addItem(content)
            users.forEach(userName => {
                const color = this.#getUserColor(userName)
                status.addItem(`{${color}}{bold}${userName}{/}`)
            })
            screen.render()
        }
    }
    #registerEvents(eventEmitter, components) {
        eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this.#onMessageReceived(components))
        eventEmitter.on(constants.events.app.ACTIVITYLOG_UPDATED, this.#onLogChanged(components))
        eventEmitter.on(constants.events.app.STATUS_UPDATED, this.#onStatusChanged(components))
    }
    async initializeTable(eventEmitter) {
        console.log("Inicializou!")
        const components = new ComponentsBuilder()
            .setScreen({ title: 'HackerChat - Ramon Oliveira' })
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .setActivityLogComponent()
            .setStatusComponent()
            .build()
        
        this.#registerEvents(eventEmitter, components)

        components.input.focus()
        components.screen.render()

        /* setInterval(() => {
            const users = ['ramonoliveira']
            eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
            users.push('mariazinha')
            eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
            users.push('ironman00, troll001')
            eventEmitter.emit(constants.events.app.STATUS_UPDATED, users)
            users.push('batman01, 000abc')
        }, 1000) */
    }
}