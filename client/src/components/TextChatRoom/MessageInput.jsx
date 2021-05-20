import { useState } from 'react';

const MassageInput = () => {
    const [message, setMessage] = useState('');

    const handleChande = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form className="msg__input">
            <textarea
            value={message}
            onChange={(e) => handleChande(e)}
            />
            <button>
            Отправить
            </button>

        </form>
    )
}

export default MassageInput;