import express from 'express'
import { PrismaClient } from "@prisma/client"

const app: express.Express = express()
const port = 3000

const prisma = new PrismaClient()

app.get('/', async (_req, res) => {
  const allTodos = await prisma.todo.findMany()
  res.send(allTodos)
})

app.get('/create', async (_req, res) => {
    await prisma.todo.create({data: {title: "new"}})
    return res.send("created")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})