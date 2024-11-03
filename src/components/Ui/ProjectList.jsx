import React from 'react';

function ProjectList() {
  const projects = [
    { name: 'Chakra Soft UI Version', budget: '$14,000', progress: '60%' },
    { name: 'Progress Track', budget: '$3,000', progress: '10%' },
    // Add other projects as needed...
  ];

  return (
    <div className="card">
      <h3 className="cardTitle">Projects</h3>
      <div>
        {projects.map((project, index) => (
          <div key={index} className="projectItem">
            <span>{project.name}</span>
            <span>{project.budget}</span>
            <span>{project.progress}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ProjectList;
