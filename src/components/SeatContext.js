import React from 'react';
//Used to subscribe to the data held within this context
export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
};

function reducer(state,action){
    switch (action.type){
        case 'receive-seat-info-from-server':
            return {
                //This puts all the initial values of the state and we will write over them
                ...state,
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
            };
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}

export const SeatProvider = ({children}) => {
    const [state, dispatch] = 
    React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = (data) => {
        dispatch({
            type: 'receive-seat-info-from-server', ...data
        });
    };
    
    return (
    <SeatContext.Provider
        value={{
            state,
            actions:{
                receiveSeatInfoFromServer,
            }
        }}
    >
            {children}
        </SeatContext.Provider>
    );
};

