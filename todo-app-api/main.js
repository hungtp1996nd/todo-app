const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./api/db')
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

db.createPool()

app.route('/add')
    .post(async function (req, res, next) {
      try {
        let id = await getId();
        let args = [id, req.body.due_date, req.body.title, req.body.description, req.body.priority]
        await db.singleExecute('insert into op_todo_list(id, due_date, title, description, priority) values ($1, $2, $3, $4, $5)', args)
        let data = await db.singleExecute('select * from op_todo_list', []);
        res.json(data.rows);
      } catch (err) {
        next(err)
      }
    })

app.route('/list')
    .get(async function (req, res, next) {
      try {
        let data = await db.singleExecute('select * from op_todo_list order by due_date desc', []);
        res.json(data.rows);
      } catch (err) {
        next (err)
      }
    })

app.route('/delete/:id')
    .get( async function (req, res, next) {
      try {
        let currentId = req.params.id
        await db.singleExecute('delete from op_todo_list where id = $1', [currentId])
        let data = await db.singleExecute('select * from op_todo_list', [])
        res.json(data.rows)
      } catch (err) {
        next (err)
      }
    })

app.route('/search')
    .get(async function (req, res, next) {
      try {
        let keyword = req.query.keyword
        let data = await db.singleExecute("select *from op_todo_list where title like '%' || $1 || '%'", [keyword])
        res.json(data.rows)
      } catch (err) {
        next(err)
      }
    })

app.route('/update/:id')
    .post(async function (req, res, next) {
      try {
        let id = req.params.id
        let args = [id, req.body.due_date, req.body.title, req.body.description, req.body.priority]
        let data = await db.singleExecute('update op_todo_list set due_date = $1, ', [currentId])
      } catch (err) {
        next(err)
      }
    })

async function getId(){
  let data = await db.singleExecute('select * from op_todo_list order by id desc limit 1;');
  return data.rows[0].id + 1;
}

app.listen(port)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
console.log('RESTful API server started on: ' + port)
