const API_KEY = '70e0cd735ee449199a89e0f18dc38346'
const url = "https://newsapi.org/v2/everything?q="


window.addEventListener("load",()=>{fetchNews("Technology")})


const fetchNews = async (query)=>{

  const res = await  fetch(`${url}${query}&apiKey=${API_KEY}`)
  const data = await res.json()
  
  
bindData(data.articles)
  
}

const bindData = (articles)=>{
 const cardsContainer = document.getElementById("cardscontainer")
 const newsCardTemplate = document.getElementById("template-news-card")

 cardsContainer.innerHTML = ""

 articles.forEach(article => {
  
  
    if(!article.urlToImage) return

    const cardClone = newsCardTemplate.content.cloneNode(true)
    fillDataInCard(cardClone,article)
    
    cardsContainer.appendChild(cardClone)
      
 });

}

const fillDataInCard = (cardClone,article)=>{
       const newsImg = cardClone.querySelector("#news-img")
       const newsTitle = cardClone.querySelector("#news-title")
       const newsSource = cardClone.querySelector("#news-source")
       const newsDesc = cardClone.querySelector("#news-desc")
    
       newsImg.src= article.urlToImage? article.urlToImage : "./no-image.jpg" ;
       newsTitle.innerHTML = `${article.title.slice(0,60)}...`;
       newsDesc.innerHTML =`${article.description.slice(0,160)}...` ;

       const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"asia/jakarta"})

       newsSource.innerHTML = `${article.source.name} · ${date}`;

       cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
const onNavItemClick =(id)=>{
   fetchNews(id)
   const navItem = document.getElementById(id)
   curSelectedNav?.classList.remove("active")

   curSelectedNav = navItem;

   curSelectedNav.classList.add("active")
}

const searchButton = document.getElementById("search-button")
const searchText = document.getElementById("search-text")

searchButton.addEventListener("click",()=>{
  const query = searchText.value;
  if(!query) return;
  fetchNews(query)
  curSelectedNav?.classList.remove("active")
  curSelectedNav = null;
})