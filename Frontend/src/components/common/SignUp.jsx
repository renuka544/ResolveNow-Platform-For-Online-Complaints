import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';

const SignUp = () => {
  const [title, setTitle] = useState("Select User");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTitle = (select) => {
    setTitle(select);
    setUser({ ...user, userType: select.toLowerCase() }); // Must match backend: ordinary, agent, admin
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.userType || title === "Select User") {
      alert("Please select a user type.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", user);
      alert(res.data.message || "Registration successful!");
      setUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        userType: ""
      });
      setTitle("Select User");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      alert(msg);
      console.error(err);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ComplaintCare</Navbar.Brand>
          <ul className="navbar-nav">
            <li className="nav-item mb-2">
              <Link to="/" className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/signup" className="nav-link text-light">SignUp</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/login" className="nav-link text-light">Login</Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      <section className="gradient-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-4">SignUp For Registering the Complaint</h2>
                    <p className="text-white-50 mb-4">Please enter your Details</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control form-control-lg" required />
                        <label className="form-label">Full Name</label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control form-control-lg" required />
                        <label className="form-label">Email</label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control form-control-lg" required />
                        <label className="form-label">Password</label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input type="text" name="phone" value={user.phone} onChange={handleChange} className="form-control form-control-lg" required />
                        <label className="form-label">Mobile No.</label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {title}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <label className="form-label mt-2">Select User Type</label>
                      </div>
                      <button className="btn btn-outline-light btn-lg px-5 mt-3" type="submit">Register</button>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">Have an account? <Link to="/login">Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SignUp;


