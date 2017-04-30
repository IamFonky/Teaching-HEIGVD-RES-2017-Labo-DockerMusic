/**
 * Created by Fonky on 22.04.2017.
 */

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var instrument = process.argv[2];

var specs = require('./shared/specs');
var message = require('./shared/message');

var sound = specs.instruments[instrument];
if (!sound) {
    console.log("This instrument doesn't exists");
    return -1;
}

var dgram = require('dgram');
var server = dgram.createSocket("udp4");

message.uuid = guid();
message.instrument = instrument;
message.sound = sound;
message.sent_time = new Date().toJSON();
message=JSON.stringify(message);

setInterval(function () {
    console.log("Musician playing " + sound);
    server.send(message, 0, message.length, specs.udp_port, specs.multicast);
}, 1000);




