//Getting the form from the DOM
const form = document.getElementById("github-form")

//Adding an event listener to the from
form.addEventListener("submit", event=>
{
    //Preventing default behaviour of the form
    event.preventDefault()

    //Getting the input field value from the DOM
    let input=document.getElementById("search")
    input=input.value

    //Fetching the data from GitHub as per the input passed on by the user
    fetch(`https://api.github.com/search/users?q=${input}`)
        .then(response => response.json())
        .then(usersInfo=> 
            {
                //Getting the items array which contains the users data
                let {items}= usersInfo

                //Looping over the items array and extracting requred information
                items.forEach(item => 
                {
                    let {login, avatar_url, html_url} = item

                    //Creating an li to store the profiles
                    let profileLi=document.createElement("li")

                    //Setting the innerHTML of the li
                    profileLi.innerHTML=
                    `
                    <img src="${avatar_url}" alt="${login}">
                    <span>${login}</span>
                    
                    `

                    //Getting the parent UL where the profile li will be appended
                    let parentUl=document.getElementById("user-list")

                    //Attatching an event listener to the li items
                    profileLi.addEventListener("click", ()=>
                    {
                        fetchRepos(login)
                    })

                    //Appending the profileLi to the parentUl
                    parentUl.appendChild(profileLi)
                });

            })
})

//Function to handle clicking of the li
function fetchRepos(login)
{
    fetch(`https://api.github.com/users/${login}/repos`)
        .then(response => response.json())
        .then(reposData => 
            {
                reposData.forEach(repoData => 
                {
                    let {full_name, html_url} = repoData

                    //Getting the parent ul where repos will be stored
                    let reposList=document.getElementById("repos-list")

                    //Creating the li
                    const repoLi=document.createElement("li")

                    //Setting the innerHTML of the repoLi
                    repoLi.innerHTML=
                    `
                    <p>Repo name: ${full_name}</p>
                    <p>Repo URL: <a href="${html_url}" target="_blank" >${html_url}</a></p>
                    `

                    //Appending the profileLi to the parentUl
                    reposList.appendChild(repoLi)
                });
                
            })
}