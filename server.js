import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import goldenGlobesData from './golden-globes.json'

console.log(goldenGlobesData.length)
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (reg, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (reg, res) => {
  const year = reg.params.year
  const showWon = reg.query.won
  let norminationFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  if (showWon) {
    norminationFromYear = norminationFromYear.filter((item) => item.win)
  }

  res.json(norminationFromYear)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
