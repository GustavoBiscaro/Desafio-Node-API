import React, { useState } from 'react'

const User = () => {
    const [nome, setNome] = useState('John');
    return (
        <div>
            <h2>Página de Perfil</h2>
            <p>{`Usuário ${nome} está conectado`}</p>
        </div>
    )
}

export default User