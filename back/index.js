const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './home.html'));
});

// Routes
require("./routes/todo.routes")(app);

app.listen(4000, () => {
  console.log(`app is running on http://localhost:4000`);
})