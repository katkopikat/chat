const reducer = (state, action) => {
    switch (action.type) {
        case 'JOINED': 
            return {
                ...state,
                isLogin: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName,
            };

        case 'LEAVE_ROOM': 
            return {
                ...state,
                isLogin: false,
                roomId: null,
                userName: null,
            };

        case 'SET_ONLINE_USERS':
            return {
                ...state,
                users: action.payload,
            };

         case 'SET_NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        
        case 'SET_DATA':
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages
            };

        default: 
            return state;
    }
}

export default reducer;