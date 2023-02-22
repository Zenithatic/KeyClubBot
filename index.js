// Import modules/packages
const Discord = require('discord.js')
const tokenModule = require('./token.js')
const fs = require('node:fs')
const path = require('node:path')
const badwords = require('./modules/badWords').list

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

// Register commands, taken fromd discord.js guide
client.commands = new Discord.Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    // Get all command files
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)

    // Upload commands to Collection in client
    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required 'data' or 'execute' property.`);
	}
}

// Ready callback function
client.once('ready', (bot) => {
    console.log(bot.user.tag + ' is ready')
})

// On interaction create, taken from discord.js guide
client.on('interactionCreate', async interaction => {
    // Return if the interaction is not chat based
    if (!interaction.isChatInputCommand()) return;

    // Get command from client command collection
    const command = interaction.client.commands.get(interaction.commandName);

    // If command doesn't exist, return and log error
    if (!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
		return;
    }

    // Try to execute command
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

// On message create
client.on('messageCreate', async message => {

    // Check if message was sent by a bot
    if (message.author.bot){
        return
    }

    // Represent message content as variable
    let msgContent = message.content.toLowerCase()

    // Check if message contains swear words
    var isClean = await isCleanMessage(msgContent)
    if(!isClean){
        await message.delete()
        await message.channel.send(`Please do not swear in this server, ${message.member.nickname}`)
    }
    // First test case
    if (msgContent.includes('keyclubbot') || msgContent.includes('key club bot')){
        await message.react('🤪')
    }

    if (msgContent.includes('sorry')){
        await message.reply("Its ok, we all make mistakes!")
    }
})

// On message edit
client.on("messageUpdate", async msg => {
    // Check if message contains swear words
    var isClean = await isCleanMessage(msg.content)
    if(!isClean){
        await msg.delete()
        await msg.channel.send(`Please do not swear in this server, ${msg.member.nickname}`)
    }
})

client.on('messageDeleteBulk', async messages => {
    messages.forEach(element =>{
        console.log(element)
    })
})

// Function to determine if message is clean or not
async function isCleanMessage(msg) {
    // Check for bad words
    for (var i = 0; i < badwords.length; i++){
        if (msg.includes(badwords[i])){
            return false
        }
    }
    return true
}

// Log into client
client.login(tokenModule.token)