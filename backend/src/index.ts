import app from './app';

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  const address = server.address();
  console.log(`Listening at: http://${address}:${PORT}`);
});