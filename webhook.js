const express = require('express');
const PORT = process.env.PORT || 3001;
const server = express();
const axios = require('axios');
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

var webhookUrl = "https://webhook.site/#!/bf22ab4c-cb01-4d3d-9022-eb035fd6a817/5e8faa8e-5143-4f8b-ac0d-a9095774ecd7/1";

server.post('/api/Send', (req, res) => {
    webhookUrl = req.body.webhookUrl;
    var cardJson = JSON.parse(req.body.cardBody);

    axios.post(req.body.webhookUrl, cardJson)
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
});

server.post('/api/save', (req, res) => {
    var response = JSON.stringify(req.body);
    var card = {
        "type": "message",
        "attachments": [
            {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "contentUrl": null,
                "content": {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "type": "AdaptiveCard",
                    "version": "1.2",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Submitted response:"+ response
                        }
                    ]
                }
            }
        ]
    }

    axios.post(webhookUrl, card).then(res => {
        console.log(`statusCode: ${res.status}`)
        console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});