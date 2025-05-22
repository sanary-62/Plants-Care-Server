const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('Plant Server is getting cared.')
});

app.listen(port, () => {
    console.log (`Plant Care server is running on port ${port}`)
})