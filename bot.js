require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();

client.login(process.env.BOT_TOKEN);



client.on('ready', () => console.log(`${client.user.tag} has logged in.`));


const usersMap = new Map();
const LIMIT = 5;
const TIME = 1000000;
const DIFF = 3000;

client.on('message', message => {
  if(message.author.bot) return;
  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;    
    let msgCount = userData.msgCount;
    console.log(difference);
    if(difference > DIFF) {
      clearTimeout(timer);
      console.log('Cleared timeout');
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log('Removed from RESET.');
      }, TIME);
      usersMap.set(message.author.id, userData);
    }


           // Code by z1gor //

           
    else {
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        const role = message.guild.roles.cache.get('739853201011900448');
        message.member.roles.add(role);
        message.channel.send(' Пользователь получил мут из-за спама.');
        setTimeout(() => {
          message.member.roles.remove(role);
          message.channel.send('У Пользователя снялся мут.');
        }, TIME);
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log('Removed from map.');
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
});




client.on (`message`, message => {
  if (message.content === "ping")  {
    message.channel.send(`pong`)
  }
});


client.on (`message`, message => {
  if (message.content === "соси") {
    message.channel.send (`сам соси`)
  }
});
