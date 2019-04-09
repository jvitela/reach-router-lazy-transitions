import React, { Component } from 'react';
import { Link } from '@reach/router'
import { sleep } from 'Utils'
import logo from './logo.svg';
import './First.css';

export default class First extends Component {

   static async getInitialProps() {
      await sleep(300);
      return {
         text: 'Cupcake ipsum dolor sit'
      };
   }

   onNavigate() {
      this.props.navigate(this.props.links.success);
   }

   render() {
      return (
         <div className="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <p>
                  <strong>{this.props.text}.</strong>
                  Amet jelly-o caramels liquorice apple pie. 
                  Brownie lemon drops cookie tart gummies jelly beans I love soufflé. 
                  Caramels apple pie powder tootsie roll I love jelly beans dessert danish I love. 
                  Halvah I love pie bear claw wafer macaroon halvah sesame snaps. 
                  Liquorice marzipan brownie icing.
               </p>
               <p>
                  <Link to={this.props.links.success} className="App-link">
                     Navigate using a link
                  </Link>
               </p>
               <p>
                  <button
                     className="btn"
                     onClick={this.onNavigate.bind(this)}
                  >
                     Navigate Imperatively
                  </button>
               </p>
            </header>
         </div>
      );
   }
};
