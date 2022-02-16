//db
const {sequelize, syncAndSeed, models:{Member, Facility, Booking}} = require('./db/index');

//express
const express = require('express');
const app = express();

//routes
app.use('/api', require('./api'));

//init
const init = async() => {
    try{
        await syncAndSeed();

        const port = process.env.PORT || 1447;
        app.listen(port, () => console.log(`*******************listening on port ${port}*******************`));
    }
    catch(ex){
        console.log(ex);
    }
}
init();