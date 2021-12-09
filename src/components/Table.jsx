import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    border: 2px solid black;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: 1px solid gray;
    height: 40px;
`;

const Cell1 = styled.div`
    width: 60%;
    padding: 0 5px;
    border-right: 1px solid gray;
    font-weight: ${props => props.strong ? 600 : 400};
    font-size: ${props => props.strong ? '1.2em' : '1em'};
`; 

const Cell2 = styled.div`
    width: 40%;
    padding: 0 5px;
    font-weight: ${props => props.strong ? 600 : 400};
    font-size: ${props => props.strong ? '1.2em' : '1em'};
`;

const Table = ({rows}) => {
    return (
        <TableContainer>
            {[['Test', 'Status'], ...rows].map((r, idx) => 
                <Row key={r[0]}>
                    <Cell1 strong={idx === 0}><span>{r[0]}</span></Cell1>
                    <Cell2 strong={idx === 0}><span>{r[1]}</span></Cell2>
                </Row>)
            }
        </TableContainer>
    );
};

export default Table;