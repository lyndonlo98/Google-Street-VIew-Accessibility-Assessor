export const ActionTypeEnum = Object.freeze(
    {
        "sourceChange": 1, 
        "destinationChange": 2
    })

export const locationReducer = (state, action) => {
    switch(action.type) {
        case ActionTypeEnum.sourceChange:
            return action.payload;
        case ActionTypeEnum.destinationChange:
            return action.payload;
        default:
            return state;
    }
}

