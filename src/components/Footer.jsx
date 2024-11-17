import React from 'react';
import './css/footer.css'; // Asegúrate de tener un archivo CSS correspondiente para estilos adicionales

const Footer = () => {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary footer">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>Contactanos en nuestras redes sociales</span>
                </div>
                <div>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="me-4 text-reset">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </section>

            <section>
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>Nombre de compañia que aun no tenemosxd
                            </h6>
                            <p>
                                Descripcion de la empresa que aun no se
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Desarrolladores
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Armando</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Luis</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Uri</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Joshua</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Josue</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Useful links
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Pricing</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Settings</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Orders</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Help</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                            <p><i className="fas fa-home me-3"></i> Av. Juan de Dios Bátiz s/n esq. Av. Miguel Othón de Mendizabal Colonia Lindavista, Alcaldía Gustavo A. Madero Código Postal 07738, Ciudad de México</p>
                            <p><i className="fas fa-envelope me-3"></i> correo@correo.com</p>
                            <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2024 Copyright:
                <a className="text-reset fw-bold" href="#"></a>
            </div>
        </footer>
    );
};

export default Footer;
