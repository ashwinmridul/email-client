const setFlag = (listType, mId, flag) => {
  const data = JSON.parse(sessionStorage.getItem(listType));
  data.find(item => item.mId === mId).flagged = flag;
  sessionStorage.setItem(listType, JSON.stringify(data));
};

export default setFlag;