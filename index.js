const Discord = require('discord.js')
const tokenModule = require('./token.js')

const client = new Discord.Client({
    intents: 32727
})

client.on("ready", (bot) => {
    console.log(bot.user.tag + " is ready")
})

client.login(tokenModule.token)