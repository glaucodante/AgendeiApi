import bcrypt from 'bcrypt'
import repoUser from '../repositories/repository.user.js'
import jwt from '../token.js'

    // R E G R A S  D E  N E G Ó C I O 

// service não recebe parâmetros req e res.  
async function insert(name, email, password) {
    
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await repoUser.insert(name, email, hashPassword)

    user.token = jwt.createToken(user.id_user)

    return user // devolvendo dados do usuário
}
// para fazer o login não se utiliza o get, pois não pode ir na url

async function login( email, password) {
    
    
    const user = await repoUser.listByEmail(email)

    if(user.length == 0)
        return []
    else {
        // comparando a senha com o hash salvo no BD  
        if( await bcrypt.compare(password, user.password)) {
            delete user.password // delta a senha para que não retorne-a no body

            user.token = jwt.createToken(user.id_user)

            return user

        } else {
            return []
        }
    }

    return user // devolvendo com o id do usuário
}

// service não recebe parâmetros req e res. 
async function profile(id_user) {
   
    const user = await repoUser.profile(id_user)
    return user
}

export default { insert, login, profile }