/* Importações */

require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')

const cors = require("cors")

const port = 3000
const app = express()

app.use(cors())
app.use(express.json())

/* Models */
const User = require('./models/User');


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem-vindo a nossa API' })
})

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

    // checando
    const user = await User.findById(id, '-password')

    if(!user) {
        return res.status(404).json({msg:'Usuário não encontrado'});
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next) {
    const autorizationHead = req.headers['authorization']
    const token = autorizationHead && autorizationHead.split(" ")[1]

    if(!token) {
        return res.status(401).json({msg: "Acesso negado!"})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch(erro) {
        res.status(400).json({msg: "Token inválido!"})
    }
}
// Registro do user
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    // Validando
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatório!' })
    }
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatório!' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas são diferentes!' })
    }

    // Checando user
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(200).json({ msg: 'Por favor, utilize outro e-mail' })
    }

    // Senha
    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(password, salt)

    // User
    const user = new User({
        name,
        email,
        password: passHash,
    })


    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente mais tarde' })
    }
})

// Login
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body
    // Validar campo
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatório!' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'A senha é obrigatório!' })
    }

    // Checar a existência de um usuário

    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    // Checar combinação de password
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida!' })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,
        },
        secret
        )
        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token})

    } catch (err) {
        console.error(err)

        res.status(500).json({ msg: err });
    }
});

// Conexão
const conn = require("./db/conn");
conn();




app.listen(port, function () {
    console.log('listening on port ' + port)
});





