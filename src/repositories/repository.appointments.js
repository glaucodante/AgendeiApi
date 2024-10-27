import { query } from "../database/sqlite.js"

// EXECUTANDO O COMANDO NO BD

// repository não recebe parâmetros req e res. 
async function listByUser(id_user) {

    let sql = `select a.id_appointment, s.description as service, d.name as doctor, 
         d.specialty, a.booking_date, a.booking_hour, u.name as user, ds.price
 from appointments a
 join services s on (s.id_service = a.id_service)
 join doctors d on (d.id_doctor = a.id_doctor)
 join users u on (u.id_user = a.id_user)
 join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
 where a.id_user = ?
 order by booking_date, booking_hour`  // liste as tabelas...

    
        const appointments = await query(sql, id_user)  // fazendo a consulta no BD
    
    return appointments
}

async function listByAdmin(id_user, dt_start, dt_end, id_doctor) {

        let filter = []

    let sql = `select a.id_appointment, s.description as service, d.name as doctor, 
         d.specialty, a.booking_date, a.booking_hour, u.name as user, ds.price
 from appointments a
 join services s on (s.id_service = a.id_service)
 join doctors d on (d.id_doctor = a.id_doctor)
 join users u on (u.id_user = a.id_user)
 join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
 where a.id_appointment > 0 `  // liste as tabelas...
//  a.id_user = ?
    
    if(id_user) {
        filter.push(id_user)
        sql = sql + 'and a.id_user = ? '
    }

    if(dt_start) {
        filter.push(dt_start)
        sql = sql + 'and a.booking_date >= ? '
    }

    if(dt_end) {
        filter.push(dt_end)
        sql = sql + 'and a.booking_date <= ? '
    }

    if(id_doctor) {
        filter.push(id_doctor)
        sql = sql + 'and a.id_doctor = ? '
    }
     sql = sql + 'order by a.booking_date, a.booking_hour'

        const appointments = await query(sql, filter)  // fazendo a consulta no BD
    
    return appointments
}



// inserindo os dados no BD
async function insertAppointment(id_user, id_doctor, id_service, booking_date, booking_hour) {
    
    let sql = `insert into appointments(id_user, id_doctor, id_service, booking_date, booking_hour) 
    values(?, ?, ?, ?, ?)  
    returning id_appointment` // crie na tabela doctors e já retorne o id do médico           
        
        const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour])  // fazendo a consulta no BD
    
    return appointment[0]
}

// deletando os dados no BD
async function deleteAppointment(id_user, id_appointment) {
    
    let sql = `delete from appointments where id_appointment=? and id_user=?` // deletando na tabela reserva            
        
        await query(sql, [ id_appointment, id_user])  // fazendo a consulta no BD
    
    return { id_appointment }
}





export default { listByUser, listByAdmin, insertAppointment, deleteAppointment }