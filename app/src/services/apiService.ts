const apiPeople = 'https://swapi.co/api/people/';

const makeGetFetch = (url, { searchParams = {} } = {}) => {
  const requestUrl = new URL(url);

  const isEmptyObj = searchParams => Object.keys(searchParams).length;

  if (isEmptyObj(searchParams)) {
    Object.entries(searchParams).forEach((key, value) => {
      requestUrl.searchParams.set(String(key), String(value));
    });
  }

  const request = new Request(requestUrl.toString(), { method: 'GET' });

  return fetch(request);
};

const getPeoples = () => {
  let resultPeoples = [];

  const mkRequest = url =>
    makeGetFetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          resultPeoples = [...resultPeoples, ...data.results];
        }

        if (data.next) {
          return mkRequest(data.next);
        }
      });

  return mkRequest(apiPeople).then(
    () => ({
      data: resultPeoples,
      error: null,
    }),
    () => error => ({
      data: resultPeoples,
      error,
    }),
  );
};

export { getPeoples };
