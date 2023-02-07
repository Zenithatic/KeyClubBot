// Import modules/packages
const Discord = require('discord.js')
const tokenModule = require('./token.js')

// Initiate client
const client = new Discord.Client({
    intents: [ 
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildModeration
    ]
})

// Ready callback function
client.once("ready", (bot) => {
    console.log(bot.user.tag + " is ready")
})

// On message create
client.on("messageCreate", message => {

    // Check if message was sent by a bot
    if (message.author.bot){
        return
    }

    let msgContent = message.content.toLowerCase()

    // First test case
    if (msgContent.includes("keyclubbot") || msgContent.includes("key club bot")){
        message.react('😄')
    }
})

// Log into client
client.login(tokenModule.token)