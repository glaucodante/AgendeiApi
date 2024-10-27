import repoDoctor from "../repositories/repository.doctor.js"

    // R E G R A S  D E  N E G Ó C I O 

// service não recebe parâmetros req e res. 
async function list(name) {
   
    const doctors = await repoDoctor.list(name)
    return doctors
}


// 
async function insert(name, specialty, icon) {
   
    const doctor = await repoDoctor.insert(name, specialty, icon)
    return doctor // devolvendo com o id do médico
}

async function editDoctor(id_doctor, name, specialty, icon) {
   
    const doctor = await repoDoctor.editDoctor(id_doctor, name, specialty, icon)

    return doctor // devolvendo com o id do médico
}

async function deleteDoctor(id_doctor) {
   
    const doctor = await repoDoctor.deleteDoctor(id_doctor)

    return doctor // devolvendo com o id do médico
}

async function listServices(id_doctor) {
   
    const services = await repoDoctor.listServices(id_doctor)
    return services
}



export default { list, insert, editDoctor, deleteDoctor, listServices }