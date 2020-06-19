const getData = (listType) => {
  const data = sessionStorage.getItem(listType);
  if (data) {
    return new Promise((resolve) => {
      resolve(JSON.parse(data));
    });
  } else {
    return new Promise((resolve) => {
      fetch(`/data/${listType}.json`).then(response => response.json()).then(data => {
        sessionStorage.setItem(listType, JSON.stringify(data));
        resolve(data);
      });
    });
  }
};

export default getData;