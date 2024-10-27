import serviceDoctor from "../services/service.doctor.js"

// função listando os médicos...
async function list(req, res) {

    const name = req.query.name // filtrando na query pelo nome do médico

    const doctors = await serviceDoctor.list(name)

    res.status(200).json(doctors) 
}

// função cadastrando os médicos...
async function insert(req, res) {

    /*
    Forma mais verborrágica (mais código) 
    const name = req.body.name 
    const specialty = req.body.specialty 
    const icon = req.body.icon 
     */

    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const {name, specialty, icon} = req.body
    const doctor = await serviceDoctor.insert(name, specialty, icon)

    res.status(201).json(doctor) // devolvendo os dados para quem solicitou
    // 201 = criado com sucesso
}

// função editando o médico...
async function editDoctor(req, res) {
   
    const id_doctor = req.params.id_doctor

    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const {name, specialty, icon} = req.body
    
    const doctor = await serviceDoctor.editDoctor(id_doctor, name, specialty, icon)

    res.status(200).json(doctor) // devolvendo os dados para quem solicitou
    // 200 = alteração concluída com sucesso
}


// função deletando um médico...
async function deleteDoctor(req, res) {
   
    const id_doctor = req.params.id_doctor

        
    const doctor = await serviceDoctor.deleteDoctor(id_doctor)

    res.status(200).json(doctor) // devolvendo os dados para quem solicitou
    // 200 = alteração concluída com sucesso
}

// função listando os serviços médicos...
async function listServices(req, res) {

    const id_doctor = req.params.id_doctor // filtrando no params pelo id do médico

    const services = await serviceDoctor.listServices(id_doctor)

    res.status(200).json(services) 
}


export default { list, insert, editDoctor, deleteDoctor, listServices }