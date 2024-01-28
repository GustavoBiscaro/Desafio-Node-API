import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/register', userData);
            setSuccessMessage('Usuário registrado com sucesso!');
            setErrorMessage('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage('Erro ao registrar usuário. Tente novamente.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <form>
                <div className='fieldsDiv'>
                    <label>Nome:</label>
                    <input type="text" name="name" value={userData.name} onChange={handleChange} />
                </div>

                <div className='fieldsDiv'>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} />
                </div>

                <div className='fieldsDiv'>
                    <label>Senha:</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </div>

                <div className='fieldsDiv'>
                    <label>Confirme a Senha:</label>
                    <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                </div>

                <div className='actionButton'>
                <button type="button" onClick={handleRegister}>
                    Cadastrar
                </button>
                </div>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default RegisterForm;
