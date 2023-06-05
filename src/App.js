import { useState } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
function App() {
  const [editingMember, setEditingMember] = useState();
  const [editingOrder, setEditingOrder] = useState();
  const initialMembers = [
    {
      name: "Gülin",
      email: "gulin@workintech.com.tr",
      role: "Frontend Instructor",
    },
    {
      name: "Ayşe",
      email: "ayse@workintech.com.tr",
      role: "Frontend Instructor",
    },
    {
      name: "Ali",
      email: "ali@workintech.com.tr",
      role: "Backend Instructor",
    },
  ];

  const [members, setMembers] = useState(initialMembers);

  function addMember(newMember) {
    axios
      .post("https://reqres.in/api/workintech", newMember)
      .then(function (response) {
        console.log("response", response.data);

        if (editingOrder !== undefined) {
          const updatedMembers = [...members];
          updatedMembers.splice(editingOrder, 1, response.data);
          setMembers(updatedMembers);
        } else {
          setMembers([...members, response.data]);
        }
        setEditingOrder();
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("editingOrder", editingOrder);
  }

  function editHelper(memberData, order) {
    setEditingMember(memberData);
    setEditingOrder(order);
  }

  return (
    <div className="App App-header">
      <h2>Üye Listesi</h2>
      <ul>
        {members.map((member, i) => {
          return (
            <li key={i}>
              <a className="App-link" href={`mailto:${member.email}`}>
                {member.name} - {member.role}
              </a>
              <button onClick={() => editHelper(member, i)}>Edit</button>
            </li>
          );
        })}
      </ul>
      <Form
        addMember={addMember}
        editMode={editingMember}
      />
    </div>
  );
}

export default App;
