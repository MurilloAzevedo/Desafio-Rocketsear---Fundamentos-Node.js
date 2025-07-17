import http from 'node:http'

const tasks = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  const buffer = []

  for await (const chunk of req) {
    buffer.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString())
  } catch {
    req.body = null
  }

  if (method === 'POST' && url === '/task') {
    const { task, owner } = req.body

    tasks.push({
      id: 1,
      task,
      owner,
    })

    return res.writeHead(201).end()
  }

  if (method === 'GET' && url === '/task') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  return res.writeHead(404).end()
})

// aula 3 - video 7

server.listen(3333)