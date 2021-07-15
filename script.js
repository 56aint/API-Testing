//import { check } from 'k6'; // used in another file
import http from 'k6/http';  //step one, basic
import { sleep } from 'k6';  //step one, basic

/**
 * It’s always a good idea to pace out your VUs by adding a sleep statement at the end of the default function. This simulates how real users use your system. You can set the value lower to 0.1 for simulating aggressive behaviors. If you intend to simulate users that constantly call your API, simply remove the sleep statement.
 */

// 1. !st test of my  API with 10 VUs and a duration of 5s
export let options = {
  vus: 10,
  duration: '5s',
};
/**
 * Add the export default function below and run 'k6 run script.js'
 */

// 2. 2nd test of my API is to ramp up and down the VU levels. I configured it to run in stages as follows:

/**export let options = {
  stages: [
    { duration: '10s', target: 20 },  // Going from 1 to 20 VUs for the first 10 seconds
    { duration: '1m10s', target: 10 }, // Slowly transitioning to 10 VUs in the next 70 seconds
    { duration: '10s', target: 0 }, //Going from 10 to 0 VUs in the last 10 seconds
  ],
};*/


// 3. Options (load testing): I ramped up the VU to a good amount and maintain it for a fixed period of time before ramping it down to 0.
/** export let options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 0 },
  ],
};
*/

// 4. Options (stress testing): constant ramping up of VUs gradually over a period of time. I started with 100 VUs and then increment it by 100 VUs each time. Then, you ramp it down as part of the recovery phase.
/**export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '1m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '1m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '5m', target: 0 },
  ],
};
 */

// 5. Options (Spike testing): aims to overwhelm my API with a sudden surge of a load within a short period of time.

/** export let options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '10s', target: 1000 },
    { duration: '2m', target: 1000 },
    { duration: '10s', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};
*/

// Checks: k6 provides a way to assert the returned response. It’s called check. Open 'status.js' for an example.



export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

