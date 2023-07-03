console.clear()

const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')


dotenv.config({ path: ".env" });
mongoose.set({ strictQuery: true });


(async function () {
  try {
    const conn = await mongoose.connect(process.env.DATABASE);

    if (conn)
      console.log(
        `Connected to the Database.✅`
      );
  } catch (error) {

    console.log("🚀 ~ file: server.js:22 ~ error:", error)

    console.log("Failed to connect to the cloud database.❌");
  }
})();

app.listen(process.env.PORT, function () {
  console.log(`Listening to Port: ${process.env.PORT}`);
});
