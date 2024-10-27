import bcrypt from 'bcrypt'
import repoAdmin from '../repositories/repository.admin.js'
import jwt from '../token.js'

    // R E G R A S  D E  N E G Ó C I O 

// service não recebe parâmetros req e res.  
async function insertAdmin(name, email, password) {
    
    const hashPassword = await bcrypt.hash(password, 10)

    const admin = await repoAdmin.insertAdmin(name, email, hashPassword)

    admin.token = jwt.createToken(admin.id_admin)

    return admin // devolvendo dados do usuário
}
// para fazer o login não se utiliza o get, pois não pode ir na url

async function loginAdmin( email, password) {
    
    
    const admin = await repoAdmin.listByEmailAdmin(email)

    if(admin.length === 0)
        return []
    else {
        // comparando a senha com o hash salvo no BD  
        if( await bcrypt.compare(password, admin.password)) {
            delete admin.password // deleta a senha para que não retorne-a no body

            admin.token = jwt.createToken(admin.id_admin)

            return admin

        } else {
            return []
        }
    }

    return admin // devolvendo com o id do usuário
}

export default { insertAdmin, loginAdmin }