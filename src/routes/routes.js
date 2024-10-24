import { Router } from 'express'
import controllerDoctor from '../controllers/controller.doctor.js'

const router = Router()

router.get('/ping', (req, res) => {
    console.log('Executou o PING')
    res.json({pong: true})
})

router.get('/doctors', controllerDoctor.list )


export default router