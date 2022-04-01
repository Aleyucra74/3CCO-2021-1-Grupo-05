import React from 'react';

import NavBar from '../components/NavBar';
import '../styles/home.css';
import searchicon from '../images/searchicon2.png';
import logo from '../images/logo.png';

function Home(){
        return (
        <>
                <NavBar />
                <div class="container">
                <div class="wrap">
                        <div class="search">
                                <input type="text" class="searchTerm" placeholder="O que você está procurando?"/>
                                <button type="submit" class="searchButton">
                                        <img class="searchimg" src={searchicon} alt="" />
                                </button>
                        </div>
                        <div class="logo">
                                <img src={logo} alt="" />
                        </div>
                        <span>A evolução do trabalho começa pelas <b>pessoas</b> e sua <b>cultura</b>.</span>
                </div>        
                </div>
        </>
        )
}

export default Home;
