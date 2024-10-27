import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const getLocleData = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const TodoApp = () => {
  const [inputValue, setInpuValue] = useState();
  const [saveValue, setSaveValue] = useState(getLocleData());

  const addTask = (e) => {
    console.log("addTask");
    e.preventDefault();
    setSaveValue([...saveValue, inputValue]);
    setInpuValue("");
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setInpuValue(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(saveValue));
  }, [saveValue]);

  // edit Button
  const handleEdit = (indexToEdit) => {
    const currentValue = saveValue[indexToEdit];

    Swal.fire({
      title: "Edit Task",
      input: "text",
      inputLabel: "New Task Value",
      inputValue: currentValue, // pre-fill the input with the current value
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
      buttonsStyling: false,
      preConfirm: (newValue) => {
        if (!newValue) {
          Swal.showValidationMessage("Please enter a value");
        }
        return newValue;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const editedValue = result.value; // Get the new value from the result

        // Show a success alert
        Swal.fire({
          title: "Updated!",
          // text: 'Your task has been updated.',
          icon: "success",
        });

        // Update the saveValue array
        let newValue = [...saveValue];
        newValue[indexToEdit] = editedValue; // Replace the old value with the new one
        setSaveValue(newValue);
      }
    });
  };

  //delet Button
  const handleDelete = (indexToDelete) => {
    const taskToDelete = saveValue[indexToDelete];
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!  ${taskToDelete}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
      buttonsStyling: false, // disables SweetAlert2 default button styling so custom styles can apply
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });

        let newvalue = [...saveValue];
        newvalue.splice(indexToDelete, 1);
        setSaveValue(newvalue);
      }
    });
  };

  return (
    <form onSubmit={addTask}>
      <div className="todo-container">
        <h2>My To-Do List</h2>
        <div className="input-container">
          <input onChange={handleChange} value={inputValue} type="text" placeholder="Add a new task..." />

          <button type="submit" className="submitBtn">
            <i className="fas fa-plus"></i> Add Task
          </button>
        </div>
        <ul className="task-list">
          {saveValue.map((value, index) => (
            <li key={index}>
              <span>
                <i className="far fa-circle"></i> {value}
              </span>
              <div className="task-buttons">
                <i onClick={() => handleEdit(index)} className="fas fa-edit"></i>
                <i onClick={() => handleDelete(index)} className="fas fa-trash"></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};
export default TodoApp;
