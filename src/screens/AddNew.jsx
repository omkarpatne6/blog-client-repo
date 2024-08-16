import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = formData;

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const url = "http://localhost:8000/";

    (async () => {
      try {
        const res = await axios.get(url);

        console.log(res);

      } catch (error) {
        if (error?.response?.status === 401 && error?.response?.statusText === "Unauthorized") {
          alert(error?.response?.data);
          navigate("/login");
        }
        console.log(error);
      }
    })();
  }, []);

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

    if (name === "" || description === "") {
      alertpopup();
    } else {
      try {
        loader();
        const resp = await axios.post(
          "http://localhost:8000/addNewBlog",
          formData
        );
        successfull();

        setTimeout(() => {
          navigate("/my-blogs");
        }, 1000);
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
          <Col
            md={6}
            className="mx-auto"
            style={{
              background: "transparent",
              border: "none",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0px 5px 20px rgba(0,0,0)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Topic name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="name"
                  value={formData?.name}
                  name="name"
                  placeholder="Enter your topic"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mt-4">
                <label>Description</label>
                {/* <textarea id="description" name="description" rows="4" cols="50" className="form-control mt-2" placeholder='Add description for the topic' onChange={handleChange} /> */}

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

export default AddNew;
