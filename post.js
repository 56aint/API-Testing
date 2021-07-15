import http from 'k6/http';

export default function () {
  const url = 'http://localhost/5000/posts';
  const payload = JSON.stringify({
     title: "VEGAS-2019", 
    message: "Family photo", 
    creator: "Aaron", 
    tags: "none" ,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  /**
   * If you are instead to test it on a form-data submission. Simply change the content type to application/x-www-form-urlencoded.
   */

  http.post(url, payload, params);
}