const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://31.220.81.141:1883");

client.on('error', (e) => {
    console.log(e)
})

client.on("connect", () => {

    client.subscribe('presence')
    client.publish('presence', 'hello')
}
);

client.on("message", (topic, message) => {
    // message is Buffer
    console.log(message.toString());
    client.publish(topic.toString(), message.toString())
});