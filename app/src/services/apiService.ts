const apiMain = 'https://swapi.co/api';
const apiPeople = `${apiMain}/people/`;

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
  let resultPeoples: object[] = [];

  const mkRequest: any = (url: string) =>
    makeGetFetch(url)
      .then((res: any) => res.json())
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

const getPeopleData = (peopleId: number) => {
  const peopleUrl = `${apiPeople}${peopleId}`;

  return makeGetFetch(peopleUrl)
    .then((data: any) => data.json())
    .then((data: any) => {
      const requestFieldsKeys: string[] = [];

      const isDataLinkField = (key: string, value: any) => {
        if (typeof value !== 'string') {
          return false;
        }

        if (key === 'url') {
          return false;
        }

        return value.match(apiMain);
      };

      const isArrayDataLinkField = (key: string, value: any) => {
        if (Array.isArray(value) && value.length) {
          const filteredValue = value.filter(
              (el: any) => typeof el === 'string' && el.match(apiMain),
          );

          return filteredValue.length;
        }

        return false;
      };

      Object.entries(data).forEach(([key, value]) => {
        if (isDataLinkField(key, value)) {
          requestFieldsKeys.push(key);
        }

        if (isArrayDataLinkField(key, value)) {
          requestFieldsKeys.push(key);
        }
      });

      if (requestFieldsKeys.length === 0) {
        return Promise.resolve(data);
      }

      return Promise.all(
        requestFieldsKeys.map((key: string) => {
          if (Array.isArray(data[key])) {
            return Promise.all(
              data[key].map((link: string) => makeGetFetch(link).then((res: any) => res.json())),
            );
          }

          return makeGetFetch(data[key]).then((res: any) => res.json());
        }),
      ).then((arr: any) => {
        requestFieldsKeys.forEach((key: string, index: number) => {
          data[key] = arr[index];
        });

        return data;
      });
    });
};

export { getPeoples, getPeopleData };
