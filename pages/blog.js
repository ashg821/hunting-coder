import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Typography, Container } from '@mui/material'
import Link from 'next/link'
import axios from 'axios'
// import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';



const Blog = ({ allBlogs, blogCount }) => {

  const [jsonData, setData] = useState(allBlogs);
  const [count, setCount] = useState(4);


  const fetchData = async () => {
    // console.log("I came here");
    const { data } = await axios.get(`http://localhost:3000/api/blogs?count=${count + 2}`);
    // console.log(data);
    setCount(count + 2);
    setData(data.allBlogs);
  };

  return <>
    <Navbar pageValue={2} />
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Typography component="h2" variant='h3' mt={2}>BLOG PAGE</Typography>
      <Typography component="h2" variant='h5' mt={2}>Latest Blogs</Typography>
    </Box>
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <InfiniteScroll
          dataLength={jsonData.length} //This is important field to render the next data
          next={fetchData}
          hasMore={blogCount !== jsonData.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            jsonData.map(ele => (
              <Box className="blogItem" key={ele.slug} mb={2}>
                <Link href={`/blogpost/${ele.slug}`}><Typography variant="h5" style={{ cursor: "pointer" }}>{ele.title}</Typography></Link>
                <Typography variant="p">{ele.content.slice(0, 200) + `...`}</Typography>
                <div><Link href={`/blogpost/${ele.slug}`} target="_blank"><button className="btn btn-primary">Read more</button></Link></div>
              </Box>
            ))
          }
        </InfiniteScroll>
      </Box>
    </Container>
  </>

}

//implementing server side rendering of the api calls 

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const { data } = await axios.get(`http://localhost:3000/api/blogs`);
  // console.log(data);

  // Pass data to the page via props
  return { props: { allBlogs: data.allBlogs, blogCount: data.blogCount} }
}


// implementing static site rendering
// This function gets called at build time
// export async function getStaticProps(context) {
//   // Call an external API endpoint to get posts
//   const data = await fs.promises.readdir(`blogData`, "utf-8");

//   let allBlogs = [];
//   for (let index = 0; index < 4; index++) {
//     const fileData = await fs.promises.readFile(`blogData/${data[index]}`, 'utf-8');
//     allBlogs = [...allBlogs, JSON.parse(fileData)];

//   }
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time


//   return {
//     props: {
//       allBlogs, blogCount: data.length
//     }
//   }
  
// }

export default Blog