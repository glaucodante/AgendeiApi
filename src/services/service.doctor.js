import repoDoctor from "../repositories/repository.doctor.js"

// service não recebe parâmetros req e res. 
async function list() {
   
    const doctors = await repoDoctor.list()
    return doctors
}

export default { list }