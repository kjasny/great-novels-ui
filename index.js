const express = require('express')
const cors = require('cors')
const path = require('path')
const { getAllAuthors, getAuthorByIdOrName } = require('./controllers/authors')
const { getAllGenres, getGenreById } = require('./controllers/genres')
const { getAllNovels, getNovelByIdOrTitle } = require('./controllers/novels')

const app = express()

app.use(cors())
app.use(express.static("client/build"));

app.get('/api/authors', getAllAuthors)
app.get('/api/authors/:identifier', getAuthorByIdOrName)

app.get('/api/genres', getAllGenres)
app.get('/api/genres/:id', getGenreById)

app.get('/api/novels', getAllNovels)
app.get('/api/novels/:identifier', getNovelByIdOrTitle)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
