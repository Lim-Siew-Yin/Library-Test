const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/user-model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://systemdb:masterkey@cluster0.zigvfo4.mongodb.net/dbtest?retryWrites=true&w=majority')

app.post('/api/register', async (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing.')
    }else{
        console.log(req.body)
    }
    
    try{
        //const newPassword = await bcrypt.hash(req.body.pass, 10)
        await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status: 'ok'})

    }catch (err){
        console.log(err)
        res.json({status: 'error', error: 'Duplicated email'})
    }
})

// login
app.post('/api/login', async (req, res) => {
    if(!req.body.email){
        return res.status(400).send('Missing URL parameter: email')
    }

    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
       

    if (user) {

        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'secret1234'
        )

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/quote', async(req,res) => {
    const token = req.headers['x-access-token']

    try {

    const decode = jwt.verify(token, 'secret123')
    const email = decode.email
    const user = await User.findOne({email: email})

    return res.json ({status: 'ok', quote: user.quote})

    } catch (error) {
        console.log(error)
        res.json({status: 'error', error:'invalid token'})
    }
})

app.post('/api/quote', async(req,res) => {
    const token = req.headers['x-access-token']

    try {

    const decode = jwt.verify(token, 'secret123')
    const email = decode.email
    await User.updateOne(
        {email: email},
        { $set: {quote: req.body.quote}})

    return res.json({status: 'ok'})

    } catch (error) {
        console.log(error)
        res.json({status: 'error', error:'invalid token'})
    }
})

app.listen(8000, () =>{
    console.log("server run on 8000")
})