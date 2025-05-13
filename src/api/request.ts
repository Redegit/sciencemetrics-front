export const baseUrl = __LOCAL__
  ? "http://localhost:5001/api/"
  : __USE_FULL_PATH__
  ? "http://46.8.232.101:5001/api/"
  : "/api/";


const truncateUrl = (url: string) => {
  if (url.startsWith("/")) {
    return url.slice(1);
  }
  return url;
};

export const createUrl = (url: string) => {
  return baseUrl + truncateUrl(url);
};

export const request = {
  get: async (url: string) => {
    const response = await fetch(createUrl(url));
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}. ${await response.text()}`);
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
      throw new Error(`Ошибка: ${response.status}. ${await response.text()}`);
    }
    return response.json();
  },
  blob: async (url: string) => {
    const response = await fetch(createUrl(url));
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}. ${await response.text()}`);
    }
    return response.blob();
  },
};
