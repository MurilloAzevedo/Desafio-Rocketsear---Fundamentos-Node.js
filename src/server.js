import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

const database = new Database

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'POST' && url === '/task') {
    const { task_name, description, completed_at, created_at, updated_at } = req.body

    const tasks = {
      id: 1,
      task_name,
      description,
      completed_at: null,
      created_at,
      updated_at
    }

    database.insert('task', tasks)

    return res.writeHead(201).end()
  }

  if (method === 'GET' && url === '/task') {
    const tasks = database.select('task')

    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  return res.writeHead(404).end()
})

// aula 3 - video 7

server.listen(3333)