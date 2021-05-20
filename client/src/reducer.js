const reducer =  (state, action) => {
    switch (action.type) {
        case 'JOINED': 
            return {
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName,
            };
        case 'SET_ONLINE_USERS':
            return {
                 ...state,
                users: action.payload.users,
            };

         case 'SET_NEW_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload.messages]
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