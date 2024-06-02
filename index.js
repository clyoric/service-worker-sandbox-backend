const express = require("express");
const index = express();
const cors = require("cors");
const webPush = require('web-push');

const port = process.env.PORT || 4200;

const apiKeys = {
    publicKey: 'BNeoI5EqpS5nxVhmUcl-zo3vKgfKri2fjFCtRTulpmdl4-sIAqqrj-toF6Ff3TQwQc-re5QthyHhy21naDpw0XM',
    privateKey: 'kpIRPMv93th9q3HhFs6-uFcxDk5w21n9kH5vG6geRts'
}

webPush.setVapidDetails('mailto:andreikryvetski@gmail.com', apiKeys.publicKey, apiKeys.privateKey)

index.use(cors());
index.use(express.json());

index.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabase = [];

index.post("/save-subscription", (req, res) => {
    subDatabase.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" });
})

index.get("/send-notification", (req, res) => {
    webPush.sendNotification(subDatabase[0], "hello from server");
    res.json({ "status": "Success", "message": "Message sent to push service!" })
})

index.listen(port, () => {
    console.log("Server running on port 4200!");
})
