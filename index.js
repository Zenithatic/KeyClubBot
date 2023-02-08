// Import modules/packages
const Discord = require('discord.js')
const tokenModule = require('./token.js')
const dataModule = require('./modules/dataModule.js')
const data = require('./modules/dataModule.js')
const fs = require('node:fs')
const path = require('node:path')

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
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Ready callback function
client.once("ready", (bot) => {
    console.log(bot.user.tag + " is ready")
})

// On interaction create, taken from discord.js guide
client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
		return;
    }

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
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