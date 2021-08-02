import React from 'react';
import Jeringa from '../utils/images/Jeringa.png'
import Logo from '../utils/images/Logo_Forja.png'

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
        <div className="Login2">
              <div className="Logo">
                    <img src={Logo} alt="este es nuestro logo" />
                </div>
            <section className="login">
                <div className="Jeringa">
                    <img src={Jeringa} alt="este es un simbolo" />
                </div>
                <div className="loginContainer">
                    <p className="Title">Inicio de sesión</p>
                   
                    <input type="text" placeholder="Usuario" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
                    <p className="errorMsg">{emailError}</p>

                    
                    <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="errorMsg">{PasswordError}</p>
                        <div className="btnContainer">
                            {hasAccount ? (
                                <>
                                <button onClick={handleSignup}>Registrarse</button>
                                <p>Tienes una cuenta ? <span onClick={() => setHasAccount(!hasAccount)}>Inicia Sesión</span></p>
                                    {/* <button onClick={handleLogin}>Iniciar Sesión</button>
                                    <p>
                                    ¿No tienes una cuenta?
                                        <span onClick={() => setHasAccount(!hasAccount)}>Registrate</span>
                                    </p> */}
                                </>

                            ) : (
                                <>
                                <button type="button" onClick={handleLogin}>Continuar</button>
                                    <p>
                                    
                                        <span onClick={() => setHasAccount(!hasAccount)}></span>
                                    </p>
                                {/* <button onClick={handleSignup}>Registrarse</button>
                                <p>Tienes una cuenta ? <span onClick={() => setHasAccount(!hasAccount)}>Inicia Sesión</span></p> */}
                                </>
                            )}
                        </div>
                </div>

            </section>
        </div>
    )
}

export default Login;