const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://iforgot_app:<4kvf4csIrNlOwSDh>@iforgotcl-krqge.mongodb.net/iforgot?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("iforgot").collection("senhasGeradas");
  console.log(collection);
  client.close();
});