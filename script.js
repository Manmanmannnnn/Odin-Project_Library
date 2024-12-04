const libraryCollection=document.querySelector('.collection')
const addBookBtn=document.querySelector('#addBook');
const dialog=document.querySelector('dialog');
const cancelBtn=dialog.querySelector('#cancelBtn');
const confirmBtn=dialog.querySelector('#confirmBtn');
const inputTitle=dialog.querySelector('#bookTitle');
const inputAuthor=dialog.querySelector('#bookAuthor');
const inputPages=dialog.querySelector('#bookPages');



const myLibrary=[];

function Book(title,author,pages){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.status=false;
}


function addBookToLibrary(title,author,pages){
    const addBook= new Book(title, author, pages);
    myLibrary.push(addBook);
}


addBookBtn.addEventListener('click',()=>{
dialog.showModal();
})

cancelBtn.addEventListener('click',()=>{
    inputTitle.value='';
    inputAuthor.value='';
    inputPages.value='';
    dialog.close();
})

confirmBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let titleValue=inputTitle.value;
    let authorValue=inputAuthor.value;
    let pagesValue=inputPages.value;

    addBookToLibrary(titleValue,authorValue,pagesValue);

    inputTitle.value='';
    inputAuthor.value='';
    inputPages.value='';
    titleValue='';
    authorValue='';
    pagesValue='';

    dialog.close();
    updateLibrary();

})

function updateLibrary(){
    let recentAdded=myLibrary.length-1;
    let div=document.createElement('div');
    div.classList.add('bookFormat');
    div.classList.add(`book${recentAdded}`);


    div.innerHTML=`<p>Book Title: <strong>${myLibrary[recentAdded].title}</strong><p>`

    div.innerHTML+=`<p>Book Author: <strong>${myLibrary[recentAdded].author}</strong><p>`
    div.innerHTML+=`<p>Number of Pages: <strong>${myLibrary[recentAdded].pages}</strong><p>`
    div.style.paddingLeft='15px'

    let removeBtn=document.createElement('button');
    removeBtn.textContent='Remove'
    removeBtn.classList.add('removeBtn');
    removeBtn.classList.add(`book${recentAdded}`);
    removeBtn.style.width='10ch'

    let readBtn=document.createElement('button');
    readBtn.textContent='Done';
    readBtn.classList.add('readBtn');
    readBtn.classList.add(`book${recentAdded}`);
    readBtn.style.width='10ch'

  

    div.appendChild(removeBtn);
    div.appendChild(readBtn);
    libraryCollection.appendChild(div);

    removeBtn.addEventListener('click', ()=>{
        myLibrary.splice(recentAdded,1);
        libraryCollection.removeChild(div);
       
    })

    readBtn.addEventListener('click',()=>{
        myLibrary[recentAdded].readStatus()
        if(myLibrary[recentAdded].status){
            readBtn.textContent='Not yet'
        }
        else if(!myLibrary[recentAdded].status){
            readBtn.textContent='Done'
        }
    })
}

Book.prototype.readStatus=function(){
     this.status=this.status===false?true:false;
}

