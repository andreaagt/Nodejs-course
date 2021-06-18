const fs = require('fs');
//read file 
/*
fs.readFile('./ckmobile/note.txt', (err, data) => {
   if (err) {
     console.log(err)
   }  else {
     console.log(data.toString())
   }
});
*/
// Write file
/*
fs.writeFile('./ckmobile/note.txt', 'A new message',(err, data) => {
  if (err) {
    console.log(err)
  }  else {
    console.log('A new message created')
  }
})
*/
// Append file
/*
fs.appendFile('./ckmobile/note.txt', 'A new message 2\r\n',(err, data) => {
  if (err) {
    console.log(err)
  }  else {
    console.log('A new message created')
  }
})
*/
// Create folder
/*
if (!fs.existsSync('newfolder')){
  fs.mkdir('newFolder',(err, data) => {
    if (err) {
      console.log(err)
    }  else {
      console.log('A new folder created')
    }
  })
} else {
  console.log('The folder already exists')
}
*/
// Delete a file

if (fs.existsSync('./ckmobile/note.txt')) {
  fs.unlink('./ckmobile/note.txt', (err, data) => {
    if (err) {
      console.log(err)
    }  else {
      console.log('The file is deleted')
    }
  })
} else {
  console.log('The file already deleted')
}

