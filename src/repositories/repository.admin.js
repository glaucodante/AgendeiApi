import { query } from "../database/sqlite.js"

// EXECUTANDO O COMANDO NO BD

// repository não recebe parâmetros req e res. 

// inserindo os dados no BD
async function insertAdmin(name, email, password) {
    
        let sql = `insert into admins(name, email, password) values(?, ?, ?)  
        returning id_admin` // crie na tabela admins e já retorne o id do admin
            
            const admin = await query(sql, [name, email, password])  // fazendo a consulta no BD
        
        return admin[0]
    }


    

    async function listByEmailAdmin(email) {
        // selecione todos os campos na tabela admins onde o usuário tem um parâmetro igual ao passado           
            let sql = `select * from admins where email = ?`
             
                
                const admin = await query(sql, [email])  // fazendo a consulta no BD
    
                if(admin.length == 0) 
                    return []
                else         
                    return admin[0]
        }

        export default { insertAdmin, listByEmailAdmin }