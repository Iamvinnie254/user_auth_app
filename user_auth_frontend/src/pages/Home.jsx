import React, { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  },[])

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => { setNotes(data); console.log(data) })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };


  const createNote = (e) => {
    e.preventDefault()
    api.post('/api/notes/', { content, title }).then((res) => {
      if (res.status === 201) alert('Note created!')
      else alert('Failed to make note!')
      getNotes()
    }).catch((err) => alert(err))
    
  }

  return (
    <div className="flex flex-col font-serif  w-full my-15 ">
      <div className="">
        <h2 className="text-4xl pb-10 font-serif text-center font-bold italic underline ">
          ~Notes~
        </h2>
        {notes.map((note) => (
          <Note
            note={note}
            onDelete={deleteNote}
            key={note.id}
            className="bg-[#f9f9f9] border border-black/30 mx-[10px] my-0 px-[10px] py-[15px] rounded-md"
          />
        ))}
      </div>

      <form
        action=""
        onSubmit={createNote}
        className="bg-white p-[20px] rounded-2xl shadow-lg max-w-[500px] m-auto text-center"
      >
        <h2 className=" text-[24px] mb-[20px] text-yellow-900">
          Create a Note
        </h2>
        <label htmlFor="title" className="font-bold mt-[10px] text-xl">
          Title:{" "}
        </label>
        <br />
        <input
          className="w-[100%] p-[8px] mt-[8px] mb-[16px] mx-0 border border-black rounded-lg"
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content" className="font-bold mt-[10px] text-xl">
          Content:
        </label>
        <br />
        <textarea
          className="w-[100%] p-[8px] mt-[8px] mb-[16px] mx-0 border border-black rounded-lg "
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input
          type="submit"
          value="submit"
          className="bg-[#007bff] hover:bg-[#0056b3] text-white py-[5px] px-[20px] border-none rounded-full box-border cursor-pointer text-lg"
        />
      </form>
    </div>
  );
  
};

export default Home;
