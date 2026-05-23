const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const WEBHOOK_URL = 
process.env.WEBHOOK_URL;

// Load users
let users = JSON.parse(fs.readFileSync("users.json"));

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, role: user.role });
    } else {
        res.json({ success: false });
    }
});

// SEND COMMAND
app.post("/send", async (req, res) => {
    const { msg, user } = req.body;

    const log = `[${new Date().toLocaleString()}] ${user}: ${msg}\n`;
    fs.appendFileSync("logs.txt", log);

    try {
        await axios.post(WEBHOOK_URL, {
            content: `📡 **${user}**: ${msg}`
        });
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(Port, () =>
console.log(running on " + PORT));
