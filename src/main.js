import { server} from './bootstrap/server.js'
import appConfig from './lib/config/app.config.js';
import connectToDatabase from './lib/config/db.config.js';

(async () => {
    try {
        await connectToDatabase();

        server.listen(appConfig.port, () => {
            console.info(`Server listening on port: ${appConfig.port}`);
        })
    } catch (error) {
        console.error("We could start the server!", error);
        process.exit(1);
    }
})()