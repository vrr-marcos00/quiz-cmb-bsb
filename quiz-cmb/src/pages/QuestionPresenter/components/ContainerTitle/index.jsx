import React from 'react';
import './styles.css';

function ContainerTitle({ title, isResponsePage }) {
  const mainTitle = isResponsePage ? 'Resposta' : title;
  return (
    <div className="row-main_title">
      <h1>{mainTitle}</h1>
    </div>
  )
}

export default ContainerTitle;