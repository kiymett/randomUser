import React, { useEffect } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState } from 'react'


function App() {
  const url = "https://randomuser.me/api/";
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
  const [user, setUser] = useState({
    name: "",
    email: "",
    picture: "",
    dob: "",
    phone: "",
    location: "",
    password: ""
  })

  const [content, setContent] = useState("")
  const [paragraph, setParagraph] = useState("")
  const [allUser, setAllUser] = useState([])

  const addUser = () => {
    setAllUser([...allUser, { first: user.name.first, email, phone: user.phone, age: user.dob.age }])
    console.log(allUser)
  }



  const getUser = () => {
    axios(url)
      .then((res) => {
        setUser(res.data.results[0]);
        setContent('name');
        setParagraph(`${res.data.results[0].name.first} ${res.data.results[0].name.last}`)
      })
      .catch((error) => console.log(error))
    console.log("click ")
  }

  console.log(user)


  // const getUser = () => {
  //   axios(url)
  //   .then((res) =>(setUser(res.data.results[0]))).then(()=>getName())
  //   .catch((error)=>console.log(error))
  //   console.log("click ")
  // }
  // console.log(user)
  //? componentDidMount (wenn die Seite geladen wird, dann sollte ein User direkt kommen)

  const {
    name: { first, last },
    email,
    picture: { large },
    dob: { age },
    location: { city, state },
    phone,
  } = user

  useEffect(() => {
    getUser()

  }, [])

  // const addUser = () => {
  //   setNameTable(`${name.first}`) 
  //   setEmailTable(`${email}`) 
  //   setPhoneTable(`${phone}`)
  //   setAgeTable(`${user.dob.age}`)  
  // }



  const getName = () => {
    setContent('name');
    setParagraph(`${first} ${last}`)
  }

  const getEmail = () => {
    setContent('email');
    setParagraph(`${email}`)
  }

  const getAge = () => {
    setContent('age');
    setParagraph(`${user.dob.age}`)
  }

  const getPhone = () => {
    setContent('phone');
    setParagraph(`${user.phone}`)
  }

  const getStreet = () => {
    setContent('street');
    setParagraph(`${state}`)
  }

  const getPassword = () => {
    setContent('password');
    setParagraph(`${user.login.password}`)
  }


  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={large} alt="random user" className="user-img" />
          <p className="user-title">My {content} is</p>
          <p className="user-value">{paragraph}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseEnter={getName}>
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email" onMouseEnter={getEmail}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseEnter={getAge}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onMouseEnter={getStreet}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onMouseEnter={getPhone}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password" onMouseEnter={getPassword}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUser} >
              add user
            </button>
          </div>
          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>

            <tbody>
              {allUser.map((item, i) => (
                <tr key={i} className="body-tr">
                  <td>{item.first}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.age}</td>
                </tr>
              ))}

            </tbody>
          </table>


        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;