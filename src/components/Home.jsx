import React from 'react'
import { Link } from 'react-router-dom'
import bg from "../assets/wave-haikei.svg"
import bg2 from "../assets/bg1.svg"
function Home() {
  return (
    <div className='Home'>
      
      <div className='Hero'>
        <div className='NavBar'>
          <p>Logo.</p>
          <div className="innerNavBarMenu">
            <Link to={"/register"}>Signup</Link>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
        <div className='CTAHolder'>
          <h1>Take Your Business To a New Level</h1>
          <Link to={"/register"}>Get Your Free Trail</Link>
        </div>
      </div>
      
      <div className='AboutUs' style={{backgroundImage : `url(${bg2})`}}>
        <div className='innerAboutUsTextHolder' >
          <h1>About Us</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. galley of type and scshas survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>
        <img src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4' alt='myapp'></img>
      </div>

      <div className='ContactUs' >
        
        <form className="inputsHolderInsideContact" style={{backgroundImage : `url(${bg})`}}>
          <h1>Contact Us</h1>
          <div>
            <label>Username</label>
            <input placeholder='type username...' required ></input>
          </div>
          <div>
            <label>Email</label>
            <input placeholder='type email...' required ></input>
          </div>
          <div>
            <label>Message</label>
            <textarea placeholder='type message...'></textarea>
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Home