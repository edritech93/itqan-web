import { Record } from 'immutable';
import { ALERT } from '../actions/types';

const objectRecord = new Record({
});
const initialState = new objectRecord();

const app = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default app;