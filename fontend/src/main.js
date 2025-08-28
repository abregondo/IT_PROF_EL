import axios from "axios";
import "./style.css";

const app = document.querySelector("#app");

// API base URL
const apiBase = "http://localhost:3000/api";

// Create the form and list container
app.innerHTML = `
  <h1>Users App</h1>
  <form id="userForm">
    <input type="text" id="name" placeholder="Enter name" required />
    <input type="email" id="email" placeholder="Enter email" required />
    <button type="submit">Add User</button>
  </form>
  <h2>Users List</h2>
  <ul id="usersList"></ul>
`;

// Fetch and render all users
async function fetchUsers() {
  const res = await axios.get(`${apiBase}/users`);
  const users = res.data;

  const list = document.querySelector("#usersList");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email}`;
    list.appendChild(li);
  });
}

// Handle form submit with axios.post
document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  await axios.post(`${apiBase}/adduser`, { name, email });

  // Refresh user list
  fetchUsers();

  // Clear the form fields
  e.target.reset();
});

// Load users when page loads
fetchUsers();

