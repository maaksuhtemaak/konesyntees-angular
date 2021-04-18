const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/event', (req, res, next) => {
    db.query(
      'INSERT INTO prompts (service, prompt, created, removed) VALUES (?,?,?,?)',
      [req.body.service, req.body.prompt, new Date(req.body.created), req.body.removed],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  
  router.get('/event', function (req, res, next) {
    db.query(
      'SELECT id, service, prompt, created FROM prompts where removed is null',
      [req.params.page],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.delete('/event/:id', function (req, res, next) {
    db.query(
      'DELETE FROM prompts WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  
  return router;
}

module.exports = createRouter;