import React from 'react';

const Login = (props) => {

    const { email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        PasswordError 
    } = props;

    return(
        <section className="login">
            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg">{PasswordError}</p>
                    <div className="btnContainer">
                        {hasAccount ? (
                            <>
                                <button onClick={handleLogin}>Iniciar Sesión</button>
                                <p>
                                ¿No tienes una cuenta?
                                    <span onClick={() => setHasAccount(!hasAccount)}>Registrate</span>
                                </p>
                            </>

                        ) : (
                            <>
                            <button onClick={handleSignup}>Registrarse</button>
                            <p>Tienes una cuenta ? <span onClick={() => setHasAccount(!hasAccount)}>Inicia Sesión</span></p>
                            </>
                        )}
                    </div>
            </div>

        </section>
    )
}

export default Login;