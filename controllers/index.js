const AppError = require("../utils/appError");
const express = require('express');
const { MongoClient } = require('mongodb');
const { json } = require('express');

const app = express();
const port = 4040;
const mongoUrl = 'mongodb+srv://admin:12345@dbcluster.x4snmkm.mongodb.net/DBArticles';

const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

app.use(json());

app.get('/articles', async (req, res) => {
    try {
      await client.connect();
      const database = client.db();
      const collection = database.collection('articles');
      const count = await collection.countDocuments({});
      const result = await collection.find({}, { projection: { _id: 0, title: 1, content: 1, date_published: { $dateToString: { format: '%d-%m-%Y', date: '$date_published' } } }, }).toArray();
      res.send({ count, result });
    } catch (error) {
      console.error('Ошибка запроса к базе данных', error);
      res.status(500).send('Ошибка запроса к базе данных');
    }
  });

app.get('/authors', async (req, res) => {
    try {
      await client.connect();
      const database = client.db();
      const collection = database.collection('authors');
      const count = await collection.countDocuments({});
      const result = await collection.find({}, { projection: { _id: 0, name: 1, email: 1, bio: 1 }, }).toArray();
      res.send({ count, result });
    } catch (error) {
      console.error('Ошибка запроса к базе данных', error);
      res.status(500).send('Ошибка запроса к базе данных');
    }
  }); 

app.get('/articles-and-comments', async (req, res) => {
    try {
      await client.connect();
      const database = client.db();
      const articlesCollection = database.collection('articles');
      const authorsCollection = database.collection('authors');
      const commentsCollection = database.collection('comments');
      const result = await articlesCollection.aggregate([
        {
          $lookup: {
            from: 'authors',
            localField: 'author_id',
            foreignField: 'author_id',
            as: 'author'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: 'comment_id',
            foreignField: 'comment_id',
            as: 'comments'
          }
        },
        {
          $project: {
            _id: 0,
            title: 1,
            'author.name': 1,
            'comments.content': 1
          }
        }
      ]).toArray();
      res.send(result);
    } catch (error) {
      console.error('Ошибка запроса к базе данных', error);
      res.status(500).send('Ошибка запроса к базе данных');
    }
  });

  app.post('/createauthor', async (req, res) => {
    try {
      const { name, email, password, bio } = req.body;
      if (!name || !email || !password || !bio) {
        throw new AppError('Необходимо заполнить все поля', 400);
      }
      await client.connect();
      const database = client.db();
      const collection = database.collection('authors');
      const author = await collection.insertOne({ name, email, password, bio });
      res.send(author.ops[0]);
    } catch (error) {
      console.error('Ошибка запроса к базе данных', error);
      if (error instanceof AppError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send('Пользователь добавлен');
      }
    }
  });

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
