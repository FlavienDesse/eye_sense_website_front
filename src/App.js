import React from 'react';
import SocketIO from 'socket.io-client'

function App() {

    let socket = SocketIO(process.env["REACT_APP_API_URL"])

    return (
        <div>

        </div>
    );
}

export default App;
