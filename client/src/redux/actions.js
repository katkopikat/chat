export const setOnLogin = (obj) => ({
      type: 'JOINED',
      payload: obj,
});

export const setData = (data) => ({
      type: 'SET_DATA',
      payload: data,
});

export const setUsers = (users) => ({
      type: 'SET_ONLINE_USERS',
      payload: users,
});


export const setMessage = (msgs) => ({
      type: 'SET_NEW_MESSAGE',
      payload: msgs,
});

export const setUserLeaveRoom = () => ({
      type: 'LEAVE_ROOM',
      payload: null
});