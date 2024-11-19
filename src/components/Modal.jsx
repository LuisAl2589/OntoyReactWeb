import React, { useState } from 'react';
import './css/modal.css'; // Make sure to create a corresponding CSS file for styling
import { div } from 'three/webgpu';

const Modal = ({children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal1">
                <div className="modal1-content">
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Modal;