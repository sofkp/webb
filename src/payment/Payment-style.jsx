import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  color: #231123;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

export const PaymentsContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #82204a;
  color: #fff;
`;

export const TableRow = styled.tr`
&:nth-child(even) {
  background-color: #f9f9f9;
}
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
`;