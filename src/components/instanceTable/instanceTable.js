import React, { useEffect, useState } from "react";
import { Wrapper } from "./instanceStyles";

export const InstanceTable = ({
  instances = [],
  onSort,
  onChangePagination,
  pageSize,
}) => {
  const orderStatusIcons = ["", "🔽", "🔼"];
  const headers = instances.length ? Object.keys(instances[0]) : null;
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(pageSize);

  const onClickHeader = (evt) => {
    const {
      target: {
        attributes: {
          header: { value: header },
          orderStatus: { value: orderStatus },
        },
      },
    } = evt;

    const nextOrderStatus = orderStatus > 1 ? 0 : parseInt(orderStatus) + 1;

    evt.target.innerHTML = `${header} ${orderStatusIcons.at(nextOrderStatus)}`;
    evt.target.setAttribute("orderStatus", nextOrderStatus);

    if (nextOrderStatus !== 0) {
      onSort(header, nextOrderStatus === 1 ? "descendent" : "ascendant");
    }
  };

  const changePage = (evt) => {
    const {
      target: { value },
    } = evt;

    if (value === "back") {
      if (currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        onChangePagination(newPage);
      }
    } else if (value === "forward") {
      console.log("entro", value, currentPage, totalPages);
      if (currentPage < totalPages) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        onChangePagination(newPage);
      }
    }
  };

  const changePageSize = (evt) => {
    const {
      target: { value },
    } = evt;
    setPaginationSize(value);
    onChangePagination(null, value);
  };

  useEffect(() => {
    setTotalPages(Math.round(500 / (paginationSize || pageSize)));
  }, [paginationSize]);

  return (
    <Wrapper>
      {instances.length ? (
        <div>
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={`th-&${header}`}
                    onClick={onClickHeader}
                    header={header}
                    orderStatus={0}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {instances.map((instance, i) => (
                <tr key={`tr-${i}`}>
                  {Object.values(instance).map((instanceValue, index) => {
                    return (
                      <td key={`td-${instanceValue}-${index}`}>
                        {typeof instanceValue != "boolean"
                          ? instanceValue
                          : instanceValue.toString().toUpperCase()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {
              <div>
                <button onClick={changePage} value="back">
                  {"<"}
                </button>
                {` page ${currentPage} `}
                <button onClick={changePage} value="forward">
                  {">"}
                </button>
              </div>
            }
            <label htmlFor="pageNumbers">Number of services per page</label>
            <select
              id="pageNumbers"
              onChange={changePageSize}
              value={paginationSize}
            >
              <option value={10}>show 10</option>
              <option value={20}>show 20</option>
              <option value={50}>show 50</option>
            </select>
          </div>
        </div>
      ) : (
        "NO DATA TO DISPLAY"
      )}
    </Wrapper>
  );
};
