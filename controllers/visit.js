const models = require('../models');
const controller = {};

controller.fetch = async (req, res) => {
  console.log("get visit endpoint hit");
  try {
    const { userId, visitId, searchString } = req.query;
    let visits;
    if (typeof visitId !== 'undefined') {
      visits = await models.visits.findAll({ where: { id: visitId } });
    }
    else if (typeof userId !== 'undefined' && typeof searchString !== 'undefined') {
      const lastFiveVisits = await models.visits.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
        limit: 5
      });
      visits = lastFiveVisits;
    }
    else {
      res.status(422);
      return res.send(`requests to this endpoint require either a 'visitId' or both a 'userId' and a 'searchString' property`);
    }
    res.status(200);
    return res.json(visits);
  }
  catch(err) {
    console.log("error fetching visits", err);
    res.status(500);
    return res.send('an unknown error occurred')
  }
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