import React, { Component } from "react";
import './Main.css';

import iit from './images/iit.png';
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
        <img src={iit} width="500" height="110" class="iitImage"/>
        <div class="mx-auto">
          <h1 class="title">Select Building</h1>
        </div>

        <figure class="building">
          <img src={hermann} width="300" height="200"/>
          <figcaption>
            <h2>Hermann Hall</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={mtcc} width="300" height="200"/>
          <figcaption>
            <h2>MTCC</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={tower} width="300" height="200"/>
          <figcaption>
            <h2>IIT Tower</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={pritzker} width="300" height="200"/>
          <figcaption>
            <h2>Pritzker Center</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={galvin} width="300" height="200"/>
          <figcaption>
            <h2>Galvin Library</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={msv} width="300" height="200"/>
          <figcaption>
            <h2>MSV</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={stuart} width="300" height="200"/>
          <figcaption>
            <h2>Stuart Building</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={engin} width="300" height="200"/>
          <figcaption>
            <h2>Eng. Center</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={kaplan} width="300" height="200"/>
          <figcaption>
            <h2>Kaplan Institute</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={wishnick} width="300" height="200"/>
          <figcaption>
            <h2>Wishnick Hall</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={perlstein} width="300" height="200"/>
          <figcaption>
            <h2>Perlstein Hall</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>

        <figure class="building">
          <img src={crown} width="300" height="200"/>
          <figcaption>
            <h2>Crown</h2>
          </figcaption>    
          <a href="#"></a>             
        </figure>
      </div>
    );
  }
}


 
export default Main;