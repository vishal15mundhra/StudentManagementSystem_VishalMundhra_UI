import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44379' // Set the base URL for API requests
});

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailId: '',
        classIds: []
    });

    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, [searchText, pageNumber, pageSize]);

    const fetchStudents = async () => {
        try {
            const response = await api.get(`/api/students?searchString=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await api.get(`/api/classes`);
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleEditClick = (student) => {
        setIsEditing(true);
        setEditingStudent(student);
        setNewStudent({
            firstName: student.firstName,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            emailId: student.emailId,
            classIds: student.classes.map(c => c.id)
        });
    };

    const handleDeleteClick = async (studentId) => {
        try {
            await api.delete(`/api/students/${studentId}`);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleSaveAdd = async () => {
        try {
            await api.post(`/api/students`, newStudent);
            setIsAdding(false);
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await api.put(`/api/students/${editingStudent.id}`, newStudent);
            setIsEditing(false);
            fetchStudents();
        } catch (error) {
            console.error('Error editing student:', error);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setNewStudent({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailId: '',
            classIds: []
        });
    };

    const handleClassCheckboxChange = (classId) => {
        if (newStudent.classIds.includes(classId)) {
            setNewStudent({ ...newStudent, classIds: newStudent.classIds.filter(id => id !== classId) });
        } else {
            setNewStudent({ ...newStudent, classIds: [...newStudent.classIds, classId] });
        }
    };

    return (
        <div>
            <h1>Student Page</h1>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchText}
                onChange={handleSearchInputChange}
            />
            <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
            <button onClick={handleAddClick}>Add Student</button>
            {isAdding && (
                <div>
                    <h2>Add Student</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newStudent.firstName}
                        onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newStudent.lastName}
                        onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={newStudent.phoneNumber}
                        onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newStudent.emailId}
                        onChange={(e) => setNewStudent({ ...newStudent, emailId: e.target.value })}
                    />
                    <div>
                        {classes.map(classItem => (
                            <label key={classItem.id}>
                                <input
                                    type="checkbox"
                                    checked={newStudent.classIds.includes(classItem.id)}
                                    onChange={() => handleClassCheckboxChange(classItem.id)}
                                />
                                {classItem.name}
                            </label>
                        ))}
                    </div>
                    <button onClick={handleSaveAdd}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            {isEditing && (
                <div>
                    <h2>Edit Student</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newStudent.firstName}
                        onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newStudent.lastName}
                        onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={newStudent.phoneNumber}
                        onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newStudent.emailId}
                        onChange={(e) => setNewStudent({ ...newStudent, emailId: e.target.value })}
                    />
                    <div>
                        {classes.map(classItem => (
                            <label key={classItem.id}>
                                <input
                                    type="checkbox"
                                    checked={newStudent.classIds.includes(classItem.id)}
                                    onChange={() => handleClassCheckboxChange(classItem.id)}
                                />
                                {classItem.name}
                            </label>
                        ))}
                    </div>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Classes</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.emailId}</td>
                            <td>{student.classes.map(cls => cls.name).join(', ')}</td>
                            <td>
                                <button onClick={() => handleEditClick(student)}>Edit</button>
                                <button onClick={() => handleDeleteClick(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>Previous</button>
                <span>{pageNumber}</span>
                <button onClick={() => handlePageChange(pageNumber + 1)}>Next</button>
            </div>
        </div>
    );
};

export default StudentPage;
