const loadingContainer = document.querySelector(".loadingContainer")
let htmlLoadinItems = ""
for (let index = 0; index < 5; index++) {
    let loadingItem = `<div class="loadingItems">
   <div class="loadingBox animation"></div>
   <div class="loadingLines">
       <div class="loadingLine top animation"></div>
       <div class="loadingLine middile animation"></div>
       <div class="loadingLine bottom animation"></div>
       <div class="loadingLine middile animation"></div>
   </div>
</div>`
    htmlLoadinItems += loadingItem
}
loadingContainer.innerHTML = htmlLoadinItems;