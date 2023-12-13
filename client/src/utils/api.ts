const apiPort = process.env.REACT_APP_API_PORT;
const apiUrl = process.env.REACT_APP_API_URL;

export const getDataFromServer = async <R>(
  url: string,
  params: Record<string, string | number | boolean>
): Promise<R> => {
  const urlParams = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const fetchIrl = new URL(`${apiUrl}:${apiPort}/${url}`);
  fetchIrl.search = urlParams;
  const fetchParams: RequestInit = {
    method: "GET",
  };
  const response = await window.fetch(fetchIrl, fetchParams);

  const { data, error } = await response.json();

  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(error));
  }
};

export const postDataToServer = async <R>(
  url: string,
  body: Object
): Promise<R> => {
 
  const fetchIrl = new URL(`${apiUrl}:${apiPort}/${url}`);

  const fetchParams: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
  },
  };
  const response = await window.fetch(fetchIrl, fetchParams);

  const { data, error } = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(error));
  }
};