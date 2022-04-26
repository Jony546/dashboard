import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 15px;
  position: relative;

  .toggleMenuContainer {
    width: 100%;
    display: none;
    justify-content: flex-end;
    position: absolute;

    .toggleMenu {
      background-color: slategray;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      z-index: 1;

      div {
          margin 2px;
      }
    }
  }

  .manageContainer {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .manage-view {
        margin-bottom: 2px;
    }
  }

  .VictoryContainer {
    height: 400px !important;
  }

  .tableContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
`;

export const Container = styled.div`
  color: lightcoral;
  border: 1px solid lightgray;
  border-radius: 7px;
  margin-bottom: 20px;

  .title {
    background-color: lightgray;
    display: flex;
    justify-content: center;
    width: 100%;

    h3 {
      width: 100%;
    }

    button {
      height: 20px;
      margin: 5px;
    }
  }
`;
