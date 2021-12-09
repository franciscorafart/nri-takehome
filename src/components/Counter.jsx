import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Counter = ({passed, failed, running, noStart}) => {

    return (
        <CounterContainer>
            <span>Passed: {passed}</span>
            <span>Failed: {failed}</span>
            <span>Running: {running}</span>
            <span>Not stated yet: {noStart}</span>
        </CounterContainer> 
    );
}

export default Counter;