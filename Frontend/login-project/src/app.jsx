import React, { useState } from 'react';
import Auth from './pages/Auth'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'


const App = () => {
    const [authType, setAuthType] = useState('login');
    return (
        <div>

            <BrowserRouter>
                <Header title='Login Reactivo' />
                {authType === 'login' ? <Auth type="login" /> : <Auth type="register" />}
                <div className="routes">
                <button onClick={() => setAuthType('login')}>Login</button>
                <button onClick={() => setAuthType('register')}>Registrar</button>
                </div>
                <Footer />
            </BrowserRouter>



        </div>
    );
};

export default App;
