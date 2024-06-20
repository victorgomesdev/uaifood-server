const mqtt = require('mqtt')

const mqttClient = mqtt.connect('mqtt://31.220.81.141:1883')

module.exports = mqttClient