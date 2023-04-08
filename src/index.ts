// Load environment
import * as dotenv from 'dotenv-safe';
dotenv.config();

import { app } from './server';
import { appDataSource } from './database/AppDataSource';

(async () => {
    process.stdout.write("Initializing database...\n")
    await appDataSource.initialize();
    process.stdout.write("Database initialization done.\n")
    app.listen(process.env.API_PORT, () => {
        process.stdout.write(`Server listening on port ${process.env.API_PORT}\n`);
    });
})().catch((err) => {
    console.log(err);
    process.exit(1);
});
