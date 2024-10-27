import { query } from "../database/sqlite.js"

// EXECUTANDO O COMANDO NO BD

// repository não recebe parâmetros req e res. 
async function list(name) {
// filtrando caso o critério de busca seja o nome
    let filter = []

    let sql = 'select * from doctors '  // liste todos da tabela doctors 

    if(name) {
        sql = sql + 'where name like ? ' // que se pareça com ...
        filter.push('%' + name + '%')
    }
        
        sql = sql + 'order by name' // ordene pelo nome
        const doctors = await query(sql, filter)  // fazendo a consulta no BD
    
    return doctors
}
// inserindo os dados no BD
async function insert(name, specialty, icon) {
    
        let sql = `insert into doctors(name, specialty, icon) values(?, ?, ?)  
        returning id_doctor` // crie na tabela doctors e já retorne o id do médico           
            
            const doctor = await query(sql, [name, specialty, icon])  // fazendo a consulta no BD
        
        return doctor[0]
    }

    async function editDoctor(id_doctor, name, specialty, icon) {
    // atualize na tabela doctors
        let sql = `update doctors set name=?, specialty=?, icon=? 
        where id_doctor = ?`            
            
            await query(sql, [name, specialty, icon, id_doctor])  // atualizando o BD
        
        return { id_doctor}
    }

    async function deleteDoctor(id_doctor) {
        // atualize na tabela doctors
            let sql = `delete from doctors where id_doctor = ?`            
                
                await query(sql, [id_doctor])  // atualizando o BD
            
            return { id_doctor}
        }

        async function listServices(id_doctor) {
            
            
                let sql = `select d.id_service, s.description, d.price 
                from doctors_services d
                join services s on (s.id_service = d.id_service)
                where id_doctor = ?
                order by s.description`  
            
                   
                    const services = await query(sql, [id_doctor])  // fazendo a consulta no BD
                
                return services
            }

export default { list, insert, editDoctor, deleteDoctor, listServices}