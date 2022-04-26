import styled from "styled-components";

export const Wrapper = styled.div`
  color: black;

  table {
    tr {
      th,
      td {
          border: 1px solid black;
      }

      td {
        min-width: 120px;
      }

      th {
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }

  .pagination {
      margin-top: 10px;

      label {
          margin-right: 5px;
      }
  }
`;
