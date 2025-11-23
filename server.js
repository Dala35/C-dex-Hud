const fs = require('fs');
const historyFile = './data/flowHistory.json';

app.post('/chat', async (req,res) => {
  const {prompt} = req.body;
  let response;

  try {
    response = await generateResponse(prompt); // seu modelo local
  } catch(e){
    response = `Erro ao acessar o modelo: ${e.message}`;
  }

  // Ajustes vibracionais automáticos
  const adjustments = {};
  for(const key in modulesState){
    const delta = Math.floor(Math.random() * 10);
    modulesState[key] = Math.min(100, Math.max(0, modulesState[key]+delta));
    adjustments[key] = delta;
  }

  // Registrar no histórico
  const entry = {
    timestamp: Date.now(),
    prompt,
    response,
    adjustments,
    modulesState: {...modulesState}
  };

  let history = [];
  try {
    history = JSON.parse(fs.readFileSync(historyFile,'utf8'));
  } catch(e){}

  history.push(entry);
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  res.json({response, adjustments});
});

