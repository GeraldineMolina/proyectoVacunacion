import React, { useState, useEffect } from 'react';
import fire from '../src/firebase-config'
import Login from '../src/components/Login'
import Hero from '../src/components/Hero'
import './App.css';



function App() {
  const [user, setUser] = useState(''); //Función que crea internamente una variable donde podremos almacenar el estado de nuestro componente.
  const [email, setEmail] = useState(''); //Función que crea internamente una variable donde podremos almacenar el estado de nuestro componente
  const [password, setPassword] = useState(''); //Función que crea internamente una variable donde podremos almacenar el estado de nuestro componente
  const [emailError, setEmailError] = useState(''); //Función que crea internamente una variable donde podremos almacenar el estado de nuestro componente
  const [PasswordError, setPasswordError] = useState(''); //Función que crea internamente una variable donde podremos almacenar el estado de nuestro componente
  const [hasAccount, setHasAccount] = useState(false); //Función que crea internamente una variable donde podremos almacenar el estado de nuestro componente

  const clearInputs = () => { // Borrar las entradas 
    setEmail(''); // IMPORTANTE: cuando llamamos a la función set de un useState(), se sobrescribe el contenido de la variable.
    setPassword('');
  }

  const clearErrors = () => { //Borrar los errores
    setEmailError(''); // IMPORTANTE: cuando llamamos a la función set de un useState(), se sobrescribe el contenido de la variable.
    setPasswordError('');
  }

  // ---------------------------------FUNCION PARA EL INICIO DE SESION-------------------

  const handleLogin = () => {
    clearErrors(); // Borrar los errores
    fire
      .auth() //Autenticacion de usuarios
      .signInWithEmailAndPassword(email, password) // Solo se puede iniciar sesion con correo y contraseña
      .catch((err) => { //Detectar errores
        switch (err.code) {
          case "auth/invalid-email": // Correo invalido
          case "auth/user-disabled": // Usuario desabilitado
          case "auth/user-not-found": // No se encuentra el usuario 
            setEmailError(err.message); // Estado de mensaje de error para el correo electronico.
            break;
          case "auth/wrong-password": // Contraseña incorrecta
            setPasswordError(err.message); // Estado de mensaje de error para la contraseña
            break;
            
        }
      });
      
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
            
        }
      });
  }

  //------------------------FUNCION QUE PERMITE EL CIERRE DE SESION--------------------
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => { // Verificacion de que el usuario existe 
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs(); // Borrar las entradas 
        setUser(user);
      }
      else {
        setUser("");
      }
   });
  };

  useEffect(() => { //Esta función se ejecuta por defecto cuando el componente se renderiza por primera vez, y después cada vez que el componente se actualice.
    authListener();
  }, [])

  return (
    <div className="App">
      {user ?(
        <Hero 
        handleLogout={handleLogout}
        />
      ) : (
        <Login 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        PasswordError={PasswordError}
        />
      )}   
    </div>
  );
}



export default App;




