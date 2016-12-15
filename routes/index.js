const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

router.use('/api/v1', require('./api'));
router.use('/admin', require('./admin'));
router.use('/embed', require('./embed'));

router.get('/', csrfProtection, (req, res) => {
  return res.render('article', {
    title: 'Coral Talk',
    basePath: '/client/embed/stream',
    csrfToken: req.csrfToken()
  });
});

router.get('/assets/:asset_title', csrfProtection, (req, res) => {
  return res.render('article', {
    title: req.params.asset_title.split('-').join(' '),
    basePath: '/client/embed/stream',
    csrfToken: req.csrfToken()
  });
});

module.exports = router;
