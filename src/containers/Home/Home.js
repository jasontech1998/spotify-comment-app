import React, { Component } from 'react';

import './Home.css';
import {loginUrl} from '../../spotify';
import Search from '../../components/Search/Search';
import Head from '../../components/Head/head';

import Lottie from 'react-lottie';
import animationData from '../../components/Images/audiowave';


class Home extends Component {
  render() {
    
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    let signOrSearch = (
      <div id="logInBtn">
        <button type="button" className="btn loginButton"><a href={loginUrl} id="logBtn">LOGIN WITH SPOTIFY</a></button>
      </div>
    );
    // if token is not null, render search bar
    if (this.props.token !== null) {
      signOrSearch = (
          <Search token={this.props.token}/>
      );
    }

    return (
      <div className="Home">
        <Head />
        <div className="appTitle">
          <svg id="AppLogo" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z" fill="#7E66D8"/>
            <path d="M39.3679 41.1976V41.1999C38.8943 41.1999 38.6003 41.0529 38.1593 40.7939C31.1149 36.5472 22.9179 36.3699 14.8213 38.0289C14.3803 38.1432 13.8039 38.3229 13.4773 38.3229C12.3806 38.3229 11.6923 37.4526 11.6923 36.5379C11.6923 35.3736 12.3806 34.8206 13.2299 34.6409C22.4769 32.5992 31.9269 32.7789 39.9863 37.5996C40.6746 38.0406 41.0829 38.4349 41.0829 39.4616C41.0829 40.4836 40.2803 41.1976 39.3679 41.1976Z" fill="#212121"/>
            <path d="M42.4083 33.7937H42.406C41.818 33.7937 41.4236 33.5347 41.0153 33.32C33.957 29.1433 23.4383 27.4587 14.077 29.9997C13.5356 30.1467 13.2416 30.2937 12.733 30.2937C11.5243 30.2937 10.5443 29.3113 10.5443 28.105C10.5443 26.8987 11.1323 26.096 12.2943 25.7694C15.4326 24.8874 18.6386 24.2317 23.3356 24.2317C30.6623 24.2317 37.7416 26.0494 43.3206 29.3697C44.2353 29.911 44.597 30.6133 44.597 31.5933C44.5853 32.809 43.638 33.7937 42.4083 33.7937Z" fill="#212121"/>
            <path d="M10.612 16.3288C14.5857 15.1644 19.0353 14.6138 23.8793 14.6138C32.1207 14.6138 40.7587 16.3288 47.0703 20.0108C47.9523 20.5194 48.5263 21.2194 48.5263 22.5611C48.5263 24.0964 47.2827 25.1908 45.9083 25.1908L45.906 25.1884C45.318 25.1884 44.9563 25.0414 44.4477 24.7474C36.4117 19.9501 22.036 18.7998 12.7353 21.3968C12.327 21.5088 11.8183 21.6884 11.277 21.6884C9.78601 21.6884 8.64734 20.5241 8.64734 19.0238C8.64734 17.4908 9.597 16.6228 10.612 16.3288Z" fill="#212121"/>
          </svg>
          <h1 id="appName" style={{marginBottom: "0px", marginLeft: "12px", lineHeight: "1.2"}}>PodSpot</h1>
        </div>
        <h4 id="bio">Listen, comment, and rate your favorite podcasts.</h4>
        <Lottie 
          options={defaultOptions}
          width={235}
          height={178.93}
          />
        <div style={{display: "flex", justifyContent: "center"}}>
          {signOrSearch}

        </div>
      </div>
    );
  }
}

export default Home;