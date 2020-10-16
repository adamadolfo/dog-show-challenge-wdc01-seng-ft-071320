document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
    .then(r => r.json())
    .then(dogs => dogs.forEach(dog => renderDog(dog)))
}

function renderDog(dog) {
  
    let body = document.querySelector("#table-body")  
    
    let row = document.createElement("tr")
    
    let name = document.createElement("td")
    name.innerText = dog.name
    let breed = document.createElement("td")
    breed.innerText = dog.breed
    let sex = document.createElement("td")
    sex.innerText = dog.sex
    let edit = document.createElement("td")
    edit.innerHTML = `<button class="button"> Edit </button>`
    edit.id = dog.id
    edit.addEventListener("click", () => populateBars(dog))
    body.append(row)
    row.append(name, breed, sex, edit)

}

function populateBars(dog) {
    let submit = document.querySelector(".submit")
    submit.id = dog.id

    let nameBar = document.querySelector("#name-bar")
    nameBar.value = dog.name

    let breedBar = document.querySelector("#breed-bar")
    breedBar.value = dog.breed

    let sexBar = document.querySelector("#sex-bar")
    sexBar.value = dog.sex

    let form = document.querySelector("#dog-form")
    form.addEventListener('submit', handleSubmit)
}

function handleSubmit(e) {
    e.preventDefault()
    let table = document.querySelector(".margin")
    while(table.hasChildNodes())
{
   table.removeChild(table.firstChild);
}
    let dog = document.querySelector(".submit")


   newObj = {
       name: e.target.name.value, 
       breed: e.target.breed.value,
       sex: e.target.sex.value
   }

   fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newObj)
      }).then(res => res.json())
      .then(fetchDogs)
    
}