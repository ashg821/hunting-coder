import * as fs from 'fs';
export default async function handler(req, res) {
    const data = await fs.promises.readdir(`blogData`, "utf-8");
    
    let allBlogs = [];
   for (let index = 0; index < data.length; index++) {
    const fileData = await fs.promises.readFile(`blogData/${data[index]}`, 'utf-8');
    allBlogs = [ ...allBlogs, JSON.parse(fileData)];
    
   }
    res.status(200).json(allBlogs);
}