const baseUrl = "http://46.8.232.101:5001/api/";
// const baseUrl = "http://localhost:5001/api/";

const truncateUrl = (url: string) => {
  if (url.startsWith("/")) {
    return url.slice(1);
  }
  return url;
};

const createUrl = (url: string) => {
  return baseUrl + truncateUrl(url);
};

export const request = {
  get: async (url: string) => {
    const response = await fetch(createUrl(url));
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  },
  post: async (url: string, body: object) => {
    const response = await fetch(createUrl(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    return response.json();
  },
};
