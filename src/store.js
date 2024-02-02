import { combineReducers, createStore } from "redux"

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalID: 0,
    createdAt: "",
}

// accountReducer
function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposite":
            return { ...state, balance: state.balance + action.payload }

        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }

        case "account/requestLoan":
            if (state.loan > 0) return state;
            // LATER
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount }

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        default:
            return state;;
    }
}

// customerReducer
function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };

        case "customer/updateName":
            return { ...state, fullName: action.payload.fullName };

        default:
            return state;
    }
}

// rootReducer
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

let store = createStore(rootReducer);


store.subscribe(() => console.log(store.getState()))


// Now action creator function for account which are not necessry but a good convension
function deposite(amount) {
    return { type: 'account/deposite', payload: amount };
}
store.dispatch(deposite(500))


function withdraw(withdrawAmount) {
    return { type: 'account/withdraw', payload: withdrawAmount }
}

store.dispatch(withdraw(300))


function loanRequest(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount, purpose }
    }
}

store.dispatch(loanRequest(1000, "car buy"))


function payLoan() {
    return { type: 'account/payLoan' }
}

store.dispatch(payLoan())


// Now action creator function for customer which are not necessry but a good convension
function createCustomer(fullName, nationalID) {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

store.dispatch(createCustomer("Ahmad", "020304589239"))

function updateName(fullName) {
    return { type: 'customer/updateName', payload: { fullName } }
}

store.dispatch(updateName("Ali",))