// Import modules/packages
const Discord = require('discord.js')
const tokenModule = require('./token.js')
const dataModule = require('./modules/dataModule.js')
const data = require('./modules/dataModule.js')

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

    // Represent message content as variable
    let msgContent = message.content.toLowerCase()

    // First test case
    if (msgContent.includes("keyclubbot") || msgContent.includes("key club bot")){
        message.react('😄')
    }

    if (msgContent.includes("help")){
        message.reply('Welcome to keyclub! Key Club is an international, student-led organization that provides its members with opportunities to provide service, build character and develop leadership. Basically Key Club aims to cooperate with school principals and teachers to provide high school students with invaluable experience in living and working together and to prepare them for useful citizenship. Our members develop initiative and leadership skills by serving their schools and communities. Ping any of the execs and they will be happy to help you get started!')
    }

    if (msgContent.includes("meeting")){
        message.reply({embeds: [dataModule.meetingEmbedData]})
    }
})

// Log into client
client.login(tokenModule.token)