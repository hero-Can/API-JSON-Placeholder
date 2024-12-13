let listUserContent = document.getElementById("user-content");
let postContent = document.getElementById("post-content");


listUserContent.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        clearButtonBorders()
        e.target.style.border ="3px solid #df0e97"
        deletePostInfos();
        getPostsByUserId(e.target.dataset.id);
    }
});

// Function to clear all borders from buttons
function clearButtonBorders() {
    let buttons = listUserContent.querySelectorAll('button');
    buttons.forEach((button) => {
        button.style.border = "none"; // Reset border for all buttons
    });
}

function deletePostInfos(){
    // Get all elements with the class `.post-infos` and remove them
    let postInfos = document.querySelectorAll(".post-infos");
    postInfos.forEach((post) => post.remove());
}

function getUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status <= 300) {
            let users = JSON.parse(request.responseText);
            for (const user of users) {
                // The element string
                let element = `<div class="user-infos">
                <button class="btn" data-id="${user.id}">${user.name}
                    <br>
                    <span>${user.email}</span>
                </button>
                </div>`;

                // Convert the string into a DOM element
                let tempDiv = document.createElement('div'); // Temporary container
                tempDiv.innerHTML = element.trim(); // Convert the string to DOM elements

                // Append the first child (the actual new element) to the parent
                listUserContent.appendChild(tempDiv.firstChild);
            }
        } else {
            alert(`Error: ${request.status} ${request.statusText}`)
        }
    }
}

getUsers()

function getPostsByUserId(id){
    let request = new XMLHttpRequest();
    request.open("GET",`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    request.send();
    request.onload = function () {
        if (request.status >= 200 && request.status <= 300) {
            let posts = JSON.parse(request.responseText);
            for (const post of posts) {
                // The element string
                let element = `<div class="post-infos">
                    <h3>${post.title}</h2>
                    <hr>
                    <p>${post.body}</p>
                </div>`;
                // Convert the string into a DOM element
                let tempDiv = document.createElement('div'); // Temporary container
                tempDiv.innerHTML = element.trim(); // Convert the string to DOM elements

                // Append the first child (the actual new element) to the parent
                postContent.appendChild(tempDiv.firstChild);
            }
          
        } else {
            alert(`Error: ${request.status} ${request.statusText}`)
        }
    }
}

