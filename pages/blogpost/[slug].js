import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { Typography, Box, Container } from '@mui/material';
import Navbar from '../../components/Navbar';
import axios from 'axios'
// import * as fs from 'fs';


const Slug = ({ data }) => {
  const [jsonData, setData] = useState(data);

  return (
    <>
      <Navbar pageValue={2} />
      <Container>
        {jsonData && <><Typography variant="h3" align="center" mb={2}>
          {jsonData.title}
        </Typography>
          <Typography>
            {jsonData.content}
          </Typography></>}
      </Container>
    </>
  )
}

//server-side rendering
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { data } = await axios.get(`http://localhost:3000/api/getblog?slug=${context.query.slug}`);
  // Pass data to the page via props
  return { props: { data } }
}

//static site generation
//getStaticPaths() function is required for dynamic pages
// export async function getStaticPaths() {
//   const data = await fs.promises.readdir(`blogData`, "utf-8");
//   let allBlogs = [];
//     for (let index = 0; index < data.length; index++) {
//         const fileData = await fs.promises.readFile(`blogData/${data[index]}`, 'utf-8');
//         allBlogs = [...allBlogs, JSON.parse(fileData)];

//     }
//   return {
//       paths: allBlogs.map(ele=>({params: {slug: ele.slug}})),
//       fallback: true // false or 'blocking'
//   };
// }



//in a dynmaic route page where multiple pages are rendered from the same URL(with the help of slug)
// export async function getStaticProps(context) {
//   // console.log(context.params.slug);
//   let fileData;
//   fileData = JSON.parse(await fs.promises.readFile(`blogData/${context.params.slug}.json`, "utf-8"));

//   return {
//     props: {
//       fileData,
//     },
//   }
// }
export default Slug;