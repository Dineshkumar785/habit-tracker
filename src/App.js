import React, { useState } from "react";
import "./App.css";

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim() === "") return; // Avoid empty entries
    setHabits([...habits, { name: newHabit, done: false }]);
    setNewHabit("");
  };

  // Edit an existing habit
  const editHabit = (index, newName) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, name: newName } : habit
    );
    setHabits(updatedHabits);
  };

  // Update the habit's "done" status
  const onUpdateStatus = (index, status) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, done: status } : habit
    );
    setHabits(updatedHabits);
  };

  // Delete a habit
  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
  };

  return (
    <div className="app">
      <h1 className="title">Habit Tracker</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add</button>
      </div>
      <div className="categories">
        <Category
          title="Not Done"
          habits={habits.filter((habit) => !habit.done)}
          onEdit={editHabit}
          onUpdateStatus={onUpdateStatus}
          onDelete={deleteHabit}
        />
        <Category
          title="Done"
          habits={habits.filter((habit) => habit.done)}
          onEdit={editHabit}
          onUpdateStatus={onUpdateStatus}
          onDelete={deleteHabit}
        />
      </div>
    </div>
  );
}

function Category({ title, habits, onEdit, onUpdateStatus, onDelete }) {
  return (
    <div className="category">
      <h2>{title}</h2>
      <ul>
        {habits.map((habit, index) => (
          <HabitCard
            key={index}
            habit={habit}
            index={index}
            onEdit={onEdit}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function HabitCard({ habit, index, onEdit, onUpdateStatus, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);

  const saveEdit = () => {
    onEdit(index, editName);
    setIsEditing(false);
  };

  return (
    <li className="habit-card">
      {isEditing ? (
        <div className="edit-section">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="habit-info">
          <span>{habit.name}</span>
          <div className="actions">
            <select
              value={habit.done ? "done" : "not-done"}
              onChange={(e) =>
                onUpdateStatus(index, e.target.value === "done")
              }
            >
              <option value="not-done">Not Done</option>
              <option value="done">Done</option>
            </select>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default App;
