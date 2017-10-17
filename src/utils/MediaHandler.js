import AWS from 'aws-sdk';
import request from 'request-promise-native';
import config from './../config';

export default class MediaHandler {
  constructor(...args) {
    this.args = args;

    AWS.config.update({
      accessKeyId: config.AWS.accessKeyId,
      secretAccessKey: config.AWS.secretAccessKey,
    });

    this.s3Bucket = new AWS.S3({ params: { Bucket: config.AWS.bucket } });
  }

  async handleMadia(url, redditId) {
    try {
      const result = await request
        .defaults({
          encoding: null,
          transform: (body, response, resolveWithFullResponse) => ({
            headers: response.headers,
            data: body,
          }),
        })
        .get(url);
      console.info(result.headers['content-type'], url, redditId);
      const params = {
        ACL: 'public-read',
        Key: `media/${redditId}.${url.slice(-3)}`,
        Body: result.data,
        ContentType: result.headers['content-type'],
      };
      this.s3Bucket.putObject(params).promise();
      console.info(params);
    } catch (err) {
      throw err;
    }
  }
}
