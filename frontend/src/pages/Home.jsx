import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await API.get("/notes/");
    setNotes(res.data);
  };

  const addNote = async () => {
    await API.post(`/notes/?title=${title}&content=${content}`);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Notes</h1>

      <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
      <input placeholder="Content" onChange={(e)=>setContent(e.target.value)} />
      <button onClick={addNote}>Add</button>

      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={()=>deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}