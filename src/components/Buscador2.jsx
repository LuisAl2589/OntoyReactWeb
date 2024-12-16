import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Dropdown } from 'react-bootstrap';
import './css/buscador.css';
import { buscarSalon } from '../api/busqueda';

const Buscador2 = ({ handleFunction, encabezado }) => {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    const [desplegar, setDesplegar] = useState(false);

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
        setDesplegar(true);
    };

    const handleSelect = (resultado) => {
        setResultados([]);
        setQuery(resultado.nodo_nombre);
        setDesplegar(false);
        handleFunction(resultado);
    };

    return (
        <div className="buscador">
            <InputGroup className="mb-3" style={{ position: "relative" }}>
                <InputGroup.Text>{encabezado}</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Buscar salón..."
                    value={query}
                    onChange={handleInputChange}
                />
                {query && desplegar && (
                    <Dropdown.Menu show variant="dark" style={{ position: "absolute", top: "100%", left: "0", zIndex: 1000, width: "100%" }}>
                        {resultados.length > 0 ? (
                            resultados.map((resultado) => (
                                <Dropdown.Item key={resultado.nodo_nombre} onClick={() => handleSelect(resultado)}>
                                    {resultado.nodo_nombre}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <Dropdown.Item disabled>No hay resultados</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                )}
            </InputGroup>
        </div>
    );
};

export default Buscador2;
