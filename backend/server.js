const express = require('express')

const app = express();
const PORT = 3000;


app.get('/ping', (req, res) => {
    res.send("<h1>Hello! Welcome to my Project!</h1>")
});

app.listen(PORT, () => {
    console.log(`Server running of PORT: ${PORT}`)
})