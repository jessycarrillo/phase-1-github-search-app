function searchUser(user) {
    const searchUrl = `https://api.github.com/search/users?q=${user}`;
    fetch(searchUrl, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(response => { return(response.json()) }) 
    .then(data => {
        const userData  = data.items;     
        handleUser(userData);       
    })
    .catch(error => {
        alert("Error fetching data:", error);
    });

}
function handleUser(userData) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; 
    const repoList = document.getElementById("repos-list");
    repoList.innerHTML = ""; 
    userData.forEach(user => {
        const listUsername = document.createElement("li");
        listUsername.textContent = user.login;
        userList.appendChild(listUsername);
        
        const listAvatarUrl = document.createElement("img");
        listAvatarUrl.setAttribute("width", "200");
        listAvatarUrl.src = user.avatar_url;
        userList.appendChild(listAvatarUrl);
        
        const profileLink = document.createElement("a");
        profileLink.href = user.html_url;
        profileLink.textContent = " View Profile ";
        profileLink.setAttribute("target", "_blank");
        userList.appendChild(profileLink);

        const repoButton = document.createElement("button");
        repoButton.textContent = "View Repositories";
        repoButton.addEventListener("click", () => {
            showRepos(user.login);
        });

        userList.appendChild(repoButton);
    })
}
function showRepos(user) {
    const repoUrl = `https://api.github.com/users/${user}/repos`;
    fetch(repoUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            })
            .then(response => { return(response.json()) }) 
            .then(data => {
                handleRepos(data)
               })
            .catch(error => {
                alert("Error fetching data:", error);
            });
        
 }

 function handleRepos(repos) {
    const repoList = document.getElementById("repos-list");
    repoList.innerHTML = ""; 
    repos.forEach(repo => {
        const repoName = repo.name
        const repoItem = document.createElement("li");
        repoItem.textContent = repoName;
        repoList.appendChild(repoItem);
    })



    
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const userInput = document.getElementById("search").value;
        searchUser(userInput);
    });
 



});