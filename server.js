const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Estado inicial dos módulos
let modulesState = {
  dala: 80,
  nzuri: 70,
  luminarius: 60,
  emilia: 75,
  zalaya: 90,
  sayu: 65,
  axekode: 85
};

// Histórico de interações
let messages = [];

// Endpoint para módulos
app.get('/modules', (req,res) => res.json(modulesState));

// Atualizar módulo
app.post('/modules/:name/:value', (req,res) => {
  const {name, value} = req.params;
  if(modulesState.hasOwnProperty(name)){
    modulesState[name] = parseInt(value);
    res.json({success:true,modulesState});
  }else res.status(400).json({success:false,message:'Módulo não encontrado'});
});

// Chat endpoint (simula IA, substitua pelo seu modelo)
app.post('/chat', (req,res) => {
  const {prompt} = req.body;
  
  // Aqui você pode chamar seu modelo de IA local ou remoto
  // Exemplo:
  // const response = await myLocalModel.generate(prompt);
  
  const response = `CÓDEX recebeu a intenção: "${prompt}" e ajustou os portais vibracionais.`;
  messages.push({prompt,response,time:Date.now()});
  res.json({response});
});

app.listen(port, ()=>console.log(`CÓDEX HUD rodando em http://localhost:${port}`));
