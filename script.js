// ===============================
// TO-DO LIST WITH LOCAL STORAGE
// ===============================

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);

            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

addTask.addEventListener("click", function() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    taskInput.value = "";

    displayTasks();
});

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask.click();
    }

});

displayTasks();


// ===============================
// PRODUCT LISTING
// ===============================

const products = [
    {
        name: "Student Laptop",
        category: "laptop",
        price: 55000,
        rating: 4.5
    },
    {
        name: "Gaming Laptop",
        category: "laptop",
        price: 85000,
        rating: 4.8
    },
    {
        name: "Smart Phone",
        category: "phone",
        price: 25000,
        rating: 4.3
    },
    {
        name: "Premium Phone",
        category: "phone",
        price: 45000,
        rating: 4.7
    },
    {
        name: "Wireless Mouse",
        category: "accessory",
        price: 1200,
        rating: 4.2
    },
    {
        name: "Bluetooth Headphones",
        category: "accessory",
        price: 3500,
        rating: 4.6
    }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const sortProducts = document.getElementById("sortProducts");

function displayProducts() {

    let filteredProducts = [...products];

    const category = categoryFilter.value;
    const sort = sortProducts.value;

    // Filter by category
    if (category !== "all") {
        filteredProducts = filteredProducts.filter(function(product) {
            return product.category === category;
        });
    }

    // Sort products
    if (sort === "low-high") {
        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });
    }

    if (sort === "high-low") {
        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    if (sort === "rating") {
        filteredProducts.sort(function(a, b) {
            return b.rating - a.rating;
        });
    }

    productList.innerHTML = "";

    filteredProducts.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price.toLocaleString("en-IN")}</p>
            <p>Rating: ⭐ ${product.rating}</p>
        `;

        productList.appendChild(card);
    });
}

categoryFilter.addEventListener("change", displayProducts);
sortProducts.addEventListener("change", displayProducts);

displayProducts();


// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
        formMessage.textContent = "Please enter your name.";
        formMessage.style.color = "red";
        return;
    }

    if (email === "") {
        formMessage.textContent = "Please enter your email.";
        formMessage.style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "red";
        return;
    }

    if (message === "") {
        formMessage.textContent = "Please enter your message.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "green";

    contactForm.reset();
});