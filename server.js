const app = require("./app");
const port = process.env.Port;

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
