import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import CategoryManager from './components/CategoryManager';
import FeedbackForm from './components/FeedbackForm';
import EmployeeProfile from './components/EmployeeProfile';
import Login from './components/Login';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState(['IT', 'HR', 'Finance']);
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [activePage, setActivePage] = useState('Dashboard');
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  // 🔁 Load saved session/data from localStorage
  useEffect(() => {
    const getData = (key, fallback = null) =>
      JSON.parse(localStorage.getItem(key)) || fallback;

    setEmployees(getData('employees', []));
    setCategories(getData('categories', ['IT', 'HR', 'Finance']));
    setFeedbacks(getData('feedbacks', []));
    setUserRole(localStorage.getItem('userRole'));
    setLoggedInEmployee(getData('loggedInEmployee'));
    setActivePage(localStorage.getItem('activePage') || 'Dashboard');
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  // 💾 Save updates to localStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole || '');
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [userRole, isLoggedIn]);

  useEffect(() => {
    if (loggedInEmployee) {
      localStorage.setItem('loggedInEmployee', JSON.stringify(loggedInEmployee));
    } else {
      localStorage.removeItem('loggedInEmployee');
    }
  }, [loggedInEmployee]);

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  // ✅ Login handler
  const handleLogin = (user) => {
    if (user.role === 'manager') {
      setUserRole('manager');
    } else {
      setUserRole('employee');
      setLoggedInEmployee(user);
    }
    setIsLoggedIn(true);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setLoggedInEmployee(null);
    setEditingEmployee(null);
    setActivePage('Dashboard');

    localStorage.removeItem('userRole');
    localStorage.removeItem('loggedInEmployee');
    localStorage.removeItem('activePage');
    localStorage.removeItem('isLoggedIn');
  };

  // 👥 Employee management
  const addEmployee = (emp) => {
    setEmployees((prev) => [...prev, emp]);
  };

  const updateEmployee = (updatedEmp) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.email === updatedEmp.email ? updatedEmp : emp
      )
    );
    setEditingEmployee(null);

    // update profile if employee edits themself
    if (loggedInEmployee?.email === updatedEmp.email) {
      setLoggedInEmployee(updatedEmp);
    }
  };

  const deleteEmployee = (email) => {
    setEmployees((prev) => prev.filter((emp) => emp.email !== email));
    if (loggedInEmployee?.email === email) handleLogout(); // if user deletes their own account
  };

  const editEmployee = (emp) => {
    setEditingEmployee(emp);
    setActivePage('Manage Employees');
  };

  // 💬 Complaint/Feedback management
  const handleFeedbackSubmit = (feedback) => {
    setFeedbacks((prev) => [...prev, feedback]);
  };

  const markFeedbackResolved = (index) => {
    setFeedbacks((prev) =>
      prev.map((fb, i) =>
        i === index ? { ...fb, status: 'resolved' } : fb
      )
    );
  };

  // 🔓 Show login screen
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} employees={employees} />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
        userRole={userRole}
      />

      <div
        style={{
          marginLeft: '220px',
          padding: '30px',
          backgroundColor: '#f4f4f4',
          width: '100%',
          minHeight: '100vh'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Employee Management System
        </h2>

        {activePage === 'Dashboard' && (
          <Dashboard employees={employees} />
        )}

        {activePage === 'Manage Employees' && userRole === 'manager' && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            <EmployeeForm
              onAdd={addEmployee}
              onUpdate={updateEmployee}
              editingEmployee={editingEmployee}
              categories={categories}
            />
            <div style={{ flex: 1 }}>
              <EmployeeList
                employees={employees}
                onEdit={editEmployee}
                onDelete={deleteEmployee}
              />
            </div>
          </div>
        )}

        {activePage === 'Manage Categories' && userRole === 'manager' && (
          <CategoryManager
            categories={categories}
            setCategories={setCategories}
          />
        )}

        {activePage === 'My Profile' && userRole === 'employee' && (
          <EmployeeProfile userData={loggedInEmployee} />
        )}

        {activePage === 'Complaint / Feedback' && (
          <FeedbackForm
            onSubmit={handleFeedbackSubmit}
            onResolve={markFeedbackResolved}
            userRole={userRole}
            userData={loggedInEmployee}
            feedbacks={feedbacks}
          />
        )}
      </div>
    </div>
  );
}

export default App;