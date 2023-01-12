
let menus = document.querySelectorAll(".menus button")
let news = []
let total_pages=0;
let page=1;
let searchButton = document.getElementById("search-button")
let url;

menus.forEach((menu)=>menu.addEventListener("click",(event)=>getNewsByTopic(event)));

//api 불러오는 코드이다//api 불러오는 코드이다//api 불러오는 코드이다//api 불러오는 코드이다
const getLatestNews=async()=>{
    //let url =new URL(`https://newsapi.org/v2/everything?q=everything&pageSize=10&apiKey=0f9811584b2d47bc9fb5db59714ab76a`);
    url =new URL(`https://newsapi.org/v2/everything?q=everything&pageSize=10`);
    //let header =new Headers({'X-Api-Key':'0f9811584b2d47bc9fb5db59714ab76a'});

    // let response = await fetch(url,{headers:header});
    // let data = await response.json() // 받아온 곳에서 정보를 뺴오기
   
    // console.log(data);
    // news = data.articles
    // console.log(news)

    // render();
    getNews();

};
//api 불러오는 코드이다//api 불러오는 코드이다//api 불러오는 코드이다

const getNews=async()=>{

    try
    {
        let header =new Headers({'X-Api-Key':'e6b5c1508cf44d8193279c6bc8f8f525'});

        url.searchParams.set("page",page);//&page
        
        console.log("url?",url)

        let response = await fetch(url,{headers:header});
        let data = await response.json() // 받아온 곳에서 정보를 뺴오기

        if(response.status == 200)
        {
            if(data.totalResults ==0){
                throw new Error ("검색된 결과값이 없습니다.")
            }
            console.log("받는 데이터가 뭐지?",data)
            console.log(11/10)
            news=data.articles
            total_pages = 10//Math.ceil(data.totalResults/10)
            console.log("total pages", total_pages)
            console.log("current page",page)
            console.log(news);
            render()
            pagenation();
        }
        else{
            
            throw new Error(data.message)
        }

        
    }
    catch(error)
    {
        errorRender(error.message)
    }

    


}

const getNewsByTopic=async(event)=>
{
    console.log("click",event.target.textContent)
    let category = event.target.textContent.toLowerCase()
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&category=${category}`)
    //let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&category=${category}&apiKey=0f9811584b2d47bc9fb5db59714ab76a`)
    // let header =new Headers({'X-Api-Key':'0f9811584b2d47bc9fb5db59714ab76a'});

    // let response = await fetch(url,{headers:header});
    // let data = await response.json() // 받아온 곳에서 정보를 뺴오기

    // news=data.articles
    // console.log(data)
    // render();
    getNews();
}

const getNewsByKeyword = async() =>{
    let keyword = document.getElementById("search-input").value;//키워드값 받아오기
    url = new URL(`https://newsapi.org/v2/everything?q=${keyword}&pageSize=10`)
    //let url = new URL(`https://newsapi.org/v2/everything?q=${keyword}&pageSize=10&apiKey=0f9811584b2d47bc9fb5db59714ab76a`)
    // let header =new Headers({'X-Api-Key':'0f9811584b2d47bc9fb5db59714ab76a'});
    // let response = await fetch(url,{headers:header});
    // let data = await response.json() // 받아온 곳에서 정보를 뺴오기

    // news=data.articles
    // console.log(data);
    // render();
    getNews();
};

const render =()=>{
    let newsHTML="";
    newsHTML = news.map(item=>{
        return `
        <div class="row news"> 
                <div class="col-lg-4">
                    <img class ="news-img-size" src="${item.urlToImage}" alt="#">
                </div>
                <div class="col-lg-8">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <div>
                        ${item.source.name} * ${item.publishedAt}
                    </div>
                </div>
            </div>`
    }).join("");

    

        document.getElementById("news-board").innerHTML=newsHTML
}

const errorRender=(message)=>{
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
   ${message}
  </div>`
    document.getElementById("news-board").innerHTML = errorHTML
}
    
const pagenation = () =>{
    let pagenationHTML = ``
    // total_page
    //page 
    //pag group
    //last
    //first
    //first~last 페이지프린

    let pageGroup = Math.ceil(page/5)
    let last = pageGroup*5;
    let first = last -4;




    if(page!=1)
    {   pagenationHTML =`
    <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${1})">
    <span aria-hidden="true">&laquo;</span>
  </a>
    `

        pagenationHTML = pagenationHTML+ `
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page+1})">
        <span aria-hidden="true">&lt;</span>
      </a>
    </li>
    `
    }
    


    for(let i=first; i<=last;i++)
    {
        pagenationHTML = pagenationHTML+ `<li class="page-item ${page==i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }

    pagenationHTML = pagenationHTML + `<li class="page-item" onclick="moveToPage(${page+1})">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&gt;</span>
    </a>`

    pagenationHTML = pagenationHTML + `<li class="page-item" onclick="moveToPage(${10})">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>`


    document.querySelector(".pagination").innerHTML=pagenationHTML;
}

const moveToPage=(pageNum)=>
{  
    page = pageNum
    getNews();

}




searchButton.addEventListener("click",getNewsByKeyword)

getLatestNews();