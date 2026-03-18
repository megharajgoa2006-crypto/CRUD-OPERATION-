let data = JSON.parse(localStorage.getItem("crudData")) || [];

function saveData() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let editIndex = document.getElementById("editIndex").value;

  if (name === "" || email === "") {
    alert("Please fill all fields");
    return;
  }

  if (editIndex === "") {
    // Create
    data.push({ name, email });
  } else {
    // Update
    data[editIndex] = { name, email };
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("crudData", JSON.stringify(data));
  clearForm();
  displayData();
}

function displayData() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <button class="action-btn edit" onclick="editData(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editData(index) {
  document.getElementById("name").value = data[index].name;
  document.getElementById("email").value = data[index].email;
  document.getElementById("editIndex").value = index;
}

function deleteData(index) {
  data.splice(index, 1);
  localStorage.setItem("crudData", JSON.stringify(data));
  displayData();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

// Load data on page load
displayData();