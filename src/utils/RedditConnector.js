import Snoowrap from 'snoowrap';

// NOTE: The following examples illustrate how to use snoowrap. However, hardcoding
// credentials directly into your source code is generally a bad idea in practice (especially
// if you're also making your source code public). Instead, it's better to either (a) use a separate
// config file that isn't committed into version control, or (b) use environment variables.

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper

const getData = () => {
  const r = new Snoowrap({
    userAgent: 'NodeJs:com.example.FreeFapDev:v0.0.1 by /u/vahan_93',
    // clientId: '59dvL-q4N5YNJg',
    // clientSecret: '8Fr1PYAzUCovCVfjUEClfH49aVg',
    accessToken: 'yIgeOIBxlVWz_KRZRzha-3HoAgU',
  });
  console.log(213243124243123123123);

  // r
  //   .getHot()
  //   .map(post => post.title)
  //   .then(console.info);
  r
    .getSubreddit('gifs')
    .getNew()
    .then(data => {
      console.log(data);
    })
    .catch(err => console.info(err));
  console.info('sssssssssstarted');
  // Alternatively, just pass in a username and password for script-type apps.
  // const otherRequester = new snoowrap({
  //   userAgent: 'put your user-agent string here',
  //   clientId: 'put your client id here',
  //   clientSecret: 'put your client secret here',
  //   username: 'put your username here',
  //   password: 'put your password here',
  // });
};
export default getData;
