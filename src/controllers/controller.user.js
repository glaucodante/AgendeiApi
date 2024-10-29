import serviceUser from "../services/service.user.js"


// Controller só recepciona os dados da requisição 

// função cadastrando os médicos...
async function insert(req, res) {

   
    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const {name, email, password} = req.body
    const user = await serviceUser.insert(name, email, password)

    res.status(201).json(user) // devolvendo os dados para quem solicitou
    // 201 = criado com sucesso
}


async function login(req, res) {
   
    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const { email, password} = req.body

    const user = await serviceUser.login( email, password)

    if(user.length === 0)
        res.status(401).json({error: 'E-mail ou senha inválida'})
    else 
        res.status(200).json(user) // devolvendo os dados para quem solicitou
    // 200 = alteração concluída com sucesso
}

// função listando os dados do usuário logado
async function profile(req, res) {

    const id_user = req.id_user // filtrando o id do usuário

    const user = await serviceUser.profile(id_user)

    res.status(200).json(user) 
}



export default { insert, login, profile }