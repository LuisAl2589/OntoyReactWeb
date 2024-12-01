import React, { useState } from 'react';
import { Button,Form , InputGroup,Dropdown} from 'react-bootstrap';
import './css/buscador.css';
import { buscar } from '../api/busqueda';

const Buscador = () => {
    const [query, setQuery] = useState('');



    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async(e) => {
        e.preventDefault();
        try {
            const data = await buscar(query);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='buscador'>
            <InputGroup className="mb-3">
                <Form.Control
                    aria-describedby="basic-addon1"
                    placeholder="Buscar Salón"
                    onChange={handleInputChange} 
                    value={query}
                />
                    <Button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                </InputGroup>   
        </div>
    );
};

export default Buscador;