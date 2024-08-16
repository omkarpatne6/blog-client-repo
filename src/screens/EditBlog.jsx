import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";

const EditBlog = () => {
  const { slug } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const url = `http://localhost:8000/getinfo/${slug}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setFormData(() => {
          return {
            name: response?.data?.name,
            email: response?.data?.email,
            description: response?.data?.description,
          };
        });
      })
      .catch((err) => console.log(err));
  }, [url]);

  const { name, email, description } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  const alertpopup = () =>
    toast.error("Please fill out all fields!", {
      position: "top-center",
      autoClose: 1000,
    });

  const toastId = useRef(null);
  const loader = () =>
    (toastId.current = toast.loading("Please wait", { autoClose: false }));
  const successfull = () =>
    toast.update(toastId.current, {
      render: "Successful",
      type: toast.TYPE.SUCCESS,
      autoClose: 1000,
      isLoading: false,
    });
  const failed = (errorMessage) =>
    toast.update(toastId.current, {
      render: errorMessage,
      type: toast.TYPE.ERROR,
      autoClose: 1000,
      isLoading: false,
    });

  const handleContentChange = (e) => {
    // console.log(e);
    setFormData((oldData) => {
      return {
        ...oldData,
        description: e,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || description === "") {
      alertpopup();
    } else {
      try {
        loader();
        const resp = await axios.put(
          `http://localhost:8000/updateblog/${slug}`,
          formData
        );
        successfull();
        console.log(resp.data);
      } catch (err) {
        failed(err?.response?.data);
        console.error(err);
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <Container>
        <Row className="mb-5">
          <Col md={6} className="mx-auto"
          style={{
            background: "transparent",
            border: "none",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: "0px 5px 20px rgba(0,0,0)",
          }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Topic name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="name"
                  name="name"
                  value={formData?.name}
                  placeholder="Enter your topic"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-4">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  value={formData?.email}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-4">
                <label>Description</label>
                {/* <textarea id="description" name="description" value={formData?.description} rows="4" cols="50" className="form-control mt-2" placeholder='Add description for the topic' onChange={handleChange} /> */}

                <div className="my-2">
                  <ReactQuill
                    value={formData?.description}
                    onChange={handleContentChange}
                    style={{
                      background: "#fff",
                      borderRadius: "3px",
                      boxShadow: "none",
                      color: "#000",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="my-4"
                style={{
                  backgroundCcolor: "#1b8b00",
                  backgroundImage:
                    "linear-gradient(314deg, #23c000 0%, #88ff00 74%)",
                  borderRadius: "2px",
                  padding: "10px 50px",
                  border: "none",
                  color: "#fff",
                }}
              >
                <b>Add +</b>
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditBlog;
