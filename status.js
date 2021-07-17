import { sleep, check } from "k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 200ms
  },
};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export default function () {
  let res = http.get("https://saintschoice.herokuapp.com/");
  check(res, {
    "is status 200": (r) => r.status === 200,
    "text verification": (r) => r.body.includes("The Story Started"),
    "text verification": (r) => r.body.includes("Portfolio"),
  });
  sleep(Math.random() * 5);
}
