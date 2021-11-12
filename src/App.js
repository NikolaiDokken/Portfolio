import { useState, useEffect } from "react";

import db from "./utils/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [projects, setProjects] = useState([
    { title: "Loading", id: "Initial" },
  ]);

  useEffect(() => {
    getDocs(collection(db, "projects")).then((snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {projects.map((project) => (
          <div>{project.title}</div>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
