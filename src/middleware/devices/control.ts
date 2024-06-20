import mqttClient from "../../mqtt";

export default async function remoteControlMiddleware(){

    mqttClient.publish('control', '')
}