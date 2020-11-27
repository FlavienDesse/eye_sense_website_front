export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                isConnected : true,
                socket:action.payload.socket
            };
        default:
            return state;
    }
};
