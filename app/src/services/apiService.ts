const apiPeople = 'https://swapi.co/api/people/';

const makeGetFetch = (url: string, { searchParams = {} } = {}) => {
  const requestUrl = new URL(url);

  const isEmptyObj = (searchParams: any) => Object.keys(searchParams).length;

  if (isEmptyObj(searchParams)) {
    Object.entries(searchParams).forEach((key, value) => {
      requestUrl.searchParams.set(String(key), String(value));
    });
  }

  const request = new Request(requestUrl.toString(), { method: 'GET' });

  return fetch(request);
};

const getPeoples = () => {
  let resultPeoples: Array<object> = [];

  const mkRequest: any = (url: string) =>
    makeGetFetch(url)
      .then(res => res.json())
      .then((data: any) => {
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
    (error: string) => ({
      data: resultPeoples,
      error,
    }),
  );
};

export { getPeoples };
