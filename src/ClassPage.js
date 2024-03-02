import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:44379' // Set the base URL for API requests
});

const ClassPage = () => {
    const [classes, setClasses] = useState([]);
    const [importFile, setImportFile] = useState(null);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await api.get('/api/classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleFileChange = (event) => {
        setImportFile(event.target.files[0]);
    };

    const handleImport = async () => {
        try {
            const formData = new FormData();
            formData.append('file', importFile);
            await api.post('/api/classes/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Classes imported successfully.');
            fetchClasses(); // Refresh class data after import
        } catch (error) {
            console.error('Error importing classes:', error);
            alert('Error importing classes. Please try again.');
        }
    };

    return (
        <div>
            <h1>Class Page</h1>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <button onClick={handleImport} disabled={!importFile}>Import Classes</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(cls => (
                        <tr key={cls.id}>
                            <td>{cls.id}</td>
                            <td>{cls.name}</td>
                            <td>{cls.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassPage;
