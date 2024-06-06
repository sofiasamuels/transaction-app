import mongoose, { ConnectOptions } from "mongoose";

export function connect() {
    const url = process.env.MONGO_DB_CONNECTION_STRING ||'mongodb://127.0.0.1/transactions_db';

    try {
      mongoose.connect(url, {
        'useNewUrlParser': true,
        'useUnifiedTopology': true,
      } as ConnectOptions);
    } catch (err: any) {
      console.error(err.message);
      process.exit(1);
    }
    const dbConnection = mongoose.connection;
    dbConnection.once('open', (_) => {
      console.log(`Database connected: ${url}`);
    });

    dbConnection.on('error', (err) => {
      console.error(`connection error: ${err}`);
    });
    return;
  }