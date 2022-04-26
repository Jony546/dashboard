import React, { useState, useEffect } from "react";
import { Chart } from "./../chart";
import { Wrapper, Container } from "./dashboardStyle";
import { InstanceTable } from "./../instanceTable";
import { Call } from "./../../api";
import { apiUrl } from "./../../constants/config";

export const Dashboard = (props) => {
  const [visibleItems, setVisibleItems] = useState({
    piechart: true,
    activeTable: true,
    inactiveTable: true,
  });

  const [tableData, setTableData] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortMethod, setSortMethod] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const onSort = (sortField, sortMethod) => {
    setSortField(sortField);
    setSortMethod(sortMethod);
  };

  const toggleDashboard = (evt) => {
    const {
      target: {
        attributes: {
          tooglevalue: { value },
        },
      },
    } = evt;

    setVisibleItems((visibleItems) => ({
      ...visibleItems,
      [value]: !visibleItems[value],
    }));
  };

  const onChangePagination = (pageNumber, pageSize) => {
    if (pageNumber) {
      setPageNumber(pageNumber);
    }
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  function getTableData() {
    Call(`${apiUrl}/services`, { sortField, sortMethod, pageSize, pageNumber })
      .then((xhr, response) => {
        setTableData(xhr);
      })
      .catch((error) => {
        alert("we have some problem trying to log you in");
      });
  }

  useEffect(() => {
    getTableData();
  }, [pageSize, pageNumber, sortField, sortMethod]);

  return (
    <Wrapper>
      <h1>Dashboard</h1>
      <div className="manageContainer">
        <button
          className="manage-view"
          onClick={() => {
            const menu = document.querySelector(".toggleMenuContainer");
            const {
              style: { display },
            } = menu;
            menu.style.display =
              display && display !== "none" ? "none" : "flex";
          }}
        >
          Manage View
        </button>
      </div>
      <div className="toggleMenuContainer">
        <div className="toggleMenu">
          <div>
            <label htmlFor="piechartCheckbox">PieChart</label>
            <input
              type="checkbox"
              id="piechartCheckbox"
              toogleValue="piechart"
              checked={visibleItems.piechart}
              onChange={toggleDashboard}
            />
          </div>

          <div>
            <label htmlFor="activeTableCheckbox">Active Table</label>
            <input
              type="checkbox"
              id="activeTableCheckbox"
              toogleValue="activeTable"
              checked={visibleItems.activeTable}
              onChange={toggleDashboard}
            />
          </div>

          <div>
            <label htmlFor="inactiveTableCheckbox">Inactive Table</label>
            <input
              type="checkbox"
              id="inactiveTableCheckbox"
              toogleValue="inactiveTable"
              checked={visibleItems.inactiveTable}
              onChange={toggleDashboard}
            />
          </div>
        </div>
      </div>
      {visibleItems.piechart && (
        <Container>
          <div className="title">
            <h3>Status</h3>
            <button toogleValue="piechart" onClick={toggleDashboard}>
              hide
            </button>
          </div>
          <Chart
            data={[
              { x: "Active", y: 35 },
              { x: "Inactive", y: 40 },
            ]}
          />
        </Container>
      )}
      {visibleItems.activeTable && (
        <Container>
          <div className="title">
            <h3>Active</h3>
            <button toogleValue="activeTable" onClick={toggleDashboard}>
              hide
            </button>
          </div>

          <div className="tableContainer">
            <InstanceTable
              instances={tableData}
              onSort={onSort}
              pageSize={pageSize}
              onChangePagination={onChangePagination}
            />
          </div>
        </Container>
      )}
      {visibleItems.inactiveTable && (
        <Container>
          <div className="title">
            <h3>Inactive</h3>
            <button toogleValue="inactiveTable" onClick={toggleDashboard}>
              hide
            </button>
          </div>
          <div className="tableContainer">
            <InstanceTable />
          </div>
        </Container>
      )}
    </Wrapper>
  );
};
