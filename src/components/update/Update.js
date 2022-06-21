import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import "./Update.css";

const Update = () => {
  const id = useParams().id;

  const [users, setusers] = useState({});

  useEffect(() => {
    const uri = `https://vast-garden-39823.herokuapp.com/users/${id}`;
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        setusers(data);
      });
  }, []);

  // nameupdate

  const nameUpdate = e => {
    const name = e.target.value;
    const updatedName = { name: name, email: users.email };
    setusers(updatedName);
  };

  // email update

  const emailUpdate = e => {
    const email = e.target.value;
    const updatedEmail = { name: users.name, email: email };
    setusers(updatedEmail);
  };

  // update

  const updateHandlar = e => {
    e.preventDefault();

    const uri = `https://vast-garden-39823.herokuapp.com/users/${id}`;
    fetch(uri, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          alert("Data updated successfull");
        }
      });
  };

  return (
    <div className="update" style={{ marginTop: "30px" }}>
      <Link to="/">
        <button>Go to home</button>
      </Link>
      <h1>Update Profile Info</h1>
      <form>
        <input onChange={nameUpdate} type="text" value={users.name || ""} />
        <input onChange={emailUpdate} type="email" value={users.email || ""} />
        <input onClick={updateHandlar} type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Update;
