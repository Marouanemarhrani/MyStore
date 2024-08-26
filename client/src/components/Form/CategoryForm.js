import React from 'react';
import "./CategoryForm.css";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
     <form onSubmit = {handleSubmit}>
      <div className="catform mb-3">
        <input 
            type="text" 
            className="catform1 form-control"
            placeholder='Enter new category'
            value={value}
            onChange={(e) => setValue(e.target.value)} 
            />
        </div>
        <button type="submit" className="catform2 btn btn-primary">Submit</button>
      </form>

    </>
  );
};

export default CategoryForm;
