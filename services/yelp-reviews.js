const axios = require('axios');
require('isomorphic-fetch');

// let config = {authorization: "Bearer hq-tdYBktVErWr_l7snUp68Cg0SbKFAerayqwBj7VwQEgQ-6DbW27sEpY_5BgtI13zs3k4iM6PkuUI81NKGkloshbiZtNNavwk7JqIcbIdTst49z7XjMYa4ySz80XHYx"}
// function getReviews(req, res, next) {
//   console.log('axios');
//   axios.get('https://api.yelp.com/v3/businesses/e-and-e-automotive-services-houston/reviews', {headers: {authorization: "Bearer hq-tdYBktVErWr_l7snUp68Cg0SbKFAerayqwBj7VwQEgQ-6DbW27sEpY_5BgtI13zs3k4iM6PkuUI81NKGkloshbiZtNNavwk7JqIcbIdTst49z7XjMYa4ySz80XHYx"}})
//   .then(res => {
//     // console.log(res.data);
//   }).catch((err) => {
//     if(err) {
//       console.log("err " + err);
//     }
//   })
//   next();
// }

function getReviews(req, res, next) {
  fetch('https://api.yelp.com/v3/businesses/e-and-e-automotive-services-houston/reviews', {
    headers: {
      authorization: "Bearer hq-tdYBktVErWr_l7snUp68Cg0SbKFAerayqwBj7VwQEgQ-6DbW27sEpY_5BgtI13zs3k4iM6PkuUI81NKGkloshbiZtNNavwk7JqIcbIdTst49z7XjMYa4ySz80XHYx"
    }
  })
  .then(response => response.json())
  .then(response => {
    res.locals.reviews = response.reviews;
    // console.log(response.reviews);
    next();
  })
}

module.exports = {
  getReviews: getReviews
}
