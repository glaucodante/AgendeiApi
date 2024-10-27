import sqlite3 from 'sqlite3'

// arquivo de configurações para o BD
const SQLite = sqlite3.verbose()

// função que executa a consulta ao BD seguindo alguns critérios
function query(command, params, method = 'all') {
    return new Promise(function (resolve, reject) {
        db[method](command, params, function (error, result) {
            if (error)
                reject(error)
            else 
                resolve(result)
        })
    })
}

const db = new SQLite.Database('./src/database/banco.db', 
    SQLite.OPEN_READWRITE, // abrindo o BD em modo de leitura e gravação
    (err) => { 
        if(err)
            return console.log('Erro ao conectar com o banco: ' + err.message)
    })

export {db, query}