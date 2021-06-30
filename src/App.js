import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { Navbar, Nav, Container } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
    this.aboutRef = React.createRef()
    this.projectsRef = React.createRef()
    this.skillsRef = React.createRef()
    this.experienceRef = React.createRef()
    this.getInTouchRef = React.createRef()
  }

  applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  }

  swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }

  componentDidMount() {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }
  aboutScroll = () => this.aboutRef.current.scrollIntoView()
  projectsScroll = () => this.projectsRef.current.scrollIntoView()
  skillsScroll = () => this.skillsRef.current.scrollIntoView()
  experienceScroll = () => this.experienceRef.current.scrollIntoView()
  GetInTouchScroll = () => this.getInTouchRef.current.scrollIntoView()

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" sticky="top" className="nav-bar">
          <Container>
            <Navbar.Brand href="#home">Linas Jonika</Navbar.Brand>
            <Nav>
              <Nav.Link onClick={this.aboutScroll}>About</Nav.Link>
              <Nav.Link onClick={this.projectsScroll}>Projects</Nav.Link>
              <Nav.Link onClick={this.skillsScroll}>Skills</Nav.Link>
              <Nav.Link onClick={this.experienceScroll}>Experience</Nav.Link>
              <Nav.Link onClick={this.getInTouchScroll}>GET IN TOUCH</Nav.Link>
            </Nav>
          </Container>

        </Navbar>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="col-md-12 mx-auto text-center language">
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$primaryLanguage,
                window.$secondaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$secondaryLanguage,
                window.$primaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-lithuania"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
        </div>
        <div ref={this.aboutRef}></div>
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <div ref={this.projectsRef}></div>
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <div ref={this.skillsRef}></div>
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <div ref={this.experienceRef}></div>
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
