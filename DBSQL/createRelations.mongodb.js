const { MongoClient } = require('mongodb');

async function createRelationships() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:12345@dbcluster.x4snmkm.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  // Добавление связей между коллекцией "Статьи" и коллекцией "Авторы"
  const articlesCollection = client.db('DBArticles').collection('articles');
  const authorsCollection = client.db('DBArticles').collection('authors');
  const articles = await articlesCollection.find({}).toArray();
  for (const article of articles) {
    const author = await authorsCollection.findOne({ author_id: article.author_id });
    await articlesCollection.updateOne(
      { _id: article._id },
      { $set: { author: author } }
    );
  }
  console.log('Связь между коллекцией "Статьи" и коллекцией "Авторы" добавлена успешно!');

  // Добавление связей между коллекцией "Комментарии" и коллекциями "Статьи" и "Авторы"
  const commentsCollection = client.db('DBArticles').collection('comments');
  const comments = await commentsCollection.find({}).toArray();
  for (const comment of comments) {
    const article = await articlesCollection.findOne({ _id: comment.article_id });
    const author = await authorsCollection.findOne({ author_id: comment.author_id });
    await commentsCollection.updateOne(
      { _id: comment._id },
      { $set: { article: article, author: author } }
    );
  }
  console.log('Связь между коллекцией "Комментарии" и коллекциями "Статьи" и "Авторы" добавлена успешно!');

  // Закрытие подключения к базе данных
  await client.close();
}

createRelationships().catch(console.error);