const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const port = 3000
// const cors = require('corse')

app.use(bodyparser.json())
// app.use(cors({ origin: '*' }))

let counter = 1
let todos = [{ todo: 'just do something', id: 0 }]

app.get('/', (req, res) => {
  res.send({ data: todos })
})

app.post('/create', (req, res) => {
  let newtodo = req.body
  newtodo.id = counter
  counter++
  todos.push(newtodo)
  res.send({ message: 'saved succesfully' })
})

app.put('/update/:id', (req, res) => {
  let id = req.params.id
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos[i].todo = req.body.todo
      res.send({ message: 'updated' })
    }
  }

  res.send({ message: 'the element with that id was not found ' })
})

app.delete('/delete/:id', (req, res) => {
  let id = req.params.id
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todos.splice(i, 1)
      res.send({ message: 'deleted' })
    }
  }
  res.send({ message: 'the element with that id was not found' })
})

app.listen(port, () => {
  console.log('app is running on port :', +port)
})
