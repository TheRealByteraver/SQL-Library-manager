// This little script will add event handlers to the pagination buttons
// on the url /books/pages/<pageNr>
const paginationBtnList = document.querySelectorAll('ul.link-list li button');
for( let i = 0; i < paginationBtnList.length; i++) {
  paginationBtnList[i].addEventListener('click', (event) => {
    window.location = `/books/pages/${event.target.innerText}`;
  });
}