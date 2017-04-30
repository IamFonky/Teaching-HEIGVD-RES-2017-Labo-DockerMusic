var specs = require('./shared/specs');

var dgram = require('dgram');
var net = require('net');
var client = dgram.createSocket("udp4");

var musicians = new Map();

client.bind(specs.udp_port, function (err, msg) {
    client.addMembership(specs.multicast);
});



client.on('message', function (msg, socket) {

    var message = JSON.parse(msg);
    message.detection_time = new Date().getTime();
    musicians.set(message.uuid, message);


    musicians.forEach(function (message, uuid) {
        console.log(musicians.get(message.uuid).detection_time);
    });

});

var server = net.createServer(function (socket) {

    var logsToSend = [];

    musicians.forEach(function (message, uuid) {
        //socket.write(JSON.stringify(logsToSend) + "\r\n");
        if(new Date().getTime() - message.detection_time <= 5000)
            logsToSend.push(message);
    });

    //logsToSend.sort();

    socket.write(JSON.stringify(logsToSend));

    socket.end();

});

server.listen(specs.tcp_port);

console.log("Auditor listenning!");