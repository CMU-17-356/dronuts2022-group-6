function setupFetchStub(data: any) : any {
  return function fetchStub() {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            'data': data,
          }),
      });
    });
  };
}

export default setupFetchStub;
