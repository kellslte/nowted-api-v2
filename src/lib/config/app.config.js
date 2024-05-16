import { config } from 'dotenv'
config();

const appConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    dbUrl: process.env.MONGOD_URI || 'mongodb://localhost:27017/nowted',
    jwt: {
        secret: process.env.JWT_SECRET ||'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }    
};

export default appConfig;