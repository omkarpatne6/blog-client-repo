import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'

const Scrollprogress = () => {

    const [state, newstate] = useState();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let doc = document.documentElement || document.body;

            let percent = doc.scrollTop;

            const pixels = doc.scrollHeight;

            const client = doc.clientHeight;

            let total = (percent / (pixels - client)) * 100;

            newstate(total);

        })
        
    }, [state])

    return (

        <div className="progress fixed-top" style={{ height: '0.15rem', border: 'none',backgroundColor: '#0f0f0f', borderRadius: '0' }}>
            <div className="progress-bar" role="progressbar" style={{ width: `${state}%`, height: '0.15rem', backgroundColor: '#1b8b00', backgroundImage: 'linear-gradient(314deg, #23c000 0%, #88ff00 74%)' }}></div>
        </div>

    )
}

export default Scrollprogress