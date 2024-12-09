import express from "express"
import cors from "cors"
import route from './ws/routes/contatoRoute.js'
import connectDatabase
 from './ws/database.js';

const app = express();
const PORT = 3000;


// Middleware
app.use(cors({
  origin: '*'
})); // Permite requisições de outros domínios (como o Expo)
app.use(express.json()); // Permite processar JSON no corpo das requisições

app.use('/contato', route)

// DATABASE
connectDatabase()

// Rota de exemplo
app.get('/', (req, res) => {
  res.send({ message: 'Servidor Express rodando!' });
});

// Inicia o servidor
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  
});
