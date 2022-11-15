const RestResponder = require('../helpers/rest_responder');
const { ShortenUrl } = require("../sequelize");

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

    const data = await ShortenUrl.findOne({
      where: {
        modified_url: modifiedUrl
      }
    });

    const response = {
      original_url: data.original_url
    }

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
  
      RestResponder.success(res, 200, {}, '');
    } catch (error) {
      RestResponder.serverError(res, 500, error);
    }
};
