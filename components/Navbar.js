import Link from 'next/link';
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react';


const Navbar = ({pageValue}) => {
    const [value, setValue] = useState(pageValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <Link href="/" scroll={false}><Tab label="Home" /></Link>
                <Link href="/about" scroll={false}><Tab label="About" /></Link>        {/*scroll attribute when set to false means that you dont want the page to scroll to the top every time you click on the link */}
                <Link href="/blog" scroll={false}><Tab label="Blog" /></Link>
                <Link href="/contact" scroll={false}><Tab label="Contact" /></Link>
            </Tabs>
        </Box>
    )
}

export default Navbar