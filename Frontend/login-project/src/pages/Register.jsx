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
            console.log('Sending data:', userData);
            const response = await axios.post('http://localhost:3000/auth/register', { ...userData, confirmpassword: userData.confirmPassword });
            console.log('Server response:', response.data);
            setSuccessMessage('Usuário registrado com sucesso!');
            setErrorMessage('');
        } catch (error) {
            console.error('Registration error:', error.response.data);
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

            {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
            {successMessage && <p className='successMessage'>{successMessage}</p>}
        </div>
    );
};

export default RegisterForm;
