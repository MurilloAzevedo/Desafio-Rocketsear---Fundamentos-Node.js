import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const tasks = database.select('task')

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
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
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('task', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {

      const timeElapsed = Date.now()
      const today = new Date(timeElapsed)

      const { id } = req.params

      const {
        description,
        updated_at
      } = req.body

      database.update('task', id, {
        description,
        updated_at: today.toLocaleDateString(),
      })

      return res.writeHead(204).end()
    }
  }
]