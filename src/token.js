import jwt from 'jsonwebtoken'

const secretToken = 'jornadaJS123' // tem q ser secreta (.ENV)

function createToken(id_user) {
    const token = jwt.sign({id_user},  secretToken, {
        expiresIn: 9999999
    })

    return token
    
}

function validateToken(req, res, next) {
    const authToken = req.headers.authorization // Bearer  000000000

    if(!authToken)
        return res.status(401).json({error: 'Token não informado'})

    const [bearer, token] = authToken.split(' ') // 'Bearer' '000000000'

    jwt.verify(token, secretToken, (err, tokenDecoded) => {

        if(err)
            return res.status(401).json({error: 'Token inválido'})

        req.id_user = tokenDecoded.id_user

        next() // validei o token, pode seguir adiante!

    })
}


function createTokenAdmin(id_admin) {
    const token = jwt.sign({id_admin},  secretToken, {
        expiresIn: 9999999
    })

    return token
    
}

function validateTokenAdmin(req, res, next) {
    const authToken = req.headers.authorization // Bearer  000000000

    if(!authToken)
        return res.status(401).json({error: 'Token não informado'})

    const [bearer, token] = authToken.split(' ') // 'Bearer' '000000000'

    jwt.verify(token, secretToken, (err, tokenDecoded) => {

        if(err)
            return res.status(401).json({error: 'Token inválido'})

        req.id_admin = tokenDecoded.id_admin

        next() // validei o token, pode seguir adiante!

    })
}

export default { createToken, validateToken, createTokenAdmin, validateTokenAdmin}