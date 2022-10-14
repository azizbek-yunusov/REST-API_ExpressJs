const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");

const app = express();


// app.use(logger); 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
// books api endpoints
app.use('/api/books', require('./routes/books'))
// Papkani statik qilish
// app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
//   // res.send('<h1>hello express</h1>')
// })

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`)
);
