import React from "react";
import "./Styles/Landing.css";
import Link from "react-router-dom";
import Landing from "./Components/Landing/Landing";

export default class Landing extends React.Component {
  render() {
    return (
      <div class="Landing">
        <header id="Landing-Header">
          <h1 id="Landing-H1">Logo</h1>
          <h4 id="Landing-Slogan">quality shopping with a modern twist</h4>
          <button id="HomeButton">Continue to site</button>
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
          <a href="" target="blank_">
            <i class="fab fa-github"></i>
          </a>
          <a href="" target="blank_">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="" target="blank_">
            <i class="fas fa-desktop"></i>
          </a>
        </section>
      </div>
    );
  }
}
