import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Spinner } from 'react-bootstrap';

const Details = () => {

    const [state, newstate] = useState([]);

    const [load, newload] = useState(true);

    const { slug } = useParams();

    const url = `http://localhost:8000/getinfo/${slug}`

    useEffect(() => {

        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            newstate(data);
            console.log(data);

            newload(false);
        })

    }, [url])

    const BlogHtmlContent = ({ content }) => {
        return <div style={{ color: '#fff' }} dangerouslySetInnerHTML={{ __html: content }} />;
    }

    return (
        <>
            <Container>
                {load ?
                    <div style={{ padding: 0, display : 'flex' , justifyContent : 'center', alignItems : 'center', margin : 'auto', height : '70vh'  }}>
                        <Spinner style={{ color: '#1b8b00', backgroundImage: 'linear-gradient(314deg, #23c000 0%, #88ff00 74%)', width : '4rem', height : '4rem', borderWidth : '5px' }} animation="border" />
                    </div>
                    :
                    <div>
                        <h1 className='text-light' style={{ color: "#fff", fontWeight: "700" }}>{state.name}</h1>
                        <p className="text-secondary mb-4">{state.datestring}</p>

                        <hr />

                        {/* <p style={{ lineHeight: '30px' }}>{state.description}</p> */}
                        <BlogHtmlContent content={state.description} />
                    </div>
                }
            </Container>

        </>
    )
}

export default Details;