let students = JSON.parse(localStorage.getItem("students")) || [];

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

let editIndex = -1;

function displayStudents(studentList = students) {
    studentTableBody.innerHTML = "";

    studentList.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    Edit
                </button>
                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const rollNo = document.getElementById("rollNo").value.trim();
    const course = document.getElementById("course").value.trim();
    const year = document.getElementById("year").value;

    const student = {
        name: name,
        rollNo: rollNo,
        course: course,
        year: year
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    studentForm.reset();
    displayStudents();
});

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("rollNo").value = student.rollNo;
    document.getElementById("course").value = student.course;
    document.getElementById("year").value = student.year;

    editIndex = index;
}

function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchText) ||
        student.rollNo.toLowerCase().includes(searchText) ||
        student.course.toLowerCase().includes(searchText)
    );

    displayStudents(filteredStudents);
});

displayStudents();
