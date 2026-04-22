export default async function handler(req, res) {
  const url = 'https://script.google.com/macros/s/AKfycbxIRCSzxoQOV697P_tA8gviAXKDnWmbi_BKjqKNvl9ds7-R2JFpSeY1u-AOIoebDlZP/exec';
  
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10000);
    
    const resp = await fetch(url, { 
      redirect: 'follow',
      signal: controller.signal
    });
    const text = await resp.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
