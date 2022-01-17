const DBHandler = require('./db.handler');

exports.getStatuses = async (req, res) => {
    const statuses = await DBHandler.getStatuses(req.query.from, req.query.to);
    res.json(statuses);
};

exports.getStatusesCount = (req, res) => {
    const statusesCount = DBHandler.getStatusesCount();
    res.json({ statusesCount });
}