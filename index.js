const SlackBot = require('slackbots'),
      bodyParser = require("body-parser"),
      express = require('express'),
      axios = require('axios');
      dotenv = require('dotenv');
      dotenv.config();

// bot name and access token
const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'rosterbot'
  });

 // initialize the app
  bot.on('start', function(){
    var params = {
      icon_emoji: ':smiley:'
    };
  
    bot.postMessageToChannel(
      'roster',
      "I'm available. Ask me about your shift...",
      params
    );
  });

  // error handler
  bot.on('error', (err)=>
    console.log(err)
    );

  // message handler  
  bot.on('message', (data)=>{
    if(data.type !== 'message'){
        return;
    }
    messageHandler(data);
  });  

  // checks and respond to incoming messages
  function messageHandler(data){
    if(data.text.includes(' /myshifts')){

      const staffUser = data.user;
      console.log(staffUser);
      
      for(shift of shifts){
        if (shift.slackUser=== staffUser) {
          bot.postMessageToUser(shift.staff, shift.date +" "+ shift.shiftTime)
        } else {
          for(staff of staffList){
            if(staff.slackUser === staffUser){
              bot.postMessageToUser(staff.name, "No shifts found");
            }
          }
        }
      }
        // availability();
    }else if(data.text.includes(' /holidays')){
        checkHolidays();
    }else if(data.text.includes(' /confirmed')){
        confirmShift();
    }else if(data.text.includes(' /help')){
      help();
    }
}

function availability(){

    // axios.get(`${process.env.MONGODB_TOKEN}`).then(res =>{
    //     console.log(res.data);
    // });    
        const params = {
          icon_emoji: ':question:'
        };
        bot.postMessageToChannel(
          'roster',
          ` `,
          params
        );
      }

function help(){
  const params = {
    icon_emoji: ':question:'
  };
  bot.postMessageToChannel(
    'roster',
    `Use the following commands:
         "/available" command to let your manager know when you wanna work. 
         "/holidays" command will show when your holidays are schedule.
         "/confirmed" will show all your confirmed shifts.`,
    params
  );
}
