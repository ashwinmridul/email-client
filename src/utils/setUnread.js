const setUnread = (listType, mId) => {
  return new Promise((resolve) => {
    const data = JSON.parse(sessionStorage.getItem(listType));
    data.find(item => item.mId === mId).unread = false;
    sessionStorage.setItem(listType, JSON.stringify(data));
    resolve('');
  });
};

export default setUnread;