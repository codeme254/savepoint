import React, { useState } from "react";
import supabase from "../supabase";

interface Platform {
  name: string;
}

const platforms: Platform[] = [
  { name: "YouTube" },
  { name: "Twitter" },
  { name: "Facebook" },
  { name: "LinkedIn" },
  { name: "Medium" },
  { name: "Reddit" },
  { name: "GitHub" },
  { name: "Wikipedia" },
  { name: "Pinterest" },
  { name: "Stackoverflow" },
  { name: "Other" },
];
export default function NewItemForm() {
  const [formIsActive, setFormIsActive] = useState(false);
  const [platform, setPlatform] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCloseForm(e: React.MouseEvent) {
    e.preventDefault();
    setFormIsActive(false);
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setLoading(true);
    if (!title || !platform || !url || !description) return;
    const newBookmark = { platform, title, url, description };
    const { data, error } = await supabase
      .from("BookMarks")
      .insert([newBookmark]);
    if (error) {
      console.log(error);
    } else {
      console.log("Success");
      console.log(data);
    }
    setPlatform("");
    setTitle("");
    setUrl("");
    setDescription("");
    setLoading(false);
  }
  if (formIsActive) {
    return (
      <form action="" className="new-item-form">
        <div className="form-group">
          <label htmlFor="platform" className="form-group-label">
            platform
          </label>
          <select
            id="platform"
            className="form-group-input"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">--Select platform--</option>
            {platforms.map((item, i) => (
              <option value={item.name} key={i}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title" className="form-group-label">
            title
          </label>
          <input
            type="text"
            id="title"
            className="form-group-input"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url" className="form-group-label">
            url
          </label>
          <input
            type="url"
            id="url"
            className="form-group-input"
            placeholder="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-group-label">
            Description
          </label>
          <textarea
            id="description"
            placeholder="description"
            className="form-group-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-buttons">
          <button className="form-btn" onClick={handleSubmit}>
            {loading ? "Please wait..." : "Submit"}
          </button>
          <button className="form-btn cancel-btn" onClick={handleCloseForm}>
            cancel
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <button className="new-item-btn" onClick={() => setFormIsActive(true)}>
        Add new item
      </button>
    );
  }
}
