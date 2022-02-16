const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_country_club');
const { STRING, UUID, UUIDV4 } = Sequelize;

const Member = sequelize.define('member', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    }
    , name: {
        type: STRING(20)
    }
});

const Facility = sequelize.define('facility', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    }, name: {
        type: STRING(20)
    }

});

const Booking = sequelize.define('booking', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    }
})

//Associations
Member.belongsTo(Member, { as: 'sponsor' });
Member.hasMany(Member, { foreignKey: 'sponsorId', as: 'sponsered' });
Booking.belongsTo(Member, { as: 'booker' });
Booking.belongsTo(Facility);
Facility.hasMany(Booking);

const syncAndSeed = async()=> {
    await sequelize.sync({ force: true });

    const lucy = await Member.create({ name: 'lucy' });
    const ethyl = await Member.create({ name: 'ethyl' });
    const moe = await Member.create({ name: 'moe', sponsorId: lucy.id });
    const larry = await Member.create({ name: 'larry', sponsorId: lucy.id });

    const tennis = await Facility.create({ name: 'tennis' });
    const pingpong = await Facility.create({ name: 'ping pong' });
    const marbles = await Facility.create({ name: 'marbles' });

    await Booking.create({ bookerId: lucy.id, facilityId: marbles.id });
    await Booking.create({ bookerId: lucy.id, facilityId: marbles.id });
    await Booking.create({ bookerId: moe.id, facilityId: tennis.id });
}

module.exports = {
    sequelize,
    syncAndSeed,
    models:{
         Member,
         Facility,
         Booking
    }
}