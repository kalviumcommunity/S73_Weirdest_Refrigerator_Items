const express = require('express')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;


app.get('/ping', (req, res) => {
    res.json({
        message: "Pong",
        status: "success",
    });
});

app.listen(PORT, () => {
    console.log(`Server running of PORT: ${PORT}`)
})