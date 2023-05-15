const { exec } = require('child_process');

exec('node DBSQL/createDBwithMongoose.mongodb.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка запуска script1: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Ошибка вывода script1: ${stderr}`);
    return;
  }
  console.log(`Результат script1: ${stdout}`);
  
  exec('node DBSQL/createRelations.mongodb.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка запуска script2: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Ошибка вывода script2: ${stderr}`);
      return;
    }
    console.log(`Результат script2: ${stdout}`);
    
    exec('node DBSQL/insertData.mongodb.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка запуска script3: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Ошибка вывода script3: ${stderr}`);
        return;
      }
      console.log(`Результат script3: ${stdout}`);
    });
  });
});