const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

const criarBanco = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    }) 

    await db.exec(`
        CREATE TABLE IF NOT EXISTS incidentes(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         tipo_problema TEXT,
         localizacao TEXT,
         descricao TEXT,
         prioridade TEXT,
         nome_solicitante TEXT,
         data_registro TEXT,
         hora_registro TEXT,
         status TEXT DEFAULT 'Pendente',
         imagem_problema TEXT
        )        
    `)

    console.log('Banco de dados configurado: A tabela de registros urbanos está pronta ');
    
    //VERIFICAÇÃO DE DUPLICADADE
    //Seleciona o total de tudo(*) da tabela incidentes e armazena na variável checagem
    const checagem = await db.get(`SELECT COUNT(*) AS total FROM incidentes`);

    //Fazer uma condional 

    if(checagem.total === 0) {
        await db.exec(`
        INSERT INTO incidentes (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro, imagem_problema)
        VALUES 
        ('Problema de trânsito', 'Rua das Flores, 123', 'Acidente de trânsito', 'Baixa', 'João Silva', '16-03-2026', '10:00', 'https://st3.depositphotos.com/10591170/35602/i/450/depositphotos_356025400-stock-photo-street-lighting-city-street-several.jpg'),
        ('Iluminação pública', 'Avenida Central, 456', 'Lâmpada queimada', 'Média', 'Maria Oliveira', '13-03-2026', '14:30', 'https://conceg.com.br/wp-content/uploads/2025/02/Poste-sem-luz-ilustracao.jpg'),
        ('Problema de ruído', 'Travessa do Comércio, 789', 'Ruído excessivo devido a obras', 'Média', 'Carlos Santos', '15-03-2026', '11:00', 'https://s2-oglobo.glbimg.com/QAa0yBDcVUOBX9xhaynhbgF-I7E=/0x0:1231x821/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/I/0/7BRebwSAu5Zt5ou3uatQ/110480777-brasil-sao-paulo-sp-25-03-2025-sao-paulo-barulhenta-obras-de-uma-nova-linha-de-me-1-.jpg'),
        ('Vazamento de água', 'Rua das Camélias, 52', 'Vazamento de água consistente pelo bueiro', 'Alto', 'Julia', '10-03-2026', '10:00', 'https://imagens.usp.br/wp-content/uploads/Vazamento_agua_bueiro_118-16_foto-Cec%C3%ADlia-Bastos-6.jpg');        
        
    `)
    console.log('Dados inseridos dentro da tabela incidentes');
    

    } else {
        console.log(`A tabela de registros urbanos já contém dados. Total de registros: ${checagem.total}`);
    }

   //SELECT(Read) - Consulta os dados da tabela
    const todosIncidentes = await db.all(`SELECT * FROM incidentes`);
    console.log('Todos os incidentes registrados:');
    console.log(todosIncidentes);

    //Select específico - Consulta um incidente específico pelo ID
    const incidenteEspecifico = await db.get(`SELECT * FROM incidentes WHERE id = 1`);
    console.log('Incidente específico (ID = 1):');
    console.log(incidenteEspecifico);

    //UPATE - Atualiza o status de um incidente específico
    await db.run(`UPDATE incidentes SET status = 'Resolvido' WHERE id = 1`);
    console.log('Status do incidente com ID = 1 atualizado para "Resolvido".');
    console.log(incidenteEspecifico);

    await db.run(`
        UPDATE incidentes
        SET status = 'Em análise'
        WHERE id = 3`);
        console.log(todosIncidentes);
        
    //DELETE condicional - Remover tudo que tem o status 'Resolvido'
    await db.run(`DELETE FROM incidentes WHERE status = 'Resolvido'`);
    console.log('Incidentes com status "Resolvido" foram removidos da tabela.');
    console.log(todosIncidentes);
    

}   

criarBanco();