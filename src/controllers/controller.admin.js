import serviceAdmin from "../services/service.admin.js"

async function insertAdmin(req, res) {

   
    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const {name, email, password} = req.body
    const admin = await serviceAdmin.insertAdmin(name, email, password)

    res.status(201).json(admin) // devolvendo os dados para quem solicitou
    // 201 = criado com sucesso
}


async function loginAdmin(req, res) {
   
    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const { email, password} = req.body

    const admin = await serviceAdmin.loginAdmin( email, password)

    if(admin.length === 0)
        res.status(401).json({error: 'E-mail ou senha inválida'})
    else 
        res.status(200).json(admin) // devolvendo os dados para quem solicitou
    // 200 = alteração concluída com sucesso
}

async function listUsers(req, res) {  
    
    const users = await serviceAdmin.listUsers()
    
        res.status(200).json(users) // devolvendo os dados para quem solicitou
    // 200 = alteração concluída com sucesso
}

export default { insertAdmin, loginAdmin, listUsers }