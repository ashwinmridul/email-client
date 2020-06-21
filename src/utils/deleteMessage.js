const deleteMessage = (listType, mId) => {
  const data = JSON.parse(sessionStorage.getItem(listType));
  
  if (listType === 'deleted') {
    sessionStorage.setItem(listType, JSON.stringify(data.filter(item => item.mId !== mId)));
    return;
  }
  
  const messasge = data.find(item => item.mId === mId);
  sessionStorage.setItem(listType, JSON.stringify(data.filter(item => item.mId !== mId)));
  const deleted = JSON.parse(sessionStorage.getItem('deleted'));
  deleted.push(messasge);
  sessionStorage.setItem('deleted', JSON.stringify(deleted));
};

export default deleteMessage;