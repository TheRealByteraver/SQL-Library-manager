// This little script will add event handlers to the pagination buttons
// on the urls /books/pages/<pageNr> and /books/search/<pageNr>
const paginationBtnList = document.querySelectorAll('ul.link-list li button');
for( let i = 0; i < paginationBtnList.length; i++) {
  paginationBtnList[i].addEventListener('click', (event) => {

    // check if we are on the /books/pages/ section of the site:
    if(location.pathname.substring(0, `/books/pages/`.length) === `/books/pages/`) {
      window.location = `/books/pages/${event.target.innerText}`;

    // check if we are on the /books/search/ section of the site:      
    } else if(location.pathname.substring(0, `/books/search/`.length) === `/books/search/`) {
      window.location = `/books/search/${event.target.innerText}${window.location.search}`;
    }
  });
}
// console.log('window.location: ', window.location);