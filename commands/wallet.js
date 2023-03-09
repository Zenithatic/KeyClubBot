const Discord = require('discord.js')
const Mongo = require('mongodb')

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
        
        const uri = "mongodb+srv://general:general@keyclubdata.pzu3vh9.mongodb.net/?retryWrites=true&w=majority";
        const client = new Mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1});
        
        await client.connect()

        const collection = await client.db("KeyClub").collection("Data");
        
        if (user == null){
            // query for user and if not, insert 
            var query = {id: interaction.member.id}
            var exists = await collection.count(query, {limit: 1})

            if (exists == 0){
                userData = {$set: {id: interaction.member.id, keycoins: 0, keys: 0}}
                await collection.updateOne(query, userData, {upsert: true})
                await interaction.reply(`Your id ${interaction.member.id} Your keycoins 0 Your keys 0`)
            }
            else{
                var userData = await collection.findOne(query)
                await interaction.reply(`Your id ${userData.id} Your keycoins ${userData.keycoins} Your keys ${userData.keys}`)
            }


        }
        else{
            // query for user
            var query = {id: user.id}
            var exists = await collection.count(query, {limit:1})

            if (exists == 0){
                userData = {$set: {id: user.id, keycoins: 0, keys: 0}}
                await collection.updateOne(query, userData, {upsert: true})
                await interaction.reply(`That person's id ${user.id} Their keycoins 0 Their keys 0`)
            }
            else{
                var userData = await collection.findOne(query)
                await interaction.reply(`That person's id ${userData.id} That person's keycoins ${userData.keycoins} That person's keys ${userData.keys}`)
            }
        }

        setTimeout(() => {client.close()}, 1500)
    }
}

module.exports = data