//db
const { sequelize, models: { Member, Facility, Booking } } = require('./db/index');

const app = require('express').Router();

module.exports = app;

//routes
app.get('/facilities', async (req, res, next) => {
    try {
        res.send(await Facility.findAll({
            include: [Booking]
        }));
    }
    catch (ex) {
        next(ex);
    }
});

app.get('/members', async (req, res, next) => {
    try {
        res.send(await Member.findAll({
            include: [
                { model: Member, as: 'sponsor' },
                { model: Member, as: 'sponsered' }  
            ]
        }));
    }
    catch (ex) {
        next(ex);
    }
});