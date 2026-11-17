
// Food items

let foods = JSON.parse(localStorage.getItem("foods")) || [
    {
        id: 1,
        name: "Pizza",
        price: 250,
        image: "https://placehold.co/200x130?text=Pizza"
    },
    {
        id: 2,
        name: "Burger",
        price: 120,
        image: "https://placehold.co/200x130?text=Burger"
    },
    {
        id: 3,
        name: "Biryani",
        price: 180,
        image: "https://placehold.co/200x130?text=Biryani"
    }
];

let currentUser = "";
let isAdmin = false;


// Save food items

function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}


// 1. CUSTOMER REGISTRATION

function register() {

    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (name == "" || email == "" || password == "") {
        alert("Enter all details");
    }
    else {

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let found = false;

        for (let user of users) {
            if (user.email == email) {
                found = true;
            }
        }

        if (found) {
            alert("Email already registered");
        }
        else {
            users.push({
                name: name,
                email: email,
                password: password
            });

            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration Successful");
        }
    }
}


// 2. CUSTOMER LOGIN

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = false;

    for (let user of users) {

        if (user.email == email &&
            user.password == password) {

            currentUser = user.name;
            found = true;
        }
    }

    if (found) {
        document.getElementById("message").innerHTML =
            "Welcome " + currentUser;

        alert("Login Successful");
    }
    else {
        alert("Invalid Email or Password");
    }
}


// Customer Logout

function logout() {

    currentUser = "";

    document.getElementById("message").innerHTML =
        "Please Login or Register";

    alert("Logged Out");
}


// 3. DISPLAY FOOD MENU

function displayFoods() {

    let menu = document.getElementById("foodMenu");

    menu.innerHTML = "";

    for (let food of foods) {

        menu.innerHTML += `
            <div class="food">

                <img src="${food.image}">

                <h3>${food.name}</h3>

                <p>Price: Rs.${food.price}</p>

                <button onclick="orderFood(${food.id})">
                    Order Now
                </button>

            </div>
        `;
    }

    displayAdminFoods();
}


// 4. PLACE FOOD ORDER

function orderFood(id) {

    if (currentUser == "") {
        alert("Please Login First");
        return;
    }

    let selectedFood;

    for (let food of foods) {

        if (food.id == id) {
            selectedFood = food;
        }
    }

    if (selectedFood) {

        document.getElementById("orderDetails").innerHTML =
            "Customer: " + currentUser +
            "<br>Food: " + selectedFood.name +
            "<br>Price: Rs." + selectedFood.price +
            "<br>Order Placed Successfully!";

        alert("Food Ordered Successfully");
    }
}


// ADMIN LOGIN

function adminLogin() {

    let name = document.getElementById("adminName").value;
    let password = document.getElementById("adminPassword").value;

    if (name == "admin" && password == "1234") {

        isAdmin = true;

        document.getElementById("adminSection").style.display = "block";

        document.getElementById("adminMessage").innerHTML =
            "Admin Login Successful";

        alert("Welcome Admin");
    }
    else {
        alert("Invalid Admin Details");
    }
}


// 5. ADMIN ADD FOOD ITEM

function addFood() {

    if (!isAdmin) {
        alert("Admin Login Required");
        return;
    }

    let name = document.getElementById("foodName").value;
    let price = Number(document.getElementById("foodPrice").value);
    let image = document.getElementById("foodImage").value;

    if (name == "" || price <= 0 || image == "") {
        alert("Enter valid food details");
    }
    else {

        foods.push({
            id: Date.now(),
            name: name,
            price: price,
            image: image
        });

        saveFoods();
        displayFoods();

        alert("Food Added Successfully");

        document.getElementById("foodName").value = "";
        document.getElementById("foodPrice").value = "";
        document.getElementById("foodImage").value = "";
    }
}


// 6. ADMIN UPDATE FOOD ITEM

function updateFood(id) {

    if (!isAdmin) {
        alert("Admin Login Required");
        return;
    }

    for (let food of foods) {

        if (food.id == id) {

            let newName = prompt("Enter New Food Name", food.name);
            let newPrice = prompt("Enter New Price", food.price);
            let newImage = prompt("Enter New Image URL", food.image);

            if (newName == null || newPrice == null ||
                newImage == null) {
                return;
            }

            if (newName.trim() == "" ||
                Number(newPrice) <= 0 ||
                newImage.trim() == "") {
                alert("Enter valid details");
                return;
            }

            food.name = newName;
            food.price = Number(newPrice);
            food.image = newImage;
        }
    }

    saveFoods();
    displayFoods();

    alert("Food Updated Successfully");
}


// 7. ADMIN DELETE FOOD ITEM

function deleteFood(id) {

    if (!isAdmin) {
        alert("Admin Login Required");
        return;
    }

    let confirmDelete = confirm("Do you want to delete this food?");

    if (confirmDelete) {

        foods = foods.filter(function(food) {
            return food.id != id;
        });

        saveFoods();
        displayFoods();

        alert("Food Deleted Successfully");
    }
}


// DISPLAY ADMIN FOOD ITEMS

function displayAdminFoods() {

    let list = document.getElementById("adminFoodList");

    list.innerHTML = "";

    for (let food of foods) {

        list.innerHTML += `
            <div class="food">

                <h3>${food.name}</h3>

                <p>Price: Rs.${food.price}</p>

                <button onclick="updateFood(${food.id})">
                    Update
                </button>

                <button onclick="deleteFood(${food.id})">
                    Delete
                </button>

            </div>
        `;
    }
}


// INITIAL DISPLAY

saveFoods();
displayFoods();
