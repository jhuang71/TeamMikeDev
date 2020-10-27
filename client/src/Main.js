import React from "react";
import './Main.css';

import hermann from './images/hermann.jpg';
import pritzker from './images/pritzker.jpg';
import mtcc from './images/mtcc.jpg';
import tower from './images/tower.png';
import galvin from './images/galvin.jpg';
import msv from './images/msv.jpg';
import stuart from './images/stuart.png';
import engin from './images/retta.jpg';
import kaplan from './images/kaplan.jpg';
import wishnick from './images/wishnick.jpg';
import perlstein from './images/perlstein.jpg';
import crown from './images/crown.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';


class Main extends React.Component {
  render() {
    return (
      <div id="page-wrap">
        <div className="mx-auto">
        </div>

        <figure className="building">
          <img src={hermann} alt="hermann" width="300" height="200" />
          <figcaption>
            <h2>Hermann Hall</h2>
          </figcaption>
          <a href="/building/hermann">_</a>
        </figure>

        <figure className="building">
          <img src={mtcc} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>MTCC</h2>
          </figcaption>    
          <a href="/building/mtcc">_</a>             
        </figure>

        <figure className="building">
          <img src={tower} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>IIT Tower</h2>
          </figcaption>    
          <a href="/building/iit_tower">_</a>             
        </figure>

        <figure className="building">
          <img src={pritzker} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Pritzker Center</h2>
          </figcaption>    
          <a href="/building/pritzker">_</a>             
        </figure>

        <figure className="building">
          <img src={galvin} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Galvin Library</h2>
          </figcaption>    
          <a href="/building/galvin">_</a>             
        </figure>

        <figure className="building">
          <img src={msv} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>MSV</h2>
          </figcaption>    
          <a href="/building/msv">_</a>             
        </figure>

        <figure className="building">
          <img src={stuart} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Stuart Building</h2>
          </figcaption>    
          <a href="/building/stuart">_</a>             
        </figure>

        <figure className="building">
          <img src={engin} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Eng. Center</h2>
          </figcaption>    
          <a href="/building/Eng">_</a>             
        </figure>

        <figure className="building">
          <img src={kaplan} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Kaplan Institute</h2>
          </figcaption>    
          <a href="/kaplan">_</a>             
        </figure>

        <figure className="building">
          <img src={wishnick} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Wishnick Hall</h2>
          </figcaption>    
          <a href="/building/wishnick">_</a>             
        </figure>

        <figure className="building">
          <img src={perlstein} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Perlstein Hall</h2>
          </figcaption>    
          <a href="/building/perlstein">_</a>             
        </figure>

        <figure className="building">
          <img src={crown} alt="temp" width="300" height="200" />
          <figcaption>
            <h2>Crown</h2>
          </figcaption>    
          <a href="/building/crown">_</a>             
        </figure>
      </div>
    );
  }
}



export default Main;