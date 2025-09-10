const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then(data => displayCategories(data.categories))
}

// for default trees plant
const loadAllTrees = () =>{
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then(data => displayTreeCat(data.plants))
}

const loadTreeCard = (id)=>{
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    console.log(id);
     fetch(url)
     .then(res=> res.json())
     .then(data => displayTreeCat(data.plants))  
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
            <h2 class="font-bold">Mango Tree</h2>
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
             <button onclick="loadTreeCard('${cat.id}')" class="btn btn-wide block justify-start">${cat.category_name}</button>
       `
         categorylist.appendChild(catLi)
    })
}


loadCategories();
loadAllTrees()