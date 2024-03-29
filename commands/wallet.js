const Discord = require('discord.js')
const Mongo = require('mongodb')
const uri = require('../token').mongouri

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('wallet')
        .setDescription('shows all your key club goodies')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('user to check balance of (leave blank if checking yourself)')
            .setRequired(false)
        ),
    async execute(interaction){
        const user = interaction.options.getUser('user')
    
        const client = new Mongo.MongoClient(uri, {
            serverApi: {
                version: Mongo.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });          
        
        await client.connect()

        const collection = await client.db("KeyClub").collection("Data");

        const walletEmbed = new Discord.EmbedBuilder()
            .setAuthor({
                name: 'KeyClubBot', 
                iconURL: 'https://i.imgur.com/r2SHWqW.png'
            })
            .setColor(Discord.Colors.Blurple)
            .setTimestamp()
        
        if (user == null){
            // query for user and if not, insert 
            var query = {id: interaction.member.id}
            var exists = await collection.count(query, {limit: 1})

            if (exists == 0){
                userData = {$set: {id: interaction.member.id, keycoins: 0, keys: 0}}
                await collection.updateOne(query, userData, {upsert: true})

                walletEmbed.setTitle('Wallet of ' + interaction.member.user.tag)
                walletEmbed.setThumbnail(interaction.member.user.avatarURL())
                walletEmbed.setDescription(
                    'Wallet ID: ' + interaction.member.id + 
                    '\nKeycoins: ' + '0' + "<:keycoin:1083436466560049172>" + 
                    '\nKeys: ' + '0' + "🔑"
                )

                
                await interaction.reply({embeds: [walletEmbed]})
            }
            else{
                var userData = await collection.findOne(query)

                walletEmbed.setTitle('Wallet of ' + interaction.member.user.tag)
                walletEmbed.setThumbnail(interaction.member.user.avatarURL())
                walletEmbed.setDescription(
                    'Wallet ID: ' + interaction.member.id + 
                    '\nKeycoins: ' + `${userData.keycoins}` + "<:keycoin:1083436466560049172>" + 
                    '\nKeys: ' + `${userData.keys}` + "🔑"
                )

                await interaction.reply({embeds: [walletEmbed]})
            }


        }
        else{
            // query for user
            var query = {id: user.id}
            var exists = await collection.count(query, {limit:1})

            if (exists == 0){
                userData = {$set: {id: user.id, keycoins: 0, keys: 0}}
                await collection.updateOne(query, userData, {upsert: true})

                walletEmbed.setTitle('Wallet of ' + user.tag)
                walletEmbed.setThumbnail(user.avatarURL())
                walletEmbed.setDescription(
                    'Wallet ID: ' + user.id + 
                    '\nKeycoins: ' + '0' + "<:keycoin:1083436466560049172>" + 
                    '\nKeys: ' + '0' + "🔑"
                )

                await interaction.reply({embeds: [walletEmbed]})
            }
            else{
                var userData = await collection.findOne(query)

                walletEmbed.setTitle('Wallet of ' + user.tag)
                walletEmbed.setThumbnail(user.avatarURL())
                walletEmbed.setDescription(
                    'Wallet ID: ' + user.id + 
                    '\nKeycoins: ' + `${userData.keycoins}` + "<:keycoin:1083436466560049172>" + 
                    '\nKeys: ' + `${userData.keys}` + "🔑"
                )

                await interaction.reply({embeds: [walletEmbed]})
            }
        }
    }
}

module.exports = data
