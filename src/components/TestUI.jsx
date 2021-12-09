import React, {useReducer} from 'react';
import styled from 'styled-components';
import Table from './Table';
import Counter from './Counter';

import Tests from '../dummyTest/tests';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
`;

const RunTest = styled.button`
    color: green;
    margin: 20px 0;
`;

const allStatus = ['Running', 'Not Started Yet', 'Passed', 'Failed'];

const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case 'start': 
            newState = [...state];
            newState[action.payload].status = 0;
            return newState;
        case 'pass': 
            newState = [...state];
            newState[action.payload].status = 2;
            return newState
        case 'fail': 
            newState = [...state];
            newState[action.payload].status = 3;
            return newState;
    }
};

const getStatusCount = (state, status) => 
    state.reduce((acc, test) => test.status === status ? acc + 1 : acc, 0)

const getBulkCount = (state, statusList) => 
    statusList.map(status => getStatusCount(state, allStatus.indexOf(status)));

const sortByStatus = (a , b) => a.status < b.status ? -1 : 1;

export default function TestUI() {
    const initialState = Tests.map(t => ({...t, status: 1}));
    const [state, dispatcher] = useReducer(reducer, initialState);

    const setStatusByIndex = idx => result =>
        dispatcher({type: result ? 'pass' : 'fail', payload: idx});


    const onRunTests = () => {
        for (const [idx, test] of state.entries()) {
            dispatcher({type: 'start', payload: idx});

            const testCallback = setStatusByIndex(idx);
            test.run(testCallback);
        }
    };

    const [passed, failed, running, noStart] = getBulkCount(state, ['Passed', 'Failed', 'Running', 'Not Started Yet']);
    const rows = [...state].sort(sortByStatus).map(
        t => [t.description, allStatus[t.status]]
    );

    return (
        <Container>
            <h1>NoRedInk dummy test</h1>
            <Table rows={rows} />
            <RunTest onClick={onRunTests}>Run tests</RunTest>
            <Counter 
                passed={passed}
                failed={failed}
                running={running}
                noStart={noStart}
            />
            {running === 0 && noStart === 0 && <h3>Finished!</h3>}
        </ Container>
    );
}