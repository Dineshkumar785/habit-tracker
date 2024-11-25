import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Habit Tracker App", () => {
  test("renders the Habit Tracker title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Habit Tracker/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("adds a new habit", () => {
    render(<App />);
    
    // Find input and button elements
    const inputElement = screen.getByPlaceholderText("Add a new habit...");
    const addButton = screen.getByText(/Add/i);
    
    // Add a new habit
    fireEvent.change(inputElement, { target: { value: "Learn React" } });
    fireEvent.click(addButton);

    // Check if the habit is displayed
    const habitElement = screen.getByText("Learn React");
    expect(habitElement).toBeInTheDocument();
  });

  test("marks a habit as done", () => {
    render(<App />);
    
    // Add a new habit
    const inputElement = screen.getByPlaceholderText("Add a new habit...");
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: "Workout" } });
    fireEvent.click(addButton);
    
    // Find the select dropdown and update the status
    const statusDropdown = screen.getByDisplayValue("Not Done");
    fireEvent.change(statusDropdown, { target: { value: "done" } });
    
    // Verify the habit appears under Done
    const doneHabit = screen.getByText("Workout");
    expect(doneHabit).toBeInTheDocument();
  });

  test("deletes a habit", () => {
    render(<App />);
    
    // Add a new habit
    const inputElement = screen.getByPlaceholderText("Add a new habit...");
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: "Read Books" } });
    fireEvent.click(addButton);
    
    // Delete the habit
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // Verify the habit is no longer displayed
    const deletedHabit = screen.queryByText("Read Books");
    expect(deletedHabit).toBeNull();
  });
});
