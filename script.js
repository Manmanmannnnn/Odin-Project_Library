const libraryCollection = document.querySelector(".collection")
const addBookBtn = document.querySelector("#addBook")
const dialog = document.querySelector("dialog")
const cancelBtn = dialog.querySelector("#cancelBtn")
const confirmBtn = dialog.querySelector("#confirmBtn")
const inputTitle = dialog.querySelector("#bookTitle")
const inputAuthor = dialog.querySelector("#bookAuthor")
const inputPages = dialog.querySelector("#bookPages")
const message = document.querySelector(".sample")

let myLibrary = []

class Book {
  constructor(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = false
  }

  set title(newTitle) {
    if (newTitle.length < 5 || typeof newTitle === "number") {
      alert("Please input a valid title")
      return console.error("Please input a valid title.")
    } else return (this._title = newTitle)
  }

  get title() {
    return this._title
  }

  set pages(num) {
    if (num < 100) {
      alert("Please input page larger than 100")
      return console.error("Pages is too short to be called a book!")
    }
    return (this._pages = num)
  }

  get pages() {
    return this._pages
  }

  readStatus() {
    this.status = this.status === false ? true : false
  }

  addBookToLibrary(book) {
    myLibrary.push(book)
  }
}

function buttonFunctions() {
  addBookBtn.addEventListener("click", () => {
    dialog.showModal()
  })

  cancelBtn.addEventListener("click", () => {
    inputTitle.value = ""
    inputAuthor.value = ""
    inputPages.value = ""
    dialog.close()
  })

  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault()
    if (!inputTitle.checkValidity()) {
      alert(inputTitle.validationMessage)
      return
    }

    if (!inputAuthor.checkValidity()) {
      message.textContent = inputAuthor.validationMessage
      return
    }

    if (inputPages.validity.rangeOverflow) {
      message.textContent = "Tooooooo long"
      return
    }

    let titleValue = inputTitle.value
    let authorValue = inputAuthor.value
    let pagesValue = inputPages.value

    const recentBook = new Book(titleValue, authorValue, pagesValue)
    recentBook.addBookToLibrary(recentBook)

    inputTitle.value = ""
    inputAuthor.value = ""
    inputPages.value = ""
    titleValue = ""
    authorValue = ""
    pagesValue = ""

    dialog.close()
    updateLibraryDisplay()
  })
}

function updateLibraryDisplay() {
  let recentAdded = myLibrary.length - 1
  let div = document.createElement("div")
  div.classList.add("bookFormat")
  div.classList.add(`book${recentAdded}`)

  div.innerHTML = `<p>Book Title: <strong>${myLibrary[recentAdded].title}</strong><p>`

  div.innerHTML += `<p>Book Author: <strong>${myLibrary[recentAdded].author}</strong><p>`
  div.innerHTML += `<p>Number of Pages: <strong>${myLibrary[recentAdded].pages}</strong><p>`
  div.style.paddingLeft = "15px"

  let removeBtn = document.createElement("button")
  removeBtn.textContent = "Remove"
  removeBtn.classList.add("removeBtn")
  removeBtn.classList.add(`book${recentAdded}`)
  removeBtn.style.width = "10ch"

  let readBtn = document.createElement("button")
  readBtn.textContent = "Done"
  readBtn.classList.add("readBtn")
  readBtn.classList.add(`book${recentAdded}`)
  readBtn.style.width = "10ch"

  div.appendChild(removeBtn)
  div.appendChild(readBtn)
  libraryCollection.appendChild(div)

  removeBtn.addEventListener("click", () => {
    if (myLibrary.length === 1) myLibrary.length = 0
    myLibrary.splice(recentAdded, 1)
    libraryCollection.removeChild(div)
  })

  readBtn.addEventListener("click", () => {
    myLibrary[recentAdded].readStatus()

    if (myLibrary[recentAdded].status) {
      readBtn.textContent = "Not yet"
    } else if (!myLibrary[recentAdded].status) {
      readBtn.textContent = "Done"
    }
  })
}

buttonFunctions()
