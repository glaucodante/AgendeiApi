import repoAppointment from "../repositories/repository.appointments.js"


// service não recebe parâmetros req e res. 
async function listByUser(id_user) {
   
    const appointments = await repoAppointment.listByUser(id_user)
    return appointments
}

async function listByAdmin(id_user, dt_start, dt_end, id_doctor) {
   
    const appointments = await repoAppointment.listByAdmin(id_user, dt_start, dt_end, id_doctor)
    return appointments
}


async function insertAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {
   
    const appointment = await repoAppointment.insertAppointment(id_user, id_doctor, id_service, booking_date, booking_hour)
    
    return appointment // devolvendo a reserva
}

async function deleteAppointment(id_user, id_appointment) {
   
    const appointment = await repoAppointment.deleteAppointment(id_user, id_appointment)
    
    return appointment // devolvendo a reserva
}

async function listIdAppointment(id_appointment) {
   
    const appointments = await repoAppointment.listIdAppointment(id_appointment)
    
    return appointments // devolvendo a reserva
}

async function insertAppointmentAdmin(id_user, id_doctor, id_service, booking_date, booking_hour) {
   
    const appointment = await repoAppointment.insertAppointmentAdmin(id_user, id_doctor, id_service, booking_date, booking_hour)
    
    return appointment // devolvendo a reserva
}


async function editAppointmentAdmin(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {
   
    const appointment = await repoAppointment.editAppointmentAdmin(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour)
    
    return appointment // devolvendo a reserva
}

export default { listByUser, listByAdmin, insertAppointment, deleteAppointment, listIdAppointment, insertAppointmentAdmin, editAppointmentAdmin }