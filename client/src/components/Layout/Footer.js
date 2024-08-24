import React from 'react';
import './Footer.css'; // Ensure this file contains the updated CSS
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <p>
          Hello, nous sommes Back Market, la première place de marché dédiée aux produits reconditionnés. 
          Notre mission ? Rendre mainstream la consommation de produits ressuscités. 
          Ça sonne british et christique, mais c'est tout à fait ça.
        </p>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>A propos</h4>
          <ul>
            <li><a href="#">Qui sommes nous ?</a></li>
            <li><a href="#">Revendre votre appareil</a></li>
            <li><a href="#">Back Market pour les entreprises</a></li>
            <li><a href="#">Offre étudiante</a></li>
            <li><a href="#">On recrute !</a></li>
            <li><a href="#">Presse</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Besoin d'aide ?</h4>
          <ul>
            <li><a href="#">Devenir vendeur sur Back Market</a></li>
            <li><a href="#">Connexion au Back Office marchand</a></li>
            <li><a href="#">Paiement</a></li>
            <li><a href="#">Livraison</a></li>
            <li><a href="#">Retours & Remboursements</a></li>
            <li><a href="#">Assurances</a></li>
            <li><a href="#">Aide et Assistance</a></li>
            <li><a href="#">Guides d'achat et conseils</a></li>
            <li><a href="#">Comparer nos produits</a></li>
            <li><a href="#">Idées cadeaux</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>La loi et l'ordre</h4>
          <ul>
            <li><a href="#">Conditions générales d'utilisation</a></li>
            <li><a href="#">Conditions générales de vente</a></li>
            <li><a href="#">Conditions Générales du Service de Reprise</a></li>
            <li><a href="#">Contrat de garantie commerciale</a></li>
            <li><a href="#">Protection des données</a></li>
            <li><a href="#">Cookies et paramètres de confidentialité</a></li>
            <li><a href="#">Autres infos légales</a></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Signaler un contenu illicite</a></li>
            <li><a href="#">Achats 100% sécurisés</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Coucou !</h4>
          <ul>
            <li><a href="#">Trustpilot</a></li>
            <li><a href="#">Glassdoor</a></li>
            <li><a href="#">Welcome to the Jungle</a></li>
            <li><a href="#">Medium</a></li>
            <li><a href="#">Nana Mouskouri</a></li>
          </ul>
          <div className="footer-social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-certifications">
            <img src="certification.png" alt="Certified B Corporation" />
            <img src="award.png" alt="Award" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-flags">
          <img src="flag-fr.png" alt="France" />
          <img src="flag-de.png" alt="Germany" />
          <img src="flag-nl.png" alt="Netherlands" />
          <img src="flag-be.png" alt="Belgium" />
          <img src="flag-es.png" alt="Spain" />
          <img src="flag-it.png" alt="Italy" />
          <img src="flag-uk.png" alt="UK" />
          <img src="flag-us.png" alt="USA" />
          <img src="flag-au.png" alt="Australia" />
          <img src="flag-kr.png" alt="South Korea" />
        </div>
        <p>© 2024 Back Market</p>
        <div className="footer-app-links">
          <img src="google-play.png" alt="Google Play" />
          <img src="app-store.png" alt="App Store" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
