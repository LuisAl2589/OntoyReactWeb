import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Dropdown, Button } from 'react-bootstrap';
import './css/buscador.css';
import { buscarSalon } from '../api/busqueda';

const Buscador = ({ handleFunction, handleFunction2, handleGenerar }) => {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState([]);
    const [desplegar, setDesplegar] = useState(false);

    const [query2, setQuery2] = useState('');
    const [resultados2, setResultados2] = useState([]);
    const [desplegar2, setDesplegar2] = useState(false);

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


    useEffect(() => {
        
        const buscar = async (query2) => {
            if (query2 === '') {
                setResultados2([]);
                return;
            }
            
            try {
                const response = await buscarSalon(query2);
                setResultados2(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        buscar(query2);
    }, [query2]);

    const handleInputChange2 = (e) => {
        setQuery2(e.target.value);
        setDesplegar2(true);
    };

    const handleSelect2 = (resultado) => {
        setResultados2([]);
        setQuery2(resultado.nodo_nombre);
        setDesplegar2(false);
        handleFunction2(resultado);
    };

    return (
        <div className="buscador">
            <InputGroup style={{ position: "relative" }}>
                <InputGroup.Text>Origen</InputGroup.Text>
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
            <InputGroup  style={{ position: "relative" }}>
                <InputGroup.Text>Destino</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Buscar salón..."
                    value={query2}
                    onChange={handleInputChange2}
                />
                {query2 && desplegar2 && (
                    <Dropdown.Menu show variant="dark" style={{ position: "absolute", top: "100%", left: "0", zIndex: 1000, width: "100%" }}>
                        {resultados2.length > 0 ? (
                            resultados2.map((resultado) => (
                                <Dropdown.Item key={resultado.nodo_nombre} onClick={() => handleSelect2(resultado)}>
                                    {resultado.nodo_nombre}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <Dropdown.Item disabled>No hay resultados</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                )}
            </InputGroup>
            <Button variant="primary" onClick={()=>handleGenerar()}>Generar Ruta</Button>
        </div>
    );
};

export default Buscador;
