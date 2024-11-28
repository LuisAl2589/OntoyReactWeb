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
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
                    placeholder="Buscar..."
                    onChange={handleInputChange} 
                    value={query}

                />
                
                    <i className="fa-solid fa-magnifying-glass"></i>
            </InputGroup>
                <Dropdown.Menu show style={{ width: '100%' }}>
                    
                    <Dropdown.Item
                        key={1}
                        
                        >
                        Opcion 1
                    </Dropdown.Item>
                    <Dropdown.Item
                        key={2}
                       
                        >
                        Opcion 2
                    </Dropdown.Item>
                    <Dropdown.Item
                        key={3}
                       
                        >
                        Opcion 3
                    </Dropdown.Item>
              
                </Dropdown.Menu>    
        </div>
    );
};

export default Buscador;