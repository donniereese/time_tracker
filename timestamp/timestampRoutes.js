const express = require('express');
const Timestamp = require('./timestampSchema');
const Client = require('../client/clientSchema');
const Vendor = require('../vendor/vendorSchema');
const timestampRouter = express.Router();

timestampRouter.post('/start', (req, res) => {
  // client id vendor id
  const { vendorId, clientId } = req.body;
  if (vendorId && clientId) {
    const newTStamp = new Timestamp({ client: clientId, vendor: vendorId });
    newTStamp.save();
    console.log(newTStamp);
    res.status(200).json(newTStamp);
    // push this id to vendor timestamp array
    Vendor.findOneAndUpdate(
      { _id: vendorId },
      { $push: { hoursLogged: newTStamp._id } }
    );
  } else {
    res.status(422).json({ error: 'must include vendorId and clientId' });
  }

  // push this id to client timestamp array
  // Client.findOneAndUpdate(
  //   { _id: clientId },
  //   { $push: { hoursLogged: newTStamp._id } }
  // );
});

//Create new timestamp
timestampRouter.post('/', (req, res) => {
  const timestamp = new Timestamp(req.body);
  timestamp.save((err, timestamp) => {
    if (err) return res.send(err);
    res.json({ success: 'Timestamp saved', timestamp });
  });
});

//Get all timestamps
timestampRouter.get('/', (req, res) => {
  const { id } = req.id;
  Timestamp.find(id, (err, timestamps) => {
    if (err) return res.send(err);
    res.send(timestamps);
  });
});

//Get an timestamp by id
timestampRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findById(id)
    .then(timestamp => {
      res.status(200).json(timestamp);
    })
    .catch(err => {
      res.status(500).json({ error: `Could not access DB ${err}` });
    });
});

//Update
timestampRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findByIdAndUpdate(id, req.body)
    .then(updatedTimestamp => {
      if (updatedTimestamp) {
        res.status(200).json(updatedTimestamp);
      } else {
        res
          .status(404)
          .json({ message: `Could not find timestamp with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while updating timestamp: ${err}` });
    });
});

//Remove
timestampRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Timestamp.findByIdAndRemove(id)
    .then(removedTimestamp => {
      if (removedTimestamp) {
        res.status(200).json(removedTimestamp);
      } else {
        res
          .status(404)
          .json({ message: `Could not find timestamp with id ${id}` });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `There was an error while removing timestamp: ${err}` });
    });
});

module.exports = timestampRouter;
