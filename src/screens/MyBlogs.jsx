import React from "react";
import { Container, Spinner, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [myBlogsData, setMyBlogsData] = useState([]);

  const navigate = useNavigate();

  const [load, newload] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const url = "http://localhost:8000/fetchUserBlogs";

    (async () => {
      try {
        const res = await axios.get(url);
        newload(false);
        setMyBlogsData(res.data);

        console.log(res.data);
      } catch (error) {
        if (error?.response?.status === 401 && error?.response?.statusText === "Unauthorized") {
          alert(error?.response?.data);
          navigate("/login");
        }
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteBlog = (id) => {
    axios
      .delete(`http://localhost:8000/deleteblog/${id}`)
      .then((res) => {
        alert(res?.data?.message);
        console.log(res?.data?.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container fluid>
        <div style={{fontSize: "1.5rem", textAlign: "center", fontWeight: 600, margin: "15px 0"}}>My Blogs</div>
        {load ? (
          <Spinner
            animation="grow"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              backgroundColor: "#1b8b00",
              backgroundImage:
                "linear-gradient(314deg, #23c000 0%, #88ff00 74%)",
            }}
          />
        ) : myBlogsData && myBlogsData.length ? (
          <Row className="g-4">
            {myBlogsData.map((item) => {
              return (
                <Col xs={12} md={4} sm={6} lg={3} key={item._id}>
                  <Card
                    className="px-4 py-1 mb-4 h-100"
                    style={{
                      background: "transparent",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0px 5px 20px rgba(0,0,0)",
                    }}
                  >
                    <div className="text-end flex">
                      <Link
                        className="editBtn text-primary"
                        to={`/editblog/${item.slug}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Link>

                      <button
                        onClick={() => handleDeleteBlog(item._id)}
                        className="deleteBtn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>

                    <Card.Body className="px-0 py-0">
                      <h2>
                        <Link
                          to={`/details/${item.slug}`}
                          style={{
                            textDecoration: "none",
                            fontWeight: "700",
                            color: "#fff",
                            display: "block",
                            fontSize: "1.2rem",
                          }}
                        >
                          {item.name}
                        </Link>
                      </h2>

                      <small className="text-secondary">
                        {item?.datestring}
                      </small>

                      <Card.Text style={{ fontSize: "0.9rem" }}>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>

                      <small>
                        <Link to={`/details/${item.slug}`}>Read more</Link>
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className="text-center">You have no blogs posted</div>
        )}
      </Container>
    </>
  );
};

export default MyBlogs;
