import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Typography } from '@mui/material'
import axios from 'axios';



const Contact = () => {

  const [formData, setData] = useState({ name: "", email: "", phone: "", desc: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    const { data } = await axios.post(`http://localhost:3000/api/postcontact`, formData);
    console.log(data);
    setData({ name: "", email: "", phone: "", desc: "" });
  }

  const handleChange = (event) => {
    const newData = {};
    newData[event.target.name] = event.target.value;
    setData({ ...formData, ...newData });
  }

  return <>
    <Navbar pageValue={3} />
    <Typography variant="h3" align="center">Contact Details</Typography>
    <div className="container">
      <form style={{ maxWidth: "700px", margin: "auto" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="userName" required value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
          <input type="email" name="email" className="form-control" id="exampleInputPassword1" required value={formData.email} onChange={handleChange} />
          <div id="emailHelp" className="form-text">{"We'll never share your email with anyone else."}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
          <input type="tel" pattern="[0-9]{10}" name="phone" className="form-control" id="phone" aria-describedby="emailHelp" required value={formData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <div className="form-floating">
            <textarea name="desc" className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} required value={formData.desc} onChange={handleChange}></textarea>
            <label htmlFor="floatingTextarea2">Comments</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  </>

}

export default Contact