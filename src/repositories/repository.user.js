import { query } from "../database/sqlite.js"

// EXECUTANDO O COMANDO NO BD

// repository não recebe parâmetros req e res. 

// inserindo os dados no BD
async function insert(name, email, password) {
    
        let sql = `insert into users(name, email, password) values(?, ?, ?)  
        returning id_user` // crie na tabela users e já retorne o id do usuário           
            
            const user = await query(sql, [name, email, password])  // fazendo a consulta no BD
        
        return user[0]
    }

    

    async function listByEmail(email) {
    // selecione todos os campos na tabela users onde o usuário tem um parâmetro igual ao passado           
        let sql = `select * from users where email = ?`
         
            
            const user = await query(sql, [email])  // fazendo a consulta no BD

            if(user.length === 0) 
                return []
            else         
                return user[0]
    }

    async function profile(id_user) {
        // selecione todos os campos na tabela users onde o usuário tem um parâmetro igual ao passado           
            let sql = `select id_user, name, email from users where id_user = ?`
             
                
                const user = await query(sql, [id_user])  // fazendo a consulta no BD
            
                    return user[0]
        }

export default { insert, listByEmail, profile }