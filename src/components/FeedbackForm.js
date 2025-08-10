import React, { useState } from 'react';

function FeedbackForm({ onSubmit, userRole, userData, feedbacks, onResolve }) {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Name is required';
    if (!formData.email.trim()) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Invalid email';
    if (!formData.message.trim()) err.message = 'Message is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors(prev => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newFeedback = {
      ...formData,
      date: new Date().toLocaleString(),
      status: 'pending'
    };

    if (onSubmit) onSubmit(newFeedback);

    setSubmitted(true);
    setFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      message: ''
    });

    setTimeout(() => setSubmitted(false), 2500);
  };

  if (userRole === 'manager') {
    return (
      <div>
        <h2 style={styles.heading}>📥 Employee Complaints / Feedback</h2>
        {feedbacks?.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {feedbacks.map((fb, index) => (
              <li key={index} style={styles.card}>
                <div style={styles.headerRow}>
                  <strong>{fb.name}</strong>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor:
                        fb.status === 'resolved' ? '#2ecc71' : '#f39c12'
                    }}
                  >
                    {fb.status === 'resolved' ? 'Resolved' : 'Pending'}
                  </span>
                </div>

                <p><strong>Email:</strong> {fb.email}</p>
                <p><strong>Message:</strong> {fb.message}</p>
                <p style={styles.date}><em>{fb.date}</em></p>

                {fb.status !== 'resolved' && (
                  <button
                    onClick={() => onResolve(index)}
                    style={styles.resolveBtn}
                  >
                    ✅ Mark as Resolved
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>💬 Submit Complaint / Feedback</h2>
      {submitted && (
        <div style={styles.success}>✅ Feedback submitted successfully!</div>
      )}

      <form onSubmit={handleSubmit}>
        {}
        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.name ? '#e74c3c' : '#ccc'
            }}
            placeholder="Enter your name"
          />
          {errors.name && <small style={styles.error}>{errors.name}</small>}
        </div>

        {}
        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.email ? '#e74c3c' : '#ccc'
            }}
            placeholder="Enter your email"
          />
          {errors.email && <small style={styles.error}>{errors.email}</small>}
        </div>

        {}
        <div style={styles.field}>
          <label style={styles.label}>Message</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            style={{
              ...styles.textarea,
              borderColor: errors.message ? '#e74c3c' : '#ccc'
            }}
            placeholder="Write your complaint or feedback..."
          />
          {errors.message && <small style={styles.error}>{errors.message}</small>}
        </div>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    maxWidth: '500px',
    margin: '32px auto',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  heading: {
    marginBottom: '16px',
    fontSize: '20px',
    color: '#232946',
    textAlign: 'center'
  },
  field: {
    marginBottom: '18px'
  },
  label: {
    fontWeight: '600',
    marginBottom: '6px',
    display: 'block',
    color: '#232946'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    border: '1.5px solid #ccc',
    borderRadius: '6px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '15px',
    border: '1.5px solid #ccc',
    borderRadius: '6px',
    resize: 'vertical'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#232946',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  success: {
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: '12px',
    textAlign: 'center'
  },
  error: {
    color: '#e74c3c',
    fontSize: '13px',
    marginTop: '4px',
    display: 'block'
  },
  date: {
    color: '#999',
    fontSize: '13px',
    marginTop: '6px'
  },
  badge: {
    padding: '5px 10px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    marginLeft: '10px'
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    alignItems: 'center'
  },
  resolveBtn: {
    marginTop: '10px',
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

export default FeedbackForm;
