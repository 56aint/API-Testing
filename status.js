import { sleep, check } from "k6";
import http from "k6/http";

export let options = {
  vus: 10,
  duration: "5m",
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 200ms
  },
};

export default function () {
  let res = http.get("https://saintschoice.herokuapp.com/");
  check(res, {
    "is status 200": (r) => r.status === 200,
    "text verification": (r) => r.body.includes("The Story Started"),
    "text verification": (r) => r.body.includes("Portfolio"),
  });
  sleep(Math.random() * 5);
}
