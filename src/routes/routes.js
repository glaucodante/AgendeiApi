import { Router } from 'express'
import controllerDoctor from '../controllers/controller.doctor.js'
import controllerUser from '../controllers/controller.user.js'
import controllerAppointment from '../controllers/controller.appointments.js'
import jwt from '../token.js'
import controllerAdmin from '../controllers/controller.admin.js'

const router = Router()

router.get('/ping', (req, res) => {
    console.log('Executou o PING')
    res.json({pong: true})
})

// Rota listando os médicos...
router.get('/doctors',jwt.validateToken, controllerDoctor.list)
// Rota cadastrando os médicos
router.post('/doctors', jwt.validateToken, controllerDoctor.insert)
// Rota editando o médico
router.put('/doctors/:id_doctor',jwt.validateToken, controllerDoctor.editDoctor)
// Rota deletando um médico
router.delete('/doctors/:id_doctor',jwt.validateToken, controllerDoctor.deleteDoctor)
// Services (serviços prestados)
router.get('/doctors/:id_doctor/services',jwt.validateToken, controllerDoctor.listServices)


// Users...
// Criando usuário
router.post('/users/register', controllerUser.insert)
// Login
// para fazer o login não se utiliza o get, pois email e a senha não pode ir na url
router.post('/users/login', controllerUser.login)
// Perfil do usuário
router.get('/users/profile', jwt.validateToken, controllerUser.profile)

// Rotas do Admin
router.post('/admin/register', controllerAdmin.insertAdmin)
router.post('/admin/login', controllerAdmin.loginAdmin)
router.get('/admin/appointments', jwt.validateToken, controllerAppointment.listByAdmin) // lista de pacientes acessada pelo admin listUserByAdmin
router.get('/admin/users', jwt.validateToken, controllerAdmin.listUsers) // listar usuários

router.get('/admin/appointments/:id_appointment', jwt.validateToken, controllerAppointment.listIdAppointment)

router.post('/admin/appointments', jwt.validateToken, controllerAppointment.insertAppointmentAdmin) // inserir novo agendamento (tela de administração)

router.put('/admin/appointments/:id_appointment', jwt.validateToken, controllerAppointment.editAppointmentAdmin) // editar agendamento


// Appointments (agendamento)
router.get('/appointments',jwt.validateToken, controllerAppointment.listByUser)
router.post('/appointments',jwt.validateToken, controllerAppointment.insertAppointment)
// Cancelar agendamento
router.delete('/appointments/:id_appointment',jwt.validateToken, controllerAppointment.deleteAppointment)
export default router