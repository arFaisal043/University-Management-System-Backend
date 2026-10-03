import app from './app';
import config from './config';

async function main() {
  try {
    app.listen(config.port || 5000, () => {
      console.log(`Server is running on port ${config.port || 5000}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
