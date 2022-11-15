const RestResponder = require('../helpers/rest_responder');
const { ShortenUrl } = require("../sequelize");
const shortid = require('shortid')

const rate_limiter_hash = {

}

module.exports.get = async (req, res) => {
  try {
    res.set({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });

    const modifiedUrl = req.params.modified_url;

    const limitData = rate_limiter_hash[modifiedUrl]

    if (limitData && limitData > 3) {
      res.status(403).json({});
      return;
    }
    
    if (!limitData) {
      rate_limiter_hash[modifiedUrl] = 1
    } else {
      if (limitData && limitData > 3) {
        res.status(403).json({});
        return;
      }
      rate_limiter_hash[modifiedUrl] = limitData + 1
    }

    const data = await ShortenUrl.findOne({
      where: {
        modified_url: modifiedUrl
      }
    });

    if (!data) {
      res.status(404).json({});

      return;
    }

    const response = {
      original_url: data.original_url
    };

    res.status(200).json(response);

    return;
  } catch (error) {
    RestResponder.serverError(res, 500, error);
  }
};

module.exports.post = async (req, res) => {
    try {
      res.set({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      });

      const {
        original_url
      } = req.body;

      const existingData = await ShortenUrl.findOne({
        where: {
          original_url: original_url
        }
      });

      if (existingData) {
        res.status(200).json({});
        return;
      }

      let urlCode = shortid.generate();
      let shortUrl = "shortify" + "/" + urlCode;

      await ShortenUrl.create({
        original_url: original_url,
        modified_url: shortUrl
      });
  
      res.status(200).json({});
    } catch (error) {
      RestResponder.serverError(res, 500, error);
    }
};
