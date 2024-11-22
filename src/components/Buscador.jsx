import React, { useState } from 'react';
import { Button,Form , InputGroup} from 'react-bootstrap';
import './css/buscador.css';


const Buscador = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className='buscador'>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    placeholder="Buscar..."
                    onChange={handleInputChange} 
                    value={query}

                />
                <Button onClick={handleSearch} variant="outline-primary" id="button-addon1">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </InputGroup>
        </div>
    );
};

export default Buscador;