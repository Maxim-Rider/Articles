const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect('mongodb+srv://admin:12345@dbcluster.x4snmkm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Создание базы данных "DBArticles"
const myDatabase = mongoose.connection.useDb('DBArticles');

// Создание схемы модели для коллекции "Статьи"
const articleSchema = new mongoose.Schema({
  article_id: { type: String, required: true },
  title: { type: String, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  content: { type: String, required: true },
  date_published: { type: Date, default: Date.now },
  tags: [{ type: String }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  comment_id: { type: String, required: true }
});

// Создание схемы модели для коллекции "Комментарии"
const commentSchema = new mongoose.Schema({
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  content: { type: String, required: true },
  date_published: { type: Date, default: Date.now },
  comment_id: { type: String, required: true }
});

// Создание схемы модели для коллекции "Авторы"
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
});

// Создание моделей для коллекций
const Article = myDatabase.model('Article', articleSchema);
const Comment = myDatabase.model('Comment', commentSchema);
const Author = myDatabase.model('Author', authorSchema);

async function createDatabaseAndCollections() {
  // Создание коллекции "Статьи/Блоги"
  await Article.createCollection();
  await Article.createIndexes([
    { key: { title: 1 } },
    { key: { author_id: 1 } },
    { key: { tags: 1 } },
  ]);
  console.log('Коллекция "Статьи" создана успешно!');

  // Создание коллекции "Комментарии"
  await Comment.createCollection();
  await Comment.createIndexes([
    { key: { article_id: 1 } },
    { key: { author_id: 1 } },
  ]);
  console.log('Коллекция "Комментарии" создана успешно!');

  // Создание коллекции "Авторы"
  await Author.createCollection();
  await Author.createIndexes([
    { key: { author_id: 1 } },
    { key: { email: 1 }, unique: true },
  ]);
  console.log('Коллекция "Авторы" создана успешно!');
  
  // Закрытие подключения к базе данных
  await mongoose.connection.close();
}

createDatabaseAndCollections().catch(console.error);