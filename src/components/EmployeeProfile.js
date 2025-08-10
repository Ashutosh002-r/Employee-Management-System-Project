import React from 'react';

function EmployeeProfile({ userData }) {
  if (!userData) return null;

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>🙋‍♂ My Profile</h2>

      {userData.photo && (
        <div style={styles.photoBox}>
          <img
            src={userData.photo}
            alt={userData.name}
            style={styles.photo}
          />
        </div>
      )}

      <div style={styles.info}>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>Category:</strong> {userData.category || "--"}</p>
        <p><strong>Salary:</strong> ₹{userData.salary}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '24px',
    fontSize: '22px',
    color: '#232946'
  },
  photoBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  photo: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #ccc'
  },
  info: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.8'
  }
};

export default EmployeeProfile;