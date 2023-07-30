import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import '../styles/home.css'
import Header from '../components/Header'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Shallow Frequent Swan</title>
        <meta property="og:title" content="Shallow Frequent Swan" />
      </Helmet>
      <Header/>
      <div className="home-hero">
        <img
          alt="image"
          src="/10888334_4592516.svg"
          loading="eager"
          className="home-image2"
        />
        <div className="home-container2">
          <h1 className="home-text">
            <span>
              Ensure Originality, Promote Integrity:
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <br></br>
            <span>Your Trusted Plagiarism Checker</span>
          </h1>
          <h2 className="home-text04">
            Detect Duplicate Content and Safeguard Academic Integrity
          </h2>
          <div className="home-btn-group1">
            <Link to="/new-scan" className="home-navlink button">
              Get Started
            </Link>
            <button className="home-button button">Learn More</button>
          </div>
          <span className="home-text05">
            <br></br>
            <br></br>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              volutpat turpis.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor.
              Lorem
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              ipsum dolor sit amet, consectetur adipiscing elit.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              Mauris luctus rutrum mi ut rhoncus. Integer in dignissim tortor.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home
