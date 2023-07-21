import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GreatNovels.css"

function GreatNovels() {
  const [search, setSearch] = useState("");
  const [novels, setNovels] = useState([]);
  const [filteredNovels, setFilteredNovels] = useState([]);

  useEffect(() => {
    const fetchNovels = async () => {
      let fetch = await axios.get("http://localhost:1337/api/novels");
      console.log(fetch.data);

      setNovels(fetch.data);
      setFilteredNovels(fetch.data);
    };
    fetchNovels();
  }, []);

  useEffect(() => {
    setFilteredNovels(
      novels.filter((novel) => {
        if (novel.title.toLowerCase().includes(search.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [search]);

  const renderNovels = filteredNovels.map((novel) => {
    return (
      <div>
        {novel.title} by {novel.author.nameFirst} {novel.author.nameLast}
      </div>
    );
  });

  return (
    <div className="page">
      <h1 className="title">Great Novels</h1>
      <input
        type="text"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      ></input>
      <div className="novelsList">{renderNovels}</div>
    </div>
  );
}

export default GreatNovels;
