export default class Network {
  fetchCountryData = async (country, indicator, startYear, endYear) => {
    const response = await fetch(
      `http://localhost:8080/${encodeURIComponent(
        country
      )}?indicator=${encodeURIComponent(
        indicator
      )}&startYear=${startYear}&endYear=${endYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  };

  fetchIndicatorNames = async () => {
    const response = await fetch("http://localhost:8080/indicators", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  fetchCountryNames = async () => {
    const response = await fetch("http://localhost:8080/countries", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

  loggingIn = async (email, password) => {
    const body = {
      email,
      password,
    };

    const response = await fetch("http://localhost:8080/sessions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response;
  };
}
