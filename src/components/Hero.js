import React from 'react'

const Hero = (props) => {

    const { handleLogout } = props;

    return(
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Salir</button>
            </nav>
        </section>
    )
}

export default Hero;
