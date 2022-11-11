'use strict'
//Get elements through DOM
const newsContainer = document.getElementById('news-container');
const pageNum = document.getElementById('page-num');
const pagination = document.getElementById('pagination');

let currentUser = JSON.parse(getFromStorage('currentUser')) || [];
let userSettings = JSON.parse(getFromStorage('userSettings')) || [];

let resultsPerPage;
let newsCategory;
if (userSettings.length === 0 || currentUser[2] !== userSettings[0].owner) {
  resultsPerPage = 5;
  newsCategory = 'General'
}
else {
  resultsPerPage = userSettings[0].newsPerPage;
  newsCategory = userSettings[0].newsCategory;
};
let curPage = 1;
let numPages;

const fetchNews = async function () {
  try {
    //Fetch data
    const result = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=${resultsPerPage}&category=${newsCategory}&page=${curPage}&apiKey=84f22bc64fb744b980a2474ebc3713ed`);

    const data = await result.json();
    if (data.status === 'error') {
      alert(data.message);
    };
    //Calculate results per page
    numPages = Math.ceil(data.totalResults / resultsPerPage);
    //Render pagination
    const paginationButton = paginationEl(curPage, numPages);
    const paginationNode = document.createElement('nav');
    paginationNode.innerHTML = paginationButton;
    pagination.appendChild(paginationNode);

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        paginationNode.innerHTML = '';
        curPage++;
        fetchNews();
      });
    };

    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        paginationNode.innerHTML = '';
        curPage--;
        fetchNews();
      });
    };

    //Show news by current page
    renderNews(data.articles);
  }
  catch (err) {
    console.log(err);
  }
};


const paginationEl = function (curPage, numPages) {
  //Current in page 1, and there are other pages
  if (curPage === 1 && numPages > 1) {
    return `
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link" id="page-num">1</a>
        </li>
        <li class="page-item">
          <button class="page-link" id="btn-next">Next</button>
        </li>
      </ul>`
  };

  //Current in last page
  if (curPage === numPages && numPages > 1) {
    return `
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <button class="page-link" href="#" id="btn-prev">Previous</button>
        </li>
        <li class="page-item disabled">
          <a class="page-link" id="page-num">${curPage}</a>
        </li>
      </ul>`
  };

  //Other pages
  if (curPage < numPages) {
    return `
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <button class="page-link" href="#" id="btn-prev">Previous</button>
        </li>
        <li class="page-item disabled">
          <a class="page-link" id="page-num">${curPage}</a>
        </li>
        <li class="page-item">
          <button class="page-link" id="btn-next">Next</button>
        </li>
        </ul>`
  };
  //Current in page 1, and there are no other pages
  return `
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link" id="page-num">1</a>
        </li>
      </ul>`
};

const renderNews = function (data) {
  newsContainer.innerHTML = '';
  const newsEl = document.createElement('div');
  newsEl.innerHTML = data?.map((news, index) => {
    return `
      <div class="card flex-row flex-wrap">
				<div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
								<img src="${news.urlToImage}}" class="card-img"
									alt="news">
						</div>
						<div class="col-md-8">
              <div class="card-body">
									<h5 class="card-title">${news.title}</h5>
									<p class="card-text">${news.description}</p>
									<a href="${news.url}" target="_blank"
										class="btn btn-primary">View</a>
							</div>
						</div>
					</div>
				</div>
		  </div>
  `
  });
  newsContainer.appendChild(newsEl);
};

fetchNews();

