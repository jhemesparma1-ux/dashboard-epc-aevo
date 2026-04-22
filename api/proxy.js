export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const obra = req.query.obra || 'planura';
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxIRCSzxoQOV697P_tA8gviAXKDnWmbi_BKjqKNvl9ds7-R2JFpSeY1u-AOIoebDlZP/exec?obra=' + obra;

  try {
    let resp = await fetch(scriptUrl, { redirect: 'follow' });
    
    if(resp.status >= 300 && resp.status < 400) {
      const location = resp.headers.get('location');
      if(location) resp = await fetch(location, { redirect: 'follow' });
    }

    if(!resp.ok) {
      return res.status(502).json({ error: 'Script error: ' + resp.status });
    }

    const text = await resp.text();
    res.status(200).send(text);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
