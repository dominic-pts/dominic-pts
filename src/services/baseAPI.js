class BaseAPI {
  constructor(baseURL) {
    this.baseURL = baseURL || process.env.REACT_APP_API_ENDPOINT;
  }

  setBaseURL(newBaseURL) {
    this.baseURL = newBaseURL;
  }

  async request(url, method, payload = null, customHeaders = {}) {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
    };

    if (payload) {
      config.body = JSON.stringify(payload);
    }

    const response = await fetch(`${this.baseURL}${url}`, config);
    const result = await response.json();

    return result;
  }

  async get(url, customHeaders = {}) {
    return this.request(url, "GET", null, customHeaders);
  }

  async post(url, payload, customHeaders = {}) {
    return this.request(url, "POST", payload, customHeaders);
  }

  async put(url, payload, customHeaders = {}) {
    return this.request(url, "PUT", payload, customHeaders);
  }

  async delete(url, customHeaders = {}) {
    return this.request(url, "DELETE", customHeaders);
  }
}

export default BaseAPI;
