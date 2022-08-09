import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Typography, Container} from '@mui/material'
import Link from 'next/link'
import axios from 'axios'


const Blog = () => {

  let [jsonData, setData] = useState("");
  const getData = async () => {

    const { data } = await axios.get(`/api/blogs`);
    setData(data);
  };

  useEffect(() => { getData() }, [])
  return <>
    <Navbar pageValue={2} />
    <Box display="flex" flexDirection="column" alignItems="center" >
      <Typography component="h2" variant='h3' mt={2}>BLOG PAGE</Typography>
      <Typography component="h2" variant='h5' mt={2}>Latest Blogs</Typography>
    </Box>
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        {
          jsonData && jsonData.map(ele => (
            <Box className="blogItem" key={ele.slug} mb={2}>
              <Link href={`/blogpost/${ele.slug}`}><Typography variant="h5" style={{ cursor: "pointer" }}>{ele.title}</Typography></Link>
              <Typography variant="p">{ele.content.slice(0, 200)+`...`}</Typography>
            </Box>
          ))
        }
      </Box>
    </Container>
  </>

}

export default Blog