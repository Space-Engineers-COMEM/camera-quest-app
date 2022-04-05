import React from 'react';
import { Link } from 'react-router-dom';

class Error404 extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>404 page introuvable</h1>
        <p>Désolé, aucune ressources est accessible à cette adresse</p>
        <Link to="/welcome">Retour à la page d&apos;accueil</Link>
      </div>
    );
  }
}

export default Error404;
