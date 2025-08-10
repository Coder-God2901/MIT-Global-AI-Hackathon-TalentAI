// pages/api/parse-resume.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    const file = files.resume?.[0];
    if (!file) {
      return res.status(400).json({ error: 'No resume file uploaded' });
    }

    try {
      // Create FormData to forward the file to the Flask API
      const formData = new FormData();
      formData.append('resume', fs.createReadStream(file.filepath), file.originalFilename);

      // Forward the request to your Flask API
      const flaskApiUrl = "http://127.0.0.1:5001/api/parse-resume";
      const flaskResponse = await fetch(flaskApiUrl, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders(),
      });

      const flaskData = await flaskResponse.json();

      if (flaskResponse.ok) {
        // Here you would save the parsed_data to Supabase
        // Example:
        // const { data, error } = await supabase.from('parsed_resumes').insert({
        //     candidate_id: 'your-candidate-id',
        //     file_url: 'url-to-resume',
        //     parsed_data: flaskData.data,
        // });
        // if (error) { ... handle error ... }
        
        return res.status(200).json(flaskData);
      } else {
        return res.status(flaskResponse.status).json(flaskData);
      }

    } catch (e) {
      console.error('Proxy error:', e);
      return res.status(500).json({ error: 'An error occurred when communicating with the parsing service.' });
    } finally {
      // Clean up the temporary file created by formidable
      fs.unlinkSync(file.filepath);
    }
  });
}