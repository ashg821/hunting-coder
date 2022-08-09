import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Container } from '@mui/material';
import Navbar from '../../components/Navbar';
import axios from 'axios'

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [jsonData, setData] = useState("");
  const getData = async () => {
    const { data } = await axios.get(`/api/getblog?slug=${slug}`);
    setData(data);
  };

  useEffect(() => { getData() }, [])
  return (
    <>
      <Navbar pageValue={2} />
      <Container>
        {jsonData && <><Typography variant="h3" align="center" mb={2}>
          Title: {jsonData.title}
        </Typography>
          <Typography>
            {jsonData.content}
          </Typography></>}
      </Container>
    </>
  )
}

export default Slug