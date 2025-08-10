import React, { useState } from 'react';

function Login({ onLogin, employees }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('employee');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (selectedRole === 'manager') {
      const validManagerEmail = 'manager@example.com';
      const validManagerPassword = '1234';

      if (
        email.trim().toLowerCase() === validManagerEmail.toLowerCase() &&
        password === validManagerPassword
      ) {
        onLogin({ role: 'manager', email });
      } else {
        setError('Access denied. Invalid manager credentials.');
      }
      return;
    }

    const emp = employees.find(
      (emp) => emp.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!emp) {
      setError('No employee found with this email');
      return;
    }

    onLogin(emp);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.imageOverlay}>
          <h1 style={styles.welcomeText}>Welcome to EMS</h1>
          <p style={styles.tagline}>Manage your employees seamlessly</p>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
          <h2 style={styles.formTitle}>Sign In</h2>

          <div style={styles.field}>
            <label style={styles.label}>Role</label>
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setError('');
                setPassword('');
              }}
              style={styles.select}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              style={styles.input}
              autoComplete="username"
            />
          </div>

          {selectedRole === 'manager' && (
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter manager password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                style={styles.input}
                autoComplete="current-password"
              />
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f0f2f5'
  },
  leftPanel: {
    flex: 1,
    backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1350&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageOverlay: {
    backgroundColor: 'rgba(35, 41, 70, 0.75)',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '320px',
    textAlign: 'center'
  },
  welcomeText: {
    fontSize: '36px',
    marginBottom: '12px',
    fontWeight: '700',
    lineHeight: 1.2
  },
  tagline: {
    fontSize: '18px',
    fontWeight: '400',
    opacity: 0.85
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    width: '320px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    backgroundColor: '#ffffff'
  },
  formTitle: {
    fontSize: '28px',
    marginBottom: '24px',
    fontWeight: '700',
    color: '#232946',
    textAlign: 'center'
  },
  field: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#232946',
    fontSize: '14px'
  },
  select: {
    height: '40px',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1.5px solid #ced4da',
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9'
  },
  input: {
    height: '40px',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1.5px solid #ced4da',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: '#f9f9f9'
  },
  inputFocus: {
    borderColor: '#5058ba'
  },
  error: {
    color: '#e74c3c',
    fontSize: '13px',
    marginBottom: '10px',
    textAlign: 'center'
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '700',
    backgroundColor: '#232946',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default Login;
