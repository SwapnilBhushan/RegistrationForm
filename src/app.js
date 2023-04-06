const express = require('express')

const app = express();
const path = require('path')
const hbs = require('hbs')
require('./db/conn')
const User = require('./models/User');




//to get data from body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const static_path = app.use(express.static(path.join(__dirname, '../public')))
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")


//to set template engine
app.set('views', template_path)
app.set('view engine', 'hbs')
hbs.registerPartials(partials_path)

//to get register



app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const passCheck = req.body.password;

       User.findOne({ email: email }).then(user=>{
            if (user.password === passCheck) {
                res.status(201).render('successful', {
                    myName: req.body.firstName
                })
            } else {
                res.send("Incorrect Credentials")
            }
        });

       

    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        console.log(req.body)
        if (password === cpassword) {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            })
            const data = await newUser.save()

            res.status(201).render('welcome')
        } else {
            res.send("Incorrect Credentials")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


app.listen(2020, () => {
    console.log("server started at post number 2020 ")
})