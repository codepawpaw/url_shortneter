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
    it('given modified url should return original url', async () => {
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
      };

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expectedData)
    });

    it('given not exists modified url should return 404 ', async () => {
      const stubUrl = "stub-modified-url"

      const res = await request(app)
        .get(`/api/url_shorteners/${stubUrl}`)
        .send()

      expect(res.statusCode).toEqual(404);
    })

    it('given 3 request should return 403 in the 3rd request', async () => {
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
      };

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expectedData)

      //===================
      const res2 = await request(app)
        .get(`/api/url_shorteners/${stubUrl}`)
        .send()
      expect(res2.statusCode).toEqual(200)
      expect(res2.body).toEqual(expectedData)

      //===================
      const res3 = await request(app)
        .get(`/api/url_shorteners/${stubUrl}`)
        .send()
      expect(res3.statusCode).toEqual(403)
    })
  });

  describe('#post', () => {
    it('given valid data should save modified url to database', async () => {
      const res = await request(app)
        .post(`/api/url_shorteners`)
        .send({
          original_url: 'stub-original-url'
        });

      const expectedData = await ShortenUrl.findOne({
        where: {
          original_url: 'stub-original-url'
        }
      });

      expect(res.statusCode).toEqual(200);
      expect(expectedData.original_url).toEqual('stub-original-url');
    });

    it('given duplicate original url should not save multiple original url to database', async () => {
      await ShortenUrl.create({
        original_url: 'stub-original-url',
        modified_url: 'stub-modified-url'
      })

      const res = await request(app)
        .post(`/api/url_shorteners`)
        .send({
          original_url: 'stub-original-url'
        });

      const expectedData = await ShortenUrl.findAll({
        where: {
          original_url: 'stub-original-url'
        }
      });

      expect(res.statusCode).toEqual(200);
      expect(expectedData.length).toEqual(1);
      expect(expectedData[0].original_url).toEqual('stub-original-url');
      expect(expectedData[0].modified_url).toEqual('stub-modified-url');
    });
  });
})