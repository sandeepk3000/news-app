
// this query parameter is exacess from borswer
let query;
let pageno;
let totalPages;
try {
  query = window.location.search.split("?")[1].split("=")[1].split("&")[0];
  pageno = parseInt(window.location.search.split("&")[1].split("=")[1]);
  console.log(pageno)
} catch (error) {
  window.history.replaceState({ name: "sandeep" }, "this url here", "/?query=india&page=1");
}
const url = `/api?q=${query}&apiKey=5dc09d16681e45f19520edefe11c6f5b&pageSize=10&page=${pageno}`
const pre = document.querySelector(".pre")
const next = document.querySelector(".next");
const news_container = document.querySelector(".news_container")
const header_contianer = document.querySelector(".header_contianer")
const news_input = document.querySelectorAll(".news_input")
const search_news = document.querySelector(".search_news")
const body = document.querySelector(".body")
const footer=document.querySelector(".footer")
const toggle_icon=document.querySelector("#toggle_icon")
const header_nav =document.querySelector(".header_nav")
// const articlePerPage;
const xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = "json";
xhr.onload = () => {
  try {
    if (xhr.status = 200) {
      let newsData = xhr.response;
      // totalPages = Math.ceil(newsData.totalResults / articlePerPage);
      newsCards(newsData)
    }
  } catch (error) {
    console.log(error)
  }
}
xhr.send()
// const fetchData = async () => {
//   // end point ke age wali this query parameter is exacess by server
//   let a = await fetch(url);
//   let r = await a.json()
//   console.log(r)
//   newsCards(r)
//   
// };
// fetchData()
// setInterval(() => {
//   fetchData()
// }, 1000);
let html = "";
const newsCards = (newsCard) => {
  let header_contianerData = newsCard.articles.slice(0, 1)[0];
  let headerCard = ` <a href="${header_contianerData.url}">
  <div class="top_news_contianer">
      <img class="top_news_img" src="${header_contianerData.urlToImage}">
      <div class="top_news_info col">
          <div class="type_news row">
              <h3>${query}</h3>
              <p>${header_contianerData.publishedAt}</p>
          </div>
          <h2> ${header_contianerData.title}</h2>
          <P>
          ${header_contianerData.description}
          </P>
      </div>
  </div>
</a>`
  header_contianer.innerHTML = headerCard;
  newsCard.articles.slice(1).forEach(cardData => {
    let newsCard = `
    <a href="${cardData.url}">
                <div class="news_row row">

                    <img class="news_logo" src="${cardData.urlToImage}" alt="">

                    <div class="news_info col">
                        <div class="type_news row">
                            <h3>${query}</h3>
                            <p>${cardData.publishedAt}</p>
                        </div>
                        <h2> ${cardData.title}</h2>
                        <p> ${cardData.description}</p>

                    </div>
                </div>
      </a>`
    html += newsCard;
  });
  news_container.innerHTML = html;
}
Array.from(news_input).forEach((search) => {
  console.log(search)
  search.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const nextURL = `/?query=${search.value}&page=${pageno}`
      window.history.replaceState({ name: "sandeep" }, "this url here", nextURL)
      window.location.reload();
    }
  })
})
let count=true;
toggle_icon.addEventListener("click",()=>{
  if(count){
    body.classList.add("active")
    count=false;
  }
  else{
    body.classList.remove("active")
    count=true
  }
})
pre.addEventListener("click", () => {
  if (pageno >1) {
    pageno -= 1;
    console.log(pageno + "pre")
    pre.href = `/?query=${query}&page=${pageno}`;
    window.location.reload();
  }
})
next.addEventListener("click", () => {
  if (pageno <= 9) {
    pageno += 1;
    console.log(pageno + "next")
    next.href = `/?query=${query}&page=${pageno}`;
    window.location.reload();
  }
})

const observer = new IntersectionObserver((entries)=>{
console.log(entries[0].isIntersecting)
entries[0].isIntersecting=== false? body.classList.add("sticky"):body.classList.remove("sticky")
},
{
  root:null,
  rootMargin:"-90px",
  threshold:0,
})
observer.observe(header_contianer);
const scrollElement=document.createElement("div");
scrollElement.classList.add("scroll_style");
scrollElement.innerHTML=`Top`
const scrollTop=()=>{
  header_contianer.scrollIntoView({
    behavior:"smooth"
  })
}
footer.after(scrollElement)
scrollElement.addEventListener("click",scrollTop)
