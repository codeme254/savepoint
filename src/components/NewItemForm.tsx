import React, { useState } from "react";

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

  function handleCloseForm(e: React.MouseEvent) {
    e.preventDefault();
    setFormIsActive(false);
  }
  if (formIsActive) {
    return (
        <form action="" className="new-item-form">
          <div className="form-group">
            <label htmlFor="platform" className="form-group-label">
              platform
            </label>
            <select id="platform" className="form-group-input">
              {platforms.map((platform, i) => (
                <option value={platform.name} key={i}>
                  {platform.name}
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
            ></textarea>
          </div>
          <div className="form-buttons">
            <button className="form-btn">submit</button>
            <button className="form-btn cancel-btn" onClick={handleCloseForm}>cancel</button>
          </div>
        </form>
      );
  } else {
    return <button className="new-item-btn" onClick={() => setFormIsActive(true)}>Add new item</button>
  }
  
}
