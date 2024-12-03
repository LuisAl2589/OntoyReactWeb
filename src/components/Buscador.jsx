import React, { useEffect, useState } from 'react';
import { Button,Form , InputGroup,Dropdown} from 'react-bootstrap';
import './css/buscador.css';
import { buscarSalon } from '../api/busqueda';

const Buscador = ({handleFunction}) => {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    
    
    
    useEffect(() => {
        const buscar = async (query) => {
            if (query === '') {
                setResultados([]);
                return;
            }
            try {
                const response = await buscarSalon(query);
                setResultados(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        buscar(query);
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSelect = (resultado) => {
            handleFunction(resultado); // Llama la función del componente padre
        
    };


    return (
        <div className='buscador'>
            
            <Dropdown.Menu variant='dark' show>
                <Dropdown.Header>
                    <Form.Control type="text" placeholder="Buscar salón..." value={query} onChange={handleInputChange} />
                </Dropdown.Header>
                {(resultados.length > 0) && (
                    resultados.map((resultado) => (
                        <Dropdown.Item key={resultado.nodo_nombre} onClick={() => handleSelect(resultado)}>
                            {resultado.nodo_nombre}
                        </Dropdown.Item>
                    ))
                )}
                
            </Dropdown.Menu>
        </div>
    );
};

export default Buscador;