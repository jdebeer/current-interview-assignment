const models = require('../models');
const controller = {};

controller.fetch = async (req, res) => {
  console.log("get visit endpoint hit");
};

controller.create = async (req, res) => {
  console.log("create visit endpoint hit");
  try {
    const { userId, name } = req.body;

    if (typeof userId === 'undefined' || typeof name === 'undefined') {
      res.status(403);
      return res.send(`requests to this endpoint require both a 'userId' and a 'name' property`);
    }
    const visit = await models.visits.create({
      userId,
      name
    });
    res.status(201);
    return res.json({ visitId: visit.id });
  }
  catch(err) {
    console.log("error creating visit", err);
    res.status(500);
    return res.send('an unknown error occurred')
  }
};

module.exports = controller;