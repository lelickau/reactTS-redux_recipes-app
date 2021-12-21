const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorsMiddleware = require('./middleware/error-middelware');


const PORT = config.get('PORT') || config.get('port');
const app = express();


app.use(express.json({extended: true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: config.get('clientUrl')
}));
app.use('/api', router);
app.use(errorsMiddleware);


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'));
        app.listen(PORT, () => console.log(`App has been started. ${PORT}`), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}
start()
