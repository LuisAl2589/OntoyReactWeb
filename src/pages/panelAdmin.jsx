import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import Footer from '../components/Footer';

import './css/adminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleNavigation = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="container-fluid p-0 vw-100">
            <AppNavbar />
            <div className='my-5  vh-100 vw-100'>
                <h2>Admin Panel</h2>
                <ul className="list-unstyled p-0">
                    <li
                        className={`p-2 text-center ${activeSection === 'dashboard' ? 'bg-primary text-white' : 'text-dark'}`}
                        onClick={() => handleNavigation('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`p-2 text-center ${activeSection === 'users' ? 'bg-primary text-white' : 'text-dark'}`}
                        onClick={() => handleNavigation('users')}
                    >
                        Manage Users
                    </li>
                    <li
                        className={`p-2 text-center ${activeSection === 'settings' ? 'bg-primary text-white' : 'text-dark'}`}
                        onClick={() => handleNavigation('settings')}
                    >
                        Settings
                    </li>
                </ul>
                {/* Main Content */}
                <div style={{ padding: '20px' }}>
                    {activeSection === 'dashboard' && <Dashboard />}
                    {activeSection === 'users' && <ManageUsers />}
                    {activeSection === 'settings' && <Settings />}
                </div>
                {/* Buttons */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button>
                        Editar Usuarios
                    </button>
                    <button>
                        Ver Lista de Usuarios
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel. Here is an overview of your application.</p>
        <div className="d-grid gap-2 d-md-block">
            <button onClick={() => alert('Viewing reports...')} className="btn btn-primary m-2">
                View Reports
            </button>
            <button onClick={() => alert('Refreshing data...')} className="btn btn-secondary m-2">
                Refresh Data
            </button>
        </div>
    </div>
);

const ManageUsers = () => (
    <div>
        <h1>Manage Users</h1>
        <p>Here you can add, edit, or delete users.</p>
        <div className="d-grid gap-2 d-md-block">
            <button onClick={() => alert('Adding new user...')} className="btn btn-success m-2">
                Add New User
            </button>
            <button onClick={() => alert('Exporting users...')} className="btn btn-info m-2">
                Export Users
            </button>
        </div>
    </div>
);

const Settings = () => (
    <div>
        <h1>Settings</h1>
        <p>Update your application settings here.</p>
        <div className="d-grid gap-2 d-md-block">
            <button onClick={() => alert('Saving settings...')} className="btn btn-warning m-2">
                Save Settings
            </button>
            <button onClick={() => alert('Restoring defaults...')} className="btn btn-danger m-2">
                Restore Defaults
            </button>
        </div>
    </div>
);

export default AdminPanel;
