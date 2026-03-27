const express = require('express');
const { criarBanco }  = require('./database');

const app =  express();

app.use(express.json());

//Rota para obter todos os incidentes
app.get('/', (req, res) => {
    res.send(`
        <body>
            <h1>Bem-vindo ao ZelaCidade</h1>
            <h2>Gestão de problemas urbanos</h2>
            <p>Para relatar um incidente, basta acessar a rota /incidentes e enviar os detalhes do problema. Nossa equipe de manutenção urbana irá avaliar e resolver o problema o mais rápido possível.</p>        
        </body>        
        `)
} )

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})

//Rotas incidentes - CRUD

//GET incidentes - Ler todos os incidentes
app.get('/incidentes', async (req, res) => {
    const db = await criarBanco();
    const incidentes = await db.all(`SELECT * FROM incidentes`);
    res.json(incidentes);
})

//Get incidente específico - Ler um incidente específico pelo ID
app.get('/incidentes/:id', async (req, res) => {
    const db = await criarBanco();
    const { id } = req.params;
    const incidenteId = await db.all(`SELECT * FROM incidentes WHERE id = ?`, [id]);
    res.json(incidenteId); 
})

//POST incidente - Criar um novo incidente
app.post('/incidentes', async (req, res)=> {
    const db = await criarBanco();
    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro, imagem_problema} = req.body;
    await db.run(`
        INSERT INTO incidentes (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro, imagem_problema)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
        [tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro, imagem_problema]
    );
    res.send(`Incidente de ${tipo_problema} registrado com sucesso!`);
})

//PUT incidente - Atualizar um incidente específico
app.put('/incidentes/:id', async (req, res) => {
    const db = await criarBanco();
    const { id } = req.params;

    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro, imagem_problema} = req.body;

    await db.run(`
        UPDATE incidentes
        SET tipo_problema = ?, localizacao = ?, descricao = ?, prioridade = ?, nome_solicitante = ?, data_registro = ?, hora_registro = ?, imagem_problema = ?
        WHERE id = ?`, 
        [tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro, imagem_problema, id]
    );
    res.send(`Incidente de id ${id} atualizado com sucesso!`);
})

//Delete incidente - Deletar um incidente específico
app.delete('/incidentes/:id', async (req, res) => {
    const db = await criarBanco();
    const { id } = req.params;
    await db.run(`DELETE FROM incidentes WHERE id = ?`, [id]);
    res.send(`Incidente de id ${id} deletado com sucesso`);
})

