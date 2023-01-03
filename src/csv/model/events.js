
const email=require('../../users/controller/mail');

const EventEmitter = require('events');

var eventEmitter = new EventEmitter()


    eventEmitter.on('myevent1',function(link,emailid) {
        email.newuser(link,emailid);
        console.log("jobs data got");
        });

module.exports = eventEmitter