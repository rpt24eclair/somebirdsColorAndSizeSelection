import { check } from "k6";
import http from 'k6/http';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 150,
      maxVUs: 150,
      gracefulStop: '60s',
    },
  },
};

export default function () {
  var url = 'http://localhost:3001/shoes';
  var payload = JSON.stringify({
    "name": "Test Shoe",
    "model": 107,
    "size" : [4, 5, 6],
    "color": [1, 2, 3],
    "quantity": [{"size": 4, "color": 1, "quantity": 10}, {"size": 5, "color": 2, "quantity": 10}, {"size": 6, "color": 3, "quantity": 10}]
});
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res =   http.post(url, payload, params);
  check(res, {
    "is status 200": (r) => r.status === 200
  });
};
