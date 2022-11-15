const request = require('supertest');
const app = require('../index');
const { ShortenUrl } = require("../sequelize");

describe('Shorten Url API', () => {
  beforeEach(() => {
    ShortenUrl.destroy({
      where: {},
      truncate: true
    })
  });

  describe('#get', () => {
    it('should return shorten url when ', async () => {
      const stubUrl = "stub-modified-url"

      await ShortenUrl.create({
        original_url: "stub-original-url",
        modified_url: stubUrl
      });

      const res = await request(app)
        .get(`/api/url_shorteners/${stubUrl}`)
        .send()

      const expectedData = {
        original_url: "stub-original-url"
      }

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expectedData)
    })
  });
})