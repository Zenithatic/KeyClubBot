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
    if(!isClean && message.channelId != '1071239980145446942'){
        await message.delete()
        await message.channel.send(`Please do not swear in this server, ${message.member.nickname}`)
    }
    // First test case
    if (msgContent.includes('keyclubbot') || msgContent.includes('key club bot')){
        await message.react('🤪')
    }

    if (msgContent.includes('insult')){
        await message.reply("Listen to me right now, Trunks. Tell me why you and your family did a GTA 5 heist on the T grizzly’s diamond-fuckin’-encrusted testicle, my boy, you look like a double-dipped, chocolate chip, cleft-lip, charcoal slim jim with a gargamel nose, a Mr. Crocker hunch back, no fuckin’ feet, nine-arm, seven-stomachs, two ball fades, your stepdad beat you with a whiffle ball bat. You’re curled up into a ball like an autistic bakugan. You live in a sophisticated mud hut, your washing machine is a bucket of water that you shake, and you brush your teeth with your grandpa’s back scratcher and you floss your teeth with zipline cables. I caught you jerking off in a porta potty with a Thanos gauntlet on while your grandmother got simultaneously buttfucked by a clan of chimpanzees dressed up as The Wiggles while she was snorting cott- fucking, Keemstar’s cotton candy Gfuel off of the back of a dirty toilet seat my boy, you are really ugly like shit. You are a walking glitch, “dJ tRuNkS”. Every time your Dad asks you a question at dinner, you say “okay, DRRRRRRRR”, and start fuckin’ lagging, you fuckin ugly ass boy, you breathe like shit boy, ugly ass boy. And I caught you giving a reverse cow rimjob to your tickle-me Elmo doll, and that bitch was like “Elmo! AUHH”, DUMBASS BOY run that shit back. Say something, pussy")
        await message.react('🖕🏻')
        await message.reply("You look like a discombobulated philosophical butt-flake disabled Crip-walking crawfish half-eaten autistic autobot doin’ the cha-cha slide with seventeen naked mole rats in your basement, your grandmother got raped by a crouton with a Gucci belt in northern Idaho boy. Shut your dirty ass up boy, I swear to God I’m really gonna get to the slackin' and rackin' and dickita-dackin and flippin' and rippin' and dippin' and slippin' and pippin and dippin' and rippin' and tippin' in ya fat ass, your name is DJ Trunks, more like DJ Skunks cause you smell like poop, you ugly ass bitch, you are dirty like shit. I caught you at picture day dressed up like a clown with no hair, said [singing some song that I don’t know mockingly], started singing Japanese songs to your girlfriend saying “Oaku, amanatai, amanakinasai-ya”. And then she bitch slapped you with a frying pan and licked your testicles and said “anuminum OKRRRR”. DUMBASS BOY, run that shit back.")
    }

    if (msgContent.includes('kevin') || msgContent.includes('mr. ho')){
        await message.reply('hellosh feeeeshics shtudensh')
    }
    if (msgContent.includes('osh')){
        await message.reply('Hellosh feeshic shtudensh')
    }

    

    
//test commit
    
})

// On message edit
client.on("messageUpdate", async (oldmsg, newmsg) => {
    // Check if message contains swear words
    var isClean = await isCleanMessage(newmsg.content)
    if(!isClean){
        await newmsg.delete()
        await newmsg.channel.send(`Please do not swear in this server, ${newmsg.member.nickname}`)
    }
})

client.on('messageDeleteBulk', async (messages) => {
    messages.forEach(element =>{
        console.log(element)
    })
})
  //
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
//o]lol

// Log into client
client.login(tokenModule.token)