async function initmodmail(rolename,token,guildid,prefix,welcomemsg) {
    var Discord = require('discord.js')
    var discord = Discord
    var client = new discord.Client()
    var db = require('basic.db')
    await db.dbcreate("cases")
    await db.dbreset("cases")
    await db.dbset("cases",["Placeholder","Tester"])
    try {
     var gettry = db.dbget("cases")
     console.log("Got ModMail DB.")
    }
    catch(error) {
        console.error('Try Func: ' + error);
        await db.dbset("cases",["Placeholder"])
      }
    client.on('message', async message => {
        if (message.author.bot) return
        if (message.guild) return
        var get = await db.dbget("cases")
        console.log(get)
        var inc = get.includes(message.author.id);
        var incpos = get.indexOf(message.author.id);
        if (message.content === prefix + "resetdb") {
            if(!message.member.roles.some(r=>[rolename].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
                return message.reply("You can't use this command.");
                db.dbreset('cases')
                process.exit();
        }
        if (message.channel.type === "dm") { //if the channel is a DM channel
                var args = message.content.split(" ").slice(0)
                var args = args.slice(0).join(" ") //create the args
            
                if (message.content.startsWith(prefix)) return message.channel.send(":x: Please use commands in real server! :x:") //if the message is a command
                if (!inc) { 
                    var getii = db.dbget('cases')
                    console.log(getii)
                    var getpush = getii.push(message.author.id);
                    console.log(getpush)
                   await db.dbset("cases",getpush)
                   var csget = db.dbget('cases')
                   console.log("Get: " + csget)
                    var caseID = csget
                   var name = "case-" + caseID
              var server = client.guilds.get(guildid)
              var embed = new Discord.RichEmbed()
                    .setColor(0x00FF00)
              .setDescription(welcomemsg);
              message.channel.send(embed)
                if (message.content.startsWith(prefix)) return
                if (args.length > 256) return message.reply("Your message content too many characters :/") //if the message contnt more than 256 character, what fields do not allow
                var embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle("New request in DM!")
                    .addField(args, "Send by: " + message.author.username + " with the  Case ID: " + caseID)
          server.createChannel(name, "text", [
            {
                id: server.roles.find(role => role.name === rolename).id,
                allow: ['VIEW_CHANNEL'],
            },
              {
                id: client.guilds.get(guildid).defaultRole.id,
                deny: ['VIEW_CHANNEL'],
            },
        ]).then(function(chan){
                chan.send(embed) //send the embed in a specific channel
          });
                } else {
                if (message.content.startsWith(prefix)) return
                if (args.length > 256) return message.reply("Your message content too many characters :/") //if the message contnt more than 256 character, what fields do not allow
                var embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle("New message from DM!")
                    .addField(args, "Send by: " + message.author.username + " with the  Case ID: " + incpos)
                    client.guilds.get(guildid).channels.find(c => c.name === name).send(embed)
                            message.react('562889533398450206')//send the embed in a specific channel
                }
            }
            // Netx
            if (message.content.startsWith(prefix + "reply")) {
                if(!message.member.roles.some(r=>[rolename].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
                return message.reply("You can't use this command.");
             var reprole = "{Support Team} "
                var args = message.content.split(" ").slice(0)
                var Rargs = message.content.split(" ").slice(2).join(" ")
                const userID = args[1]
            let dmclient = message.channel.client;
        
            // fetch user via given user id
            await delay(1000)
                    message.delete()
                    var csiget = db.dbget('cases')
                   var caseIDi = csiget[incpos]
            let user = dmclient.fetchUser(caseIDi)
            .then(user => { 
                // once promise returns with user, send user a DM
                      var embed = new Discord.RichEmbed()
                    .setColor('RANDOM')
                    .setTitle("The staff answered you!")
                    .setDescription(Rargs)
                    .setFooter("This message was sent to you by: " + reprole + message.author.username + " !");
                user.send(embed)
                var embed2 = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("Sent Message!")
                .setDescription(Rargs)
                .setFooter("The reply was sent by: " + message.author.username + " !")
                message.channel.send(embed2) //send the message
                //it may be that if the user has blocked your bot that it does not work
                })
            }
            if (message.content.startsWith(prefix + "close")) {
                if(!message.member.roles.some(r=>[rolename].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
                return message.reply("You can't use this command.");
         var reprole = "{Support Team} "
                var args = message.content.split(" ").slice(0)
            const userID = args[1]
            let dmclient = message.channel.client;
        //    let user = dmclient.fetchUser(caseID)
            // fetch user via given user id
            await delay(1000)
                    message.delete()
                    var csgetiii = db.dbget('cases')
                   var caseIDii = csgetiii[incpos]
            let user = dmclient.fetchUser(caseIDii)
            .then(user => {
                // once promise returns with user, send user a DM
                      var embed = new Discord.RichEmbed()
                    .setColor(0xFFFF00)
                    .setTitle("The staff answered you!")
                    .setDescription("This case has now been closed, if you need more help, make sure to DM us!")
                    .setFooter("This message was sent to you by: " + reprole + message.author.username + " !");
                user.send(embed)
            })
                var embed2 = new Discord.RichEmbed()
                .setColor(0xFFFF00)
                .setTitle("Case Closed!")
                .setDescription("Case has been closed.")
                .setFooter("This ticket will close in 10 secnods!")
                //it may be that if the user has blocked your bot that it does not work
            message.channel.send(embed2)
                  await delay(10000)
                  client.guilds.get(guildid).channels.find(c => c.name === "case-" + caseIDii).send(embed).delete()
                }



});
    if (token != false) {
        client.login(token)
    }
}
module.exports.init = initmodmail;