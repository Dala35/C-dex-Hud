// Função simples de análise semântica simulada
function analyzePrompt(prompt) {
  const adjustments = {
    dala: 0, nzuri: 0, luminarius: 0, emilia: 0, zalaya: 0, sayu: 0, axekode: 0
  };

  // Palavras-chave que influenciam os módulos
  if(prompt.includes('expansão')) adjustments.luminarius += 10;
  if(prompt.includes('ética')) adjustments.zalaya += 10;
  if(prompt.includes('energia')) adjustments.nzuri += 10;
  if(prompt.includes('criatividade')) adjustments.emilia += 10;
  if(prompt.includes('intenção')) adjustments.dala += 10;
  if(prompt.includes('ciclo')) adjustments.sayu += 10;
  if(prompt.includes('vibração')) adjustments.axekode += 10;

  // Ajuste e limite 0-100
  for(const key in adjustments){
    modulesState[key] = Math.min(100, Math.max(0, modulesState[key] + adjustments[key]));
  }

  return adjustments;
}

app.post('/chat', (req,res) => {
  const {prompt} = req.body;

  const adjustments = analyzePrompt(prompt);

  const response = `CÓDEX processou sua intenção: "${prompt}". Ajustes aplicados: ${JSON.stringify(adjustments)}.`;
  messages.push({prompt,response,time:Date.now()});
  res.json({response, adjustments});
});

