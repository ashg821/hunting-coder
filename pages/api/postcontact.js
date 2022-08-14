import { setFips } from 'crypto';
import * as fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const contactFiles = await fs.promises.readdir('contactData', 'utf-8');
        // Process a POST request
        fs.writeFile(`contactData/${contactFiles.length+1}.json`, JSON.stringify(req.body), (err) => {
            res.status(500).json({ err });
        })
        res.status(200).json(req.body);
    } else {
        res.status(200).json({ name: 'Ashwani' });
    }
}