const { MongoClient } = require('mongodb');

async function insertTestData() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:12345@dbcluster.x4snmkm.mongodb.net/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  // Добавление тестовых данных в коллекцию "Авторы"
  const authorsCollection = client.db('DBArticles').collection('authors');
  const authors = [
       {
        article_id: 'article1',
        author_id: 'author1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        password: 'password1',
        bio: 'I am a blogger and a programmer.',
        articles: ['article1', 'article2']
       },
       {
        article_id: 'article2',
        author_id: 'author2',
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        password: 'password2',
        bio: 'I am a journalist and a writer.',
        articles: ['article3', 'article4']
       },
       {
        article_id: 'article3',
        author_id: 'author3',
        name: 'Mary Johnson',
        email: 'maryj@example.com',
        password: 'password123',
        bio: 'I am a freelance writer and editor with over 10 years of experience.',
        articles: []
      },
      {
        author_id: 'author4',
        article_id: 'article1',
        name: 'David Lee',
        email: 'davidl@example.com',
        password: 'password123',
        bio: 'I am a software developer with a passion for writing about technology.',
        articles: []
      },
      {
        author_id: 'author5',
        name: 'Jennifer Chen',
        email: 'jenniferchen@example.com',
        password: 'password123',
        bio: 'I am a business consultant with a background in marketing and sales.',
        articles: []
      },
      {
        author_id: 'author6',
        name: 'Michael Davis',
        email: 'michaeld@example.com',
        password: 'password123',
        bio: 'I am a financial analyst with a strong interest in personal finance.',
        articles: []
      },
      {
        author_id: 'author7',
        name: 'Emily Wong',
        email: 'emilyw@example.com',
        password: 'password123',
        bio: 'I am a teacher and writer with a passion for education.',
        articles: []
      },
      {
        author_id: 'author8',
        name: 'Robert Johnson',
        email: 'robertj@example.com',
        password: 'password123',
        bio: 'I am a journalist with a focus on politics and social issues.',
        articles: []
      },
      {
        author_id: 'author9',
        name: 'Sophia Kim',
        email: 'sophiak@example.com',
        password: 'password123',
        bio: 'I am a marketing professional with experience in content creation and social media management.',
        articles: []
      },
      {
        author_id: 'author10',
        name: 'Daniel Lee',
        email: 'daniell@example.com',
        password: 'password123',
        bio: 'I am a freelance writer and editor specializing in health and wellness topics.',
        articles: []
      }
  ];
  await authorsCollection.insertMany(authors);
  console.log('Тестовые данные добавлены в коллекцию "Авторы".');

  // Добавление тестовых данных в коллекцию "Статьи"
  const articlesCollection = client.db('DBArticles').collection('articles');
  const articles = [
       {
        title: '10 ways to improve your programming skills',
        author_id: 'author1',
        content: 'In this article, we will discuss 10 ways to improve your programming skills.',
        date_published: new Date('2022-01-01'),
        tags: ['programming', 'education'],
        comments: ['comment1', 'comment2'],
        comment_id: '1'
       },
       {
        title: 'The future of journalism in the digital age',
        author_id: 'author2',
        content: 'In this article, we will explore the future of journalism in the digital age.',
        date_published: new Date('2022-01-02'),
        tags: ['journalism', 'technology'],
        comments: ['comment3', 'comment4'],
        comment_id: '2'
       },
       {
        title: 'How to improve your writing skills',
        author_id: 'author3',
        content: 'In this article, we will discuss some tips on how to improve your writing skills.',
        date_published: new Date('2022-01-05'),
        tags: ['writing', 'education'],
        comments: ['comment5', 'comment6'],
        comment_id: '3'
      },
      {
        title: 'The benefits of meditation',
        author_id: 'author4',
        content: 'In this article, we will explore the benefits of meditation for mental and physical health.',
        date_published: new Date('2022-01-06'),
        tags: ['meditation', 'health'],
        comments: ['comment7', 'comment8'],
        comment_id: '4'
      },
      {
        title: '10 common programming mistakes to avoid',
        author_id: 'author5',
        content: 'In this article, we will discuss 10 common programming mistakes and how to avoid them.',
        date_published: new Date('2022-01-07'),
        tags: ['programming', 'education'],
        comments: ['comment9', 'comment10'],
        comment_id: '5'
      },
      {
        title: 'The impact of social media on mental health',
        author_id: 'author6',
        content: 'In this article, we will examine the impact of social media on mental health and how to stay healthy while using social media.',
        date_published: new Date('2022-01-08'),
        tags: ['social media', 'mental health'],
        comments: ['comment11', 'comment12'],
        comment_id: '6'
      },
      {
        title: '10 tips for successful project management',
        author_id: 'author7',
        content: 'In this article, we will share 10 tips for successful project management.',
        date_published: new Date('2022-01-09'),
        tags: ['project management', 'business'],
        comments: ['comment13', 'comment14'],
        comment_id: '7'
      },
      {
        title: 'The art of public speaking',
        author_id: 'author8',
        content: 'In this article, we will discuss the art of public speaking and how to become a better public speaker.',
        date_published: new Date('2022-01-10'),
        tags: ['public speaking', 'education'],
        comments: ['comment15', 'comment16'],
        comment_id: '8'
      },
      {
        title: 'The importance of cybersecurity for businesses',
        author_id: 'author9',
        content: 'In this article, we will explain why cybersecurity is important for businesses and how to protect your company from cyber threats.',
        date_published: new Date('2022-01-11'),
        tags: ['cybersecurity', 'business'],
        comments: ['comment17', 'comment18'],
        comment_id: '9'
      },
      {
        title: 'How to start a successful online business',
        author_id: 'author10',
        content: 'In this article, we will share some tips on how to start a successful online business.',
        date_published: new Date('2022-01-12'),
        tags: ['online business', 'entrepreneurship'],
        comments: ['comment19', 'comment20'],
        comment_id: '10'
      }
  ];
  await articlesCollection.insertMany(articles);
  console.log('Тестовые данные добавлены в коллекцию "Статьи/Блоги".');

  // Добавление тестовых данных в коллекцию "Комментарии"
  const commentsCollection = client.db('DBArticles').collection('comments');
  const comments = [
    {
      article_id: 'article1',
      author_id: 'author1',
      content: 'Great article, thank you!',
      date_published: new Date('2022-01-03'),
      comment_id: '1'
    },
    {
      article_id: 'article2',
      author_id: 'author2',
      content: 'I disagree with some points in this article.',
      date_published: new Date('2022-01-04'),
      comment_id: '2'
    },
    {
        article_id: 'article3',
        author_id: 'author3',
        content: 'Great article! I learned a lot from it.',
        date_published: new Date('2022-01-11'),
        comment_id: '3'
      },
      {
        article_id: 'article4',
        author_id: 'author4',
        content: 'Thanks for sharing this information. It was very helpful.',
        date_published: new Date('2022-01-12'),
        comment_id: '4'
      },
      {
        article_id: 'article5',
        author_id: 'author5',
        content: 'I really enjoyed reading this article. Keep up the good work!',
        date_published: new Date('2022-01-12'),
        comment_id: '5'
      },
      {
        article_id: 'article6',
        author_id: 'author6',
        content: 'This article inspired me to start meditating. Thank you!',
        date_published: new Date('2022-04-12'),
        comment_id: '6'
      },
      {
        article_id: 'article7',
        author_id: 'author7',
        content: 'These tips are very useful. I will definitely keep them in mind.',
        date_published: new Date('2022-01-17'),
        comment_id: '7'
      },
      {
        article_id: 'article8',
        author_id: 'author8',
        content: 'I wish I had read this article earlier. I could have avoided a lot of mistakes!',
        date_published: new Date('2022-01-14'),
        comment_id: '8'
      },
      {
        article_id: 'article9',
        author_id: 'author9',
        content: 'I completely agree with your points about social media and mental health.',
        date_published: new Date('2022-02-12'),
        comment_id: '9'
      },
      {
        article_id: 'article10',
        author_id: 'author10',
        content: 'This is a very important topic. Thank you for raising awareness about it.',
        date_published: new Date('2022-03-12'),
        comment_id: '10'
      }
  ];
  await commentsCollection.insertMany(comments);
  console.log('Тестовые данные добавлены в коллекцию "Комментарии".');

  // Закрытие подключения к базе данных
  await client.close();
}

insertTestData().catch(console.error);