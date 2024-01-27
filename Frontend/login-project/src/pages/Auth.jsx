import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'

const Auth = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleAuth = async () => {
        try {
            if (type === 'login') {
             
                const response = await axios.post('http://localhost:3000/auth/login', {
                    email: email,
                    password: password,
                });
                setSuccessMessage('Usuário logado com sucesso!');
                setErrorMessage('');
            } else if (type === 'register') {
                if (password !== confirmPassword) {
                    setErrorMessage('As senhas não coincidem.');
                    return;
                }

                const response = await axios.post('http://localhost:3000/auth/register', {
                    name: 'Nome do Usuário', 
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                });

                setSuccessMessage('Usuário registrado com sucesso!');
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage('Credenciais inválidas. Tente novamente.');
            setSuccessMessage('');
        }
    };

    const buttonClear = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setSuccessMessage('');
    }

    return (
        <div>
            <h2 className='routeHeader'>{type === 'login' ? 'Login' : 'Cadastro'}</h2>
            <form>
                <div className='fieldsDiv'>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='fieldsDiv'>
                    <label>Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {type === 'register' && (
                    <div className='fieldsDiv'>
                        <label>Confirme a Senha:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                )}
                <div className='actionButton'>
                <button type="button" onClick={handleAuth}>
                    {type === 'login' ? 'Login' : 'Cadastrar'}
                </button>

                <button type="button" onClick={buttonClear}>
                    Limpar
                </button>
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default Auth;