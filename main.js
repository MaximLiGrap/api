const ol = document.createElement('ol');
document.body.append(ol);

async function createLink(page) {
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const obj = await response.json();
    const objArray = obj.data;
    for (let i = 0; i<objArray.length; i++){
        const li = document.createElement('li')
        const link = document.createElement('a');
        link.setAttribute('href', `indexbody.html?${objArray[i].id}`);
        link.textContent = objArray[i].title;
        li.append(link);
        ol.append(li);
    }
    console.log(obj)
}

// function cleanBody () {
//     while(ol.firstChild){
//         ol.removeChild(ol.firstChild)
//      }
// }

function createURL (item) {
    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page',  `${item}`);
    window.location.search = urlParams;  
}

async function createPagination() {
    const response = await fetch('https://gorest.co.in/public-api/posts?page=0');
    const obj = await response.json();
    const objMeta = obj.meta;
    console.log(objMeta)
    for(let i = 1; i<= objMeta.pagination.pages; i++){ 
        let pagination = document.createElement('button');
        pagination.textContent = i;
        document.body.append(pagination);    
        pagination.addEventListener('click', function(){
            createURL (i)
            // cleanBody ()
        })
    }
    const pageParams = new URLSearchParams(window.location.search);
    let nomberPage = pageParams.get('page');
    createLink(nomberPage) 
}


createPagination()





