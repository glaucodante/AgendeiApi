import serviceAppointment from "../services/service.appointments.js"

// função listando as reservas
async function listByUser(req, res) {

    // quem está logado?
    const id_user = req.id_user // usuário logado no app

    const appointments = await serviceAppointment.listByUser(id_user)

    res.status(200).json(appointments) 
}

// função listando as reservas pelo ADMIN
async function listByAdmin(req, res) {

    // listar os dados segundo os critérios abaixo
    const id_user = req.id_user   
    const dt_start = req.query.dt_start // data inicial
    const dt_end = req.query.dt_end // data final
    const id_doctor = req.query.id_doctor 

    const appointments = await serviceAppointment.listByAdmin(id_user, dt_start, dt_end, id_doctor)

    res.status(200).json(appointments) 
}


// função inserindo agendamento
async function insertAppointment(req, res) {
    const id_user = req.id_user
    // FORMA POR MEIO DE DESESTRUTURAÇÃO (MENOS CÓDIGO)
    const {id_doctor, id_service, booking_date, booking_hour } = req.body
    const appointment = await serviceAppointment.insertAppointment 
    (
        id_user, id_doctor, id_service, booking_date, booking_hour 
    )

    res.status(201).json(appointment) // devolvendo os dados para quem solicitou
    // 201 = criado com sucesso
}

async function deleteAppointment(req, res) {
    const id_user = req.id_user
    
    const id_appointment = req.params.id_appointment // params vem da rota
    
    const appointment = await serviceAppointment.deleteAppointment(id_user, id_appointment)

    res.status(200).json(appointment) // devolvendo os dados para quem solicitou
    
}



export default { listByUser, listByAdmin, insertAppointment, deleteAppointment }