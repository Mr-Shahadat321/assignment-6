const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
}
const removeActive = ()=> {
    const catBtn =document.querySelectorAll(".categoryBtn")
    catBtn.forEach(btn =>btn.classList.remove("active"))
}
// for default trees plant
const loadAllTrees = () =>{
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then(data => displayTreeCat(data.plants))
}
const loadTreeCard = (id)=>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
     fetch(url)
     .then(res=> res.json())
     .then(data => {
         removeActive();
        const clickCat = document.getElementById (`activeCategory${id}`);
        clickCat.classList.add("active")
       
        displayTreeCat(data.plants);
     })  
}
const loadTreeDetail = async(id) => {
     const url = `https://openapi.programming-hero.com/api/plant/${id}`;
     const res =await fetch(url);
     const details = await res.json();
     displayCatdetails(details.plants);
}

// {
//   "plants": {
//     "id": 1,
//     "name": "Mango Tree",
//     "category": "Fruit Tree",
//     "price": 500,
//     "image": "https://link-to-image",
//     "description": "A fast-growing tropical tree..."
//   }
// }

const displayCatdetails = (id)=>{
    const detailsBox = document.getElementById("details-container");
      detailsBox.innerHTML = `
                               <div>
          <h2 class="text-xl font-semibold">${id.name}</h2>
           <figure>   <img src = "${id.image}" 
          class="rounded-md h-40 w-3/4 object-cover py-1"
        /></figure>
          <h2><span class="text-l font-semibold">Category: </span>${id.category}</h2>
          <p><span class="text-l font-semibold">Price:</span>${id.price} </p>
          <p><span class="text-l font-semibold">Description: </span>${id.description}</p>
          <p><span class="text-l font-semibold">Shade: </span>${id.category}</p>
          
        </div>
      `
    document.getElementById("trees_modal").showModal()
}

const displayTreeCat = (treeCarts) =>{
    
    const treesGrid = document.getElementById("trees-grid")
    treesGrid.innerHTML= ""
    treeCarts.slice(0, 6).forEach(treeCart => {
        const card = document.createElement('div')
        card.innerHTML =`
            <div class="card bg-base-100 shadow-xl grid gap-6 p-4">
          <figure>   <img src = "${treeCart.image}" 
          class="rounded-md h-40 w-full object-cover"
        /></figure>
          <div class="card-body text-left">
            <h2 onclick="loadTreeDetail(${treeCart.id})" class="font-bold">${treeCart.name}</h2>
            <p>A fast-growing tropical tree that produces delicious mangoes.</p>
            <div class="flex justify-between items-center mt-2">
              <span class="bg-gray-100 px-3 py-1 rounded-3xl">Fruit Tree</span>
              <span class="font-semibold">৳500</span>
            </div>
            <button class="btn w-full bg-green-600 text-white rounded-3xl btn-sm mt-2">Add to Cart</button>
          </div>
        </div>
        `
        treesGrid.appendChild(card)
    })
} 
// {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }



const displayCategories = (cats) =>{
    const categorylist = document.getElementById("category-list");
    categorylist.innerHTML = "";

    cats.forEach(cat =>{
       const catLi = document.createElement("li")
       catLi.innerHTML = `
             <button id="activeCategory${cat.id}" onclick="loadTreeCard('${cat.id}')" class="btn btn-wide block justify-start categoryBtn">${cat.category_name}</button>
       `
         categorylist.appendChild(catLi)
    })
}


loadCategories();
loadAllTrees()