/*

  create a web app that stores 
  user data throught a form.

  on the front end, the user
  should be able to enter
  their name and their
  favorite book

  on submit, that data gets stored 
  on the backend.

  the backend should also calculate
  how many 'favorites' a book has
  there should be another webpage
  that shows the book or books with 
  the highest favorite count

*/


const { json } = require('express')
const express = require('express')
const app = express()
const path = require('path')
const port = 8081

//store user data
let usersfavBooks = []

//number of books with highest count
let highestFavCount = []

//#region ------> routes <--------

//index
app.get('/', (request, response)=>{
  console.log(request.url,"index loaded")
  response.status(200).sendFile(path.join(__dirname, 'index.html'))
})

//add user and book
app.get('/add', (request, response)=>{
  let requestUserData = {
    user_name:request.query.name,
    user_book:request.query.book
  }

  usersfavBooks.push(requestUserData)
  
  console.log(request.url,":favourites add")
  console.log("\nuserData-->",usersfavBooks)
  
  response.status(200).sendFile(path.join(__dirname,'index.html'))

})

//view books
app.get('/books', (request, response)=>{
  console.log(request.url,":book list loaded")

  for(let i=0;i<usersfavBooks.length;i++){
    console.log(usersfavBooks[i].user_book)
    highestFavCount.push(usersfavBooks[i].user_book)
  }
  
  response.status(200).send(`book list \n${JSON.stringify(highestFavCount)}`)
})

//show top rated book
app.get('/top', (request, response)=>{
  console.log(request.url,":top books loaded")
  // response.status(200).sendFile(path.join(__dirname, 'index.html'))
  console.log(checkDuplicates(usersfavBooks))
  response.status(200).send(`${JSON.stringify(checkDuplicates(usersfavBooks))}`)
})

//#endregion


console.log(usersfavBooks[0].user_book)

//helper functions

//#region check for top rated books

// check for similar books
function checkDuplicates(array){
  let count = 0
  let newArrNoDups = []
  let addArr = []

  for(let val of array) {
    if (!isExist(newArrNoDups, val)){
      count += 1
      newArrNoDups.push(val)
    }else{
      addArr.push(val)
    } 
  }
  console.log(`${count} duplicates removed`)
  return newArrNoDups
}

function checkSame(array){
  let count = 0
  let newSameVals = []
  let newArrNoDups = []

  array.forEach((arrayItem) =>{
    let arrObjPropVal = arrayItem.user_book

    if(isExist()){
      
    }

  })

}


usersfavBooks.forEach(function (arrayItem) {
  let books = []
  var x = arrayItem.user_book
  books.push(x)
  console.log(books)
  return books
})

function isExist (arr, val){
  for (let i of arr){
    if (i.user_book == val) return true
  }
  return false
}


//#endregion

for(let i of usersfavBooks){
  console.log(i)
}

console.log("=================")

//listening port
app.listen(port, () => {
  console.log(`server running....\nhttp://localhost:${port}`)
})



//#endregion

//listening port
app.listen(port, () => {
  console.log(`server running....\nhttp://localhost:${port}`)
})

