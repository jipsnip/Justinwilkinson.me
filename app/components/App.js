import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import RouteProvider from './config/RouteProvider';
import Navbar from './Navigation/NavBar';
import Footer from "./General/Footer";

export default class App extends Component {

    componentWillMount(){
        document.body.style = 'margin: 0;'
    }

    determineSite(){
        var site = '';
        if(location.href.substring(0, 4) === 'http') {
            site = location.href.split('/')[3];
            site = site.split('?')[0];
        }
        else{
            site = location.href.split('/')[1];
        }
        switch(site){
            case 'League%20of%20Legends': return 'League';
            case 'Twitch': return 'Twitch';
            case 'Activation': return 'Activation';
            case 'About': return 'Home';
            default: return 'Runescape';
        }
    }

    render() {
        return (
                <Router>
                    <div>
                        <Navbar site={this.determineSite()}/>
                        <div>
                            <RouteProvider/>
                        </div>
                        <Footer site={this.determineSite()}/>
                    </div>
                </Router>
                );
    }
}


