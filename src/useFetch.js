import { useState, useEffect } from "react";

export function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  /* eslint-disable no-undef */
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const APIUser = process.env.REACT_APP_API_USER;
  const apiModel = process.env.REACT_APP_API_MODEL;
  /* eslint-enable no-undef */
  const fetchData = (message) => {
    setLoading(true);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        model: apiModel,
        uuid: "sdgesfsger-safs23ed2gr3-fq4q",
        message: {
          role: "user",
          content: message,
        },
        temperature: 0.05,
        origin: "escueladata",
        tokens: 1000,
        folder: "root",
        account: "WatsonX-VN",
        user: APIUser,
      }),
    })
      .then((response) => response.json().then((data) => setData(data)))
      .finally(() => setLoading(false));
  };

  return { data, loading, fetchData };
}
