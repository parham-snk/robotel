const app = require("express")()
const Bot = require("node-telegram-bot-api")
const path = require("path")

let admins = []


process.loadEnvFile("./.env")
const bot = new Bot(process.env.TOKEN, { polling: true, })


bot.on("message", msg => {
    console.log(msg.from)

    bot.getChatAdministrators(msg.chat.id).then(users => {
        users.forEach(admin => {
            admins.push({
                id: admin.user.id, name: admin.user.username, type: admin.status, bot: admin.user.is_bot
            })
        })
    })

    if (msg.text == "slm") {
        bot.banChatSenderChat(msg.chat.id, msg.from.id).then(ok => {
            bot.sendMessage(msg.chat.id, `user ${msg.from.username} banned!`)
            console.log(ok)
            if (ok) {
                bot.sendMessage(msg.chat.id, `user ${msg.from.username} banned!`)

            }
        })
    }
    if (msg.text.includes("free")) {
        let banned = msg.text.split(" ")[1]
        bot.unbanChatMember(msg.chat.id, admin.id).then((ok) => {
            console.log(ok)
        })


    }



})

app.listen(8080,err?console.log(err):console.log("server online !"))