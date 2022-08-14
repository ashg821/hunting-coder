import * as fs from 'fs';
export default async function handler(req, res) {
    const data = await fs.promises.readdir(`blogData`, "utf-8");

    let allBlogs = [];
    if (!req.query.count) {
        for (let index = 0; index < 4; index++) {
            const fileData = await fs.promises.readFile(`blogData/${data[index]}`, 'utf-8');
            allBlogs = [...allBlogs, JSON.parse(fileData)];

        }
        return res.status(200).json({ allBlogs, blogCount: data.length });
    }
    for (let index = 0; index < req.query.count && index < data.length; index++) {
        const fileData = await fs.promises.readFile(`blogData/${data[index]}`, 'utf-8');
        allBlogs = [...allBlogs, JSON.parse(fileData)];

    }
    res.status(200).json({ allBlogs });
}