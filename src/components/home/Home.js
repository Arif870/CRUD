import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();

  const userHandaler = e => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const image = imageRef.current.value;
    const newUser = { name, email, image };

    //   POST method

    fetch("https://vast-garden-39823.herokuapp.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          alert("Data Added successfull");
          nameRef.current.value = "";
          emailRef.current.value = "";
          imageRef.current.value = "";
        }
      });
  };

  useEffect(() => {
    fetch("https://vast-garden-39823.herokuapp.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  }, [users]);

  // DELETE

  const deleteHandaler = id => {
    const procedd = window.confirm("Do you really want ot delete ?");
    if (procedd) {
      const uri = `https://vast-garden-39823.herokuapp.com/users/${id}`;
      fetch(uri, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            alert("Data deleted successfull");
          }
        });
    }
  };

  return (
    <div className="home">
      <div className="crud">
        <div className="new-user-sec">
          <h1>Add new user</h1>
          <form>
            <input ref={nameRef} type="text" placeholder="Name" />
            <input ref={emailRef} type="text" placeholder="Email" />

            <input ref={imageRef} type="text" placeholder="Image Link" />
            <input onClick={userHandaler} type="submit" value="Add user" />
          </form>
        </div>
        <div style={{ width: "90%", margin: "auto" }}>
          <h1>Our Employees</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <h2 style={{ color: "yellow" }}>Loading...</h2>
              ) : (
                users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <img src={user.image} alt="" />
                    </td>
                    <td>
                      <p>{user.name}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>
                      <div className="details">
                        <Link to={`/users/view/${user._id}`}>
                          <p className="edit">View</p>
                        </Link>

                        <Link to={`/users/update/${user._id}`}>
                          <p className="update">Update</p>
                        </Link>

                        <p
                          onClick={() => deleteHandaler(user._id)}
                          className="delete"
                        >
                          Delete
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
