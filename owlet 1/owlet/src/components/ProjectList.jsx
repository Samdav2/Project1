import React from 'react';

function ProjectList() {
  const projects = [
    { name: 'Chakra Soft UI Version', budget: '$14,000', progress: '60%' },
    { name: 'Progress Track', budget: '$3,000', progress: '10%' },
    // Add other projects as needed...
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Projects</h3>
      <div>
        {projects.map((project, index) => (
          <div key={index} style={styles.projectItem}>
            <span>{project.name}</span>
            <span>{project.budget}</span>
            <span>{project.progress}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '65%',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '10px',
  },
  projectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    padding: '5px 0',
    borderBottom: '1px solid #e2e8f0',
  },
};

export default ProjectList;
