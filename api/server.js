var express         = require('express')
var app             = express()
var bodyParser      = require('body-parser')
var sendGrid        = require('@sendgrid/mail')

sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router()

router.get('/', (req, res) => {
    const msg = {
        to: 'macdonald.tim+1@gmail.com',
        from: 'test@example.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sendGrid.send(msg);

    res.json({ message: 'hello' })
})

router.post('/', (req, res) => {
    const { gifter, giftee } = req.body

    const email = {
        to: gifter.email,
        from: 'macdonald.tim@gmail.com',
        subject: 'Secret Santa',
        text: `You're to buy a gift/gifts for ${giftee.name}`,
        html: `You're to buy a gift/gifts for <strong>${giftee.name}</strong>`
    }
    sendGrid.send(email)
    
    res.json({
        email: `${gifter.name}`,
        message: `Secret Santa says you are to buy a gift for ${giftee.name}`
    })
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
app.use('/api', router)

app.listen(port)
console.log(`Listening on port ${port}`)