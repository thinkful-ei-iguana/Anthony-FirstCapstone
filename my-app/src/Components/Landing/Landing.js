import React from "react";
import "../../Styles/Landing.css";
import { Link } from "react-router-dom";
import PhoneSVG from "../SVGs/PhoneSVG";
import SmartLogo from "../../Assets/smartLogo.png";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item">
            <img
              id="Landing-Logo"
              src={SmartLogo}
              alt="Smart Marketplace Logo"
            />
            <h4 id="Landing-Slogan">quality shopping with a modern twist</h4>
            <div id="HomeBtn">
              <Link id="Home-Btn" to="/Home">
                Continue to site
              </Link>
            </div>
          </div>
          <div id="SVG" className="flex-item">
            <PhoneSVG />
          </div>
        </header>
        <section id="Landing-Documentation">
          <div id="FAQ">
            <h2 id="FAQ-H2">What is Smart Marketplace?</h2>
            <p id="FAQ-P">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper
              nibh turpis, a commodo nisl aliquet in. Praesent dolor dolor,
              efficitur vel justo quis, pulvinar euismod nisi. Aliquam
              condimentum maximus ipsum quis egestas. Nullam dictum diam diam.
              Vestibulum finibus tortor congue erat fermentum, non aliquet nunc
              venenatis. Donec semper interdum justo, at imperdiet diam euismod
              ac. Nam tempus elit et lacus pharetra, sit amet dignissim sem
              auctor. Cras tristique pulvinar dui non lobortis. Morbi id mattis
              ex. Mauris dictum eu elit ac convallis. Ut placerat ut felis et
              fringilla. Nunc egestas quis ex vitae feugiat. Duis varius ex est,
              ac ultrices ligula pharetra in. Phasellus faucibus libero vitae
              tellus dapibus consequat.
            </p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">What is Smart Marketplace?</h2>
            <p id="FAQ-P">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper
              nibh turpis, a commodo nisl aliquet in. Praesent dolor dolor,
              efficitur vel justo quis, pulvinar euismod nisi. Aliquam
              condimentum maximus ipsum quis egestas. Nullam dictum diam diam.
              Vestibulum finibus tortor congue erat fermentum, non aliquet nunc
              venenatis. Donec semper interdum justo, at imperdiet diam euismod
              ac. Nam tempus elit et lacus pharetra, sit amet dignissim sem
              auctor. Cras tristique pulvinar dui non lobortis. Morbi id mattis
              ex. Mauris dictum eu elit ac convallis. Ut placerat ut felis et
              fringilla. Nunc egestas quis ex vitae feugiat. Duis varius ex est,
              ac ultrices ligula pharetra in. Phasellus faucibus libero vitae
              tellus dapibus consequat.
            </p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">What is Smart Marketplace?</h2>
            <p id="FAQ-P">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper
              nibh turpis, a commodo nisl aliquet in. Praesent dolor dolor,
              efficitur vel justo quis, pulvinar euismod nisi. Aliquam
              condimentum maximus ipsum quis egestas. Nullam dictum diam diam.
              Vestibulum finibus tortor congue erat fermentum, non aliquet nunc
              venenatis. Donec semper interdum justo, at imperdiet diam euismod
              ac. Nam tempus elit et lacus pharetra, sit amet dignissim sem
              auctor. Cras tristique pulvinar dui non lobortis. Morbi id mattis
              ex. Mauris dictum eu elit ac convallis. Ut placerat ut felis et
              fringilla. Nunc egestas quis ex vitae feugiat. Duis varius ex est,
              ac ultrices ligula pharetra in. Phasellus faucibus libero vitae
              tellus dapibus consequat.
            </p>
          </div>
        </section>
        <section id="Landing-Buttons">
          <h3 id="Connect-H3">Connect With Me</h3>
          <hr id="Connect-Divider" />
          <div id="buttons">
            <a href="https://github.com" target="blank_">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://github.com" target="blank_">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com" target="blank_">
              <i className="fas fa-desktop"></i>
            </a>
          </div>
        </section>
      </div>
    );
  }
}
