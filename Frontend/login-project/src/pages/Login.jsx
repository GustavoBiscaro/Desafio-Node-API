import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: email,
                password: password,
            });
            console.log(response.data.token);
            setSuccessMessage('Usuário logado com sucesso!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Credenciais inválidas. Tente novamente.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default Login;
