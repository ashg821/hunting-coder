// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//localhost:3000/api/getpost?slug=how-to-learn-javascript
import * as fs from 'fs';
export default function handler(req, res) {
  fs.readFile(`blogData/${req.query.slug}.json`, "utf-8", (error, data) => {
    if(error){
      return res.status(404).json({success: false, message: "No blog found"});
    }
    res.status(200).json(JSON.parse(data))
  });

}
