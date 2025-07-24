import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/task',
    handler: (req, res) => {
      const tasks = database.select('task')

      return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/task',
    handler: (req, res) => {
      const { task_name, description, completed_at, created_at, updated_at } = req.body

      const timeElapsed = Date.now()
      const today = new Date(timeElapsed)

      const tasks = {
        id: randomUUID(),
        task_name,
        description,
        completed_at: null,
        created_at: today.toLocaleDateString(),
        updated_at: today.toLocaleDateString()
      }

      database.insert('task', tasks)

      return res.writeHead(201).end()
    }
  }
]