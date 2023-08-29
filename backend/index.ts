import express from 'express'
import bodyParser from 'body-parser'
import { PrismaClient } from "@prisma/client"

const app: express.Express = express()
const port = 3000

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

const prisma = new PrismaClient()

app.get('/', async (_req, res) => {
  const allTodos = await prisma.todo.findMany()
  res.send(allTodos)
})

app.post('/todo', async (req, res) => {
    await prisma.todo.upsert({where:{id: req.body.id},create: {title: req.body.title},update:{isCompleted: req.body.isCompleted}})
    return res.send("upserted")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})