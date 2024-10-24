
// repository não recebe parâmetros req e res. 
async function list() {
   // simulando o BD
    const doctors = [
        {id: 1, name: 'Heber', specialty: 'Cardiologia', icon: 'M'},
        {id: 2, name: 'João', specialty: 'Clínico Geral', icon: 'M'},
        {id: 3, name: 'Maria', specialty: 'Psiquiatra', icon: 'F'},
        
    ]
    return doctors
}

export default { list }