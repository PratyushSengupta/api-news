

const url = "https://api.worldnewsapi.com/search-news?language=en&number=21&sort=publish-time&sort-direction=DESC&text=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}`,{
        method: 'GET',
        headers: {
            'x-api-key': API_KEY
        }
    });
    const data = await res.json();
    bindData(data.news);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.summary;

    // const maxLength = 78;
    // const truncatedSummary = article.summary.length > maxLength
    //     ? article.summary.substring(0, maxLength) + "..."
    //     : article.summary;
    // newsDesc.innerHTML = truncatedSummary;

    const date = new Date(article.publish_date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.author} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
