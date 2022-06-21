import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./View.css";

const View = () => {
  const id = useParams().id;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const uri = `https://vast-garden-39823.herokuapp.com/users/${id}`;

    fetch(uri)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  return (
    <div className="view">
      <Link to="/">
        <button>Go to home</button>
      </Link>

      <div>
        <h1>Hello {users.name}</h1>
        <p>{users.email}</p>
      </div>
    </div>
  );
};

export default View;
