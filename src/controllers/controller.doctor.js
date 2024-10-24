import serviceDoctor from "../services/service.doctor.js"

async function list(req, res) {

    const doctors = await serviceDoctor.list()

    res.status(200).json(doctors) 
}

export default { list }