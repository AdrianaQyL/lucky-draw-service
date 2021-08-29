var express = require('express')
var cors = require('cors')

const app = express()
const port = 3001

const PrizeController = require('./app/controllers/PrizeController');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/prize/getConfiguration', (req, res) => {
    let ret = PrizeController.getConfiguration().then(r => {
        // console.log(r)
        res.json(r)
    })
})

app.post('/prize/selectPrize', (req, res) => {
    let ret = PrizeController.getPrize(req.body)
    res.json(ret)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})