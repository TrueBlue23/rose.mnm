export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Logged visitor location:', req.body);
    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
