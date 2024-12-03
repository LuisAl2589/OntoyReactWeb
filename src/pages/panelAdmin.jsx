import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import './css/adminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleNavigation = (section) => {
        setActiveSection(section);
    };
    return (
        <div className="w-100">
            <AppNavbar />
            <div className='w-100 vh-100'>
                <h2>Admin Panel</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li
                        style={{ padding: '10px', cursor: 'pointer', background: activeSection === 'dashboard' ? '#0056b3' : 'none' }}
                        onClick={() => handleNavigation('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        style={{ padding: '10px', cursor: 'pointer', background: activeSection === 'users' ? '#0056b3' : 'none' }}
                        onClick={() => handleNavigation('users')}
                    >
                        Manage Users
                    </li>
                    <li
                        style={{ padding: '10px', cursor: 'pointer', background: activeSection === 'settings' ? '#0056b3' : 'none' }}
                        onClick={() => handleNavigation('settings')}
                    >
                        Settings
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                {activeSection === 'dashboard' && <Dashboard />}
                {activeSection === 'users' && <ManageUsers />}
                {activeSection === 'settings' && <Settings />}
            </div>
        </div>
    );
};

// Components for sections
const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel. Here is an overview of your application.</p>
    </div>
);

const ManageUsers = () => (
    <div>
        <h1>Manage Users</h1>
        <p>Here you can add, edit, or delete users.</p>
    </div>
);

const Settings = () => (
    <div>
        <h1>Settings</h1>
        <p>Update your application settings here.</p>
    </div>
);

export default AdminPanel;
