import React, { Component } from "react";
//import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
const token = localStorage.getItem("token");
//create the Navbar Component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: "",
      where: "",
      guests: "",
      enddate: "",
      fname: this.props.fname,
      lname: this.props.fname,
      lyp: "#",
      results: [],
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleArriveChange = this.handleArriveChange.bind(this);
    this.handleDepartChange = this.handleDepartChange.bind(this);
    this.handleWhereChange = this.handleWhereChange.bind(this);
    this.handleGuestsChange = this.handleGuestsChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  componentDidMount() {
    console.log("TOKEN HOME:", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/photos/profile", {
          params: {
            email: sessionStorage.getItem("email")
          }
        })
        .then(response => {
          //update the state with the response data
          console.log("Image Res : ", response);
          let imagePreview = "data:image/jpg;base64, " + response.data;
          this.setState({
            profileicon: imagePreview
          });
        });
      this.props.onGetRender();
    }
  }

  startSearch = e => {
    //prevent page from refresh
    e.preventDefault();
  };

  handleArriveChange(date) {
    this.setState({
      startdate: date
    });
  }

  handleWhereChange = e => {
    this.setState({
      where: e.target.value
    });
  };

  handleGuestsChange = e => {
    this.setState({
      guests: e.target.value
    });
  };

  handleDepartChange(date) {
    this.setState({
      enddate: date
    });
  }

  //handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    var sdate = new Date(this.state.startdate);
    var year = sdate.getFullYear();
    var month = ("0" + (sdate.getMonth() + 1)).slice(-2);
    var day = ("0" + sdate.getDate()).slice(-2);
    var sd = `${year}-${month}-${day}`;

    var edate = new Date(this.state.enddate);
    var year = edate.getFullYear();
    var month = ("0" + (edate.getMonth() + 1)).slice(-2);
    var day = ("0" + edate.getDate()).slice(-2);
    var ed = `${year}-${month}-${day}`;

    // const newTo = {
    //   pathname: `/home/search?=${this.state.where}/${sd}/${ed}/${
    //     this.state.guests
    //   }`
    // };
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (token) {
      console.log("Able to read cookie");

      navLogin = (
        <div class="wrappernav-home">
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
            rel="stylesheet"
          />
          <a href="#" class="flag-icon-background flag-icon-us flag inline">
            {"   "}
          </a>
          <a href="#" class=" bluefont-home inline">
            Trip Boards
          </a>
          <div class="btn-group inline dropdownnav">
            <div
              class="btn-home inline bluefont-home"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={this.state.profileicon} class="smallimg" />
              {"   "}
              {this.props.fname} {String(this.props.lname).charAt(0) + "."}{" "}
              <span class="glyphicon glyphicon-triangle-bottom smallicon" />
            </div>
            <ul class="dropdown-menu dropdown-menu-right bluefont">
              <li>
                {" "}
                <a class="dropdown-item bluefont" href="/inbox">
                  <p class="bluefont">
                    <span class=" glyphicon glyphicon-envelope dropdownicons bluefont" />
                    {"   "}
                    Inbox
                  </p>
                </a>
              </li>
              <br />
              <li>
                <a class="dropdown-item" href="/dashboard">
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-briefcase dropdownicons" />{" "}
                    {"   "}
                    Dashboard
                  </p>
                </a>
              </li>
              <br />
              <li>
                <Link
                  to={{
                    pathname: "/profile",
                    state: {
                      fname: this.props.fname,
                      lname: this.props.lname,
                      abt: this.props.abt,
                      city_cntry: this.props.city_cntry,
                      company: this.props.company,
                      school: this.props.school,
                      hometown: this.props.hometown,
                      languages: this.props.languages,
                      gender: this.props.gender,
                      phone: this.props.phone,
                      photoname: this.props.photoname
                    }
                  }}
                  class="dropdown-item"
                >
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-user dropdownicons" />
                    {"   "}
                    My Profile
                  </p>
                </Link>
              </li>
              <br />
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-cog dropdownicons" />
                    {"   "} Account
                  </p>
                </a>
              </li>
              <li role="separator" class="divider dropdownicons" />

              <li>
                <a
                  class="dropdown-item"
                  href="/home"
                  onClick={this.handleLogout}
                >
                  <p class="bluefont">
                    <span class="glyphicon glyphicon-log-out dropdownicons" />{" "}
                    {"   "}
                    Logout
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <a href="/inbox" class="bluefont-home">
            <span
              class="glyphicon-glyphicon-envelope envelope inline bluefont-home"
              aria-hidden="true"
            >
              <i class="fa fa-envelope bluefont-home " aria-hidden="true">
                {"  "}
              </i>
            </span>
          </a>

          <div class="btn-group userdd bluefont-home inline dropdownnav">
            <div
              class="btn-home inline bluefont-home"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Help{" "}
              <span class="glyphicon glyphicon-triangle-bottom smallicon" />
            </div>
            <ul class="dropdown-menu dropdown-menu-right bluefont">
              <li>
                {" "}
                <a class="dropdown-item " href="#">
                  <p class="bluefont">
                    {"   "}
                    Visit help center
                  </p>
                </a>
              </li>
              <li role="separator" class="divider dropdownicons" />

              <li class="dropdown-header travelersfont">
                <b>Travelers</b>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    How it works
                  </p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {"   "}
                    Security Center
                  </p>
                </a>
              </li>
            </ul>
          </div>

          <a
            href={
              sessionStorage.getItem("typeofaccount") == "owner" ? "/lyp" : "#"
            }
            class="buttonlyp default bluefont inline"
          >
            List your property
          </a>
          <div class="homeawayimg-home inline">
            <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" />
          </div>
        </div>
      );
    } else {
      //Else display login button
      navLogin = (
        <div class="wrappernav-home-nli">
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
            rel="stylesheet"
          />
          <a href="#" class="flag-icon-background flag-icon-us flag inline">
            {"   "}
          </a>
          <a href="#" class=" bluefont-home inline">
            Trip Boards
          </a>
          <div class="btn-group inline dropdownnav">
            <div
              class=" btn-home inline  bluefont-home"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {"   "}
              Login{" "}
              <span class="glyphicon glyphicon-triangle-bottom smallicon" />
            </div>
            <ul class="dropdown-menu dropdown-menu-right bluefont">
              <li>
                {" "}
                <a class="dropdown-item " href="/login">
                  <p class="bluefont">Traveler Login</p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/ownerLogin">
                  <p class="bluefont">Owner Login</p>
                </a>
              </li>
            </ul>
          </div>

          <div class="btn-group userdd bluefont inline dropdownnav">
            <div
              class="btn-home inline bluefont-home"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Help{" "}
              <span class="glyphicon glyphicon-triangle-bottom smallicon" />
            </div>
            <ul class="dropdown-menu dropdown-menu-right bluefont">
              <li>
                {" "}
                <a class="dropdown-item " href="#">
                  <p class="bluefont">
                    {"   "}
                    Visit help center
                  </p>
                </a>
              </li>
              <li role="separator" class="divider dropdownicons" />

              <li class="dropdown-header travelersfont">
                <b>Travelers</b>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    How it works
                  </p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {"   "}
                    Security Center
                  </p>
                </a>
              </li>
              <li role="separator" class="divider dropdownicons" />

              <li class="dropdown-header travelersfont">
                <b>Home Owners</b>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    How it works
                  </p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    List your property
                  </p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    Community
                  </p>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    Discovery Hub
                  </p>
                </a>
              </li>
              <li class="dropdown-header travelersfont">
                <b>Property managers</b>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <p class="bluefont">
                    {" "}
                    {"   "}
                    List your properties
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <button class="buttonlyp default bluefont inline">
            List your property
          </button>
          <div class="homeawayimg-home inline">
            <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" />
          </div>
        </div>
      );
    }
    let redirectVar = null;

    return (
      <div>
        {/* {redirectVar} */}

        <div class="homebg">
          <div class="header-bce-home bluefont-home">
            <div id="hal-home" class="navbar-brand bluefont-home">
              <a href="/home" class="bluefont-home">
                HomeAway
                <span class="sup">&reg;</span>
              </a>
            </div>
            <div class="" />
            <div class="homesearch">
              <h1 class="HeadLine">
                <span class="HeadLine__text">Book beach houses, cabins,</span>
                <span class="HeadLine__text">condos and more, worldwide</span>
              </h1>
              <div class="flex-container">
                <div class="inner-addon left-addon">
                  <i class="glyphicon glyphicon-map-marker" />
                  <input
                    type="search"
                    class="searchfields largesearch"
                    placeholder=" Where do you want to go?"
                    value={this.state.where}
                    onChange={this.handleWhereChange}
                  />
                </div>

                <div class="inner-addon left-addon">
                  <div id="gly">
                    <i class="glyphicon glyphicon-calendar" />{" "}
                  </div>
                  <div>
                    <DatePicker
                      className="searchfields smallsearch datepickercss"
                      placeholderText=" Arrive"
                      selected={this.state.startdate}
                      onChange={this.handleArriveChange}
                      minDate={moment()}
                    />
                  </div>
                </div>

                <div class="inner-addon left-addon">
                  <div id="gly2">
                    <i class="glyphicon glyphicon-calendar" />{" "}
                  </div>
                  <div>
                    <DatePicker
                      className="searchfields smallsearch datepickercss"
                      placeholderText=" Depart"
                      selected={this.state.enddate}
                      onChange={this.handleDepartChange}
                      minDate={this.state.startdate}
                    />
                  </div>
                </div>
                <div class="inner-addon left-addon">
                  <i class="glyphicon glyphicon-user" />{" "}
                  <input
                    type="number"
                    class="searchfields smallsearch"
                    placeholder=" Guests"
                    value={this.state.guests}
                    onChange={this.handleGuestsChange}
                    step="1"
                    min="1"
                  />
                </div>

                <Link
                  to={{
                    pathname: "/searchresults",
                    state: {
                      where: this.state.where,
                      startdate: sd,
                      enddate: ed,
                      guests: this.state.guests,
                      fname: this.props.fname,
                      lname: this.props.lname
                    }
                  }}
                  className="searchfields smallsearch homesearchbutton"
                >
                  <p class="srch">Search</p>
                </Link>
              </div>
              <div class="flex-container2">
                <ul class="ValueProps__list">
                  <li class="ValueProps__item">
                    <strong class="ValueProps__title">
                      Your whole vacation starts here
                    </strong>
                    <span class="ValueProps__blurb">
                      Choose a rental from the world's best selection
                    </span>
                  </li>
                  <li class="ValueProps__item">
                    <strong class="ValueProps__title">
                      Book and stay with confidence
                    </strong>
                    <span class="ValueProps__blurb">
                      <a class="blurba" href="#">
                        <u> Secure payments, peace of mind</u>
                      </a>
                    </span>
                  </li>
                  <li class="ValueProps__item">
                    <strong class="ValueProps__title">
                      Your vacation your way
                    </strong>
                    <span class="ValueProps__blurb">
                      More space, more privacy, no compromises
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------CAROUSEL------------------*/}

        <div class="container carouselplace">
          <strong class="ptw">Trending Destinations</strong>
          <br />
          <span class="etd">Explore this week's most searched places</span>
          <br />
          <br />

          <div class="row">
            <div class="col-md-12">
              <div id="Carousel" class="carousel slide">
                <ol class="carousel-indicators">
                  <li
                    data-target="#Carousel"
                    data-slide-to="0"
                    class="active"
                  />
                  <li data-target="#Carousel" data-slide-to="1" />
                  <li data-target="#Carousel" data-slide-to="2" />
                </ol>

                <div class="carousel-inner">
                  <div class="item active">
                    <div class="row">
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/56d73b61-1f5a-4090-8359-24895c545e5e.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Maui</div>
                          <div class="state">Hawaii</div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/d41b04fd-4c3b-4351-af6f-cc468b71ebe7.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Myrtle Beach</div>
                          <div class="state">South Carolina</div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/f41c17cd-a595-4e55-8c4c-212e0132f236.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">San Diego</div>
                          <div class="state">California</div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/93c6235b-8531-4459-8913-aabb47fa7bb5.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Gatlinburg</div>
                          <div class="state">Tennessee</div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <div class="row">
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/03dc5f84-db9b-4fb1-a952-a250e9b69344.hw6.jpg"
                              alt="Image"
                            />
                            <div class="place">Orlando</div>
                            <pdiv class="state">Florida</pdiv>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/152e6ed0-faa8-4a48-b36a-ed0f527b68ec.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Panama City Beach</div>
                          <div class="state">Florida</div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/d87e4c30-b5f1-4a30-bb12-7883a29cabbc.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Destin</div>
                          <div class="state">Florida</div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/aebc04da-3591-4ea4-bfe8-f5ea726a4447.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">New York</div>
                          <div class="state">New York</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  data-slide="prev"
                  href="#Carousel"
                  role="button"
                  class="left carousel-control"
                >
                  {" "}
                  <div class="ccl"> ‹</div>
                </a>

                <a
                  data-slide="next"
                  href="#Carousel"
                  class="right carousel-control"
                >
                  <div class="ccr"> ›</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------CAROUSEL------------------*/}

        <button class="lypbg">
          <div class="lyptext">
            <center>
              {" "}
              <div>
                List your property on HomeAway and open your
                <br />
                door to rental income
              </div>
              <div>
                <br />
                <br />
                <button
                  type="button"
                  class="lypbtn"
                  placeholder="Search"
                  value="search"
                >
                  List Your Property
                </button>
              </div>
            </center>
          </div>
        </button>
        {/* ----------------CAROUSEL2------------------*/}

        <div class="container carouselplace2">
          <strong class="ptw">Traveler Favorites</strong>

          <br />
          <br />

          <div class="row">
            <div class="col-md-12">
              <div id="Carousel2" class="carousel slide">
                <ol class="carousel-indicators">
                  <li
                    data-target="#Carousel2"
                    data-slide-to="0"
                    class="active"
                  />
                  <li data-target="#Carousel2" data-slide-to="1" />
                  <li data-target="#Carousel2" data-slide-to="2" />
                </ol>

                <div class="carousel-inner">
                  <div class="item active">
                    <div class="row">
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/4718009b-104c-491f-80df-178843510727.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Mountain Cabins</div>
                          <div class="state bluefont">
                            <a>Asheville</a>, <a>Breckenridge</a>,{" "}
                            <a>Gatlinburg</a>, <a>Lake Tahoe</a>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/436cff9d-de89-4a39-9a12-a55d5fc9d4bc.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Austin Area</div>
                          <div class="state">
                            <a> Dripping Springs</a>, <a> New Braunfels</a>,{" "}
                            <a>Fredericksburg</a>, <a>Marble Falls</a>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/84d68ca4-165b-476a-82f0-f0e05dd630ca.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">The Gulf Coast</div>
                          <div class="state">
                            {" "}
                            <a>Orange Beach</a>, <a>South Padre Island</a>,{" "}
                            <a>Galveston</a>, <a>Dauphin Island</a>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/a4e310af-4b6a-4bd0-bf4b-46227fb98afd.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">California Hot Spots</div>
                          <div class="state">
                            {" "}
                            <a>San Francisco</a>, <a>San Diego</a>,{" "}
                            <a>Long Beach</a>, <a>Santa Barbara</a>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="item">
                    <div class="row">
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/19b96fb6-132d-4955-80cc-2c9f22486907.hw6.jpg"
                              alt="Image"
                            />
                            <div class="place">Cities</div>
                            <pdiv class="state">
                              {" "}
                              <a>Los Angeles</a>, <a>San Diego</a>,{" "}
                              <a>New York City</a>, <a>Austin</a>
                            </pdiv>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/29011384-9b14-4701-b736-3b8b9e462c38.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Ease Coast Beaches</div>
                          <div class="state">
                            {" "}
                            <a>Hilton Head</a>, <a>Outer Banks</a>,{" "}
                            <a>Ocean City </a>, <a>Virginia Beach</a>,{" "}
                            <a>Myrtle Beach</a>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/4718009b-104c-491f-80df-178843510727.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Mountain Cabins</div>
                          <div class="state bluefont">
                            <a>Asheville</a>, <a>Breckenridge</a>,{" "}
                            <a>Gatlinburg</a>, <a>Lake Tahoe</a>
                          </div>
                        </a>
                      </div>
                      <div class="col-md-3">
                        <a href="#" class="thumbnail noborder">
                          <div class="imgBox">
                            <img
                              src="https://odis.homeaway.com/odis/destination/436cff9d-de89-4a39-9a12-a55d5fc9d4bc.hw6.jpg"
                              alt="Image"
                            />
                          </div>
                          <div class="place">Austin Area</div>
                          <div class="state">
                            <a> Dripping Springs</a>, <a> New Braunfels</a>,{" "}
                            <a>Fredericksburg</a>, <a>Marble Falls</a>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  data-slide="prev"
                  href="#Carousel2"
                  role="button"
                  class="left carousel-control"
                >
                  {" "}
                  <div class="ccl"> ‹</div>
                </a>

                <a
                  data-slide="next"
                  href="#Carousel2"
                  class="right carousel-control"
                >
                  <div class="ccr"> ›</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ----------------CAROUSEL------------------*/}
        {navLogin}
      </div>
    );
  }
}

//export default Home;
const mapStateToProps = state => {
  console.log("Statetoprops: ", state.login);
  return {
    fname: state.login.fname,
    lname: state.login.lname,
    abt: state.login.abt,
    city_cntry: state.login.city_cntry,
    company: state.login.company,
    school: state.login.school,
    hometown: state.login.hometown,
    languages: state.login.languages,
    gender: state.login.gender,
    phone: state.login.phone,
    photos: state.login.photos
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    onGetRender: cb => {
      console.log("TOKENH ", localStorage.getItem("token"));

      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/home", {
          params: {
            email: sessionStorage.getItem("email")
          }
        })
        .then(response => {
          dispatch({
            type: "HOME",
            payload: response.data,
            statusCode: response.status
          });
          //update the state with the response data
          console.log("Data  HOME: ", response.data);
        });
    }
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Home);
