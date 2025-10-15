import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import ProductService from "./services/ProductData";
import type { DataType, APIResult } from "./types";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedIds } from "./store/selectedRowsSlices";

function App() {
  // Paging state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState<DataType | null>(null);
  const [rowClick, setRowClick] = useState(true);


  const [products, setProducts] = useState<DataType[]>([]);

  const dispatch = useDispatch();
  const globalSelectedIds: number[] = useSelector((state: any) => state.selectedRows?.selectedIds ?? []);


  useEffect(() => {
    const pageNum = Math.floor(first / rows) + 1;
    async function fetchProducts() {
      const result: APIResult = await ProductService(`https://api.artic.edu/api/v1/artworks?page=${pageNum}`);
      setProducts(result.data);
      setTotalRecords(Number(result.pageInfo.total));
    }
    fetchProducts();
  }, [first, rows]);

  const handleOnPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const selectedRowsThisPage = products.filter(row => globalSelectedIds.includes(row.id));

  // On selection/deselection in checkbox (multi) mode
  const handleSelectionChange = (e: any) => {
    const currIds = products.map(row => row.id);
    let updated = globalSelectedIds.filter((id:any) => !currIds.includes(id));
    updated = [...updated, ...e.value.map((row: DataType) => row.id)];
    dispatch(setSelectedIds(Array.from(new Set(updated))));
  };

  return (
    <div className="card bg-white rounded-xl shadow-lg p-8 mx-auto max-w-5xl">
      <div className="bg-gray-100 flex justify-content-center items-center mb-4 gap-2">
        <InputSwitch
          inputId="input-rowclick"
          checked={rowClick}
          onChange={e => setRowClick(e.value)}
        />
        <label htmlFor="input-rowclick" className="ml-2">Single Row Select</label>
      </div>
      {rowClick ? (
        <DataTable
          value={products}
          selectionMode="single"
          selection={selectedProduct}
          onSelectionChange={(e: any) => setSelectedProduct(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
          rowClassName={() => "bg-white border-b border-gray-200 hover:bg-gray-50"}
        >
          <Column selectionMode="single" headerStyle={{ width: "3rem" }} />
          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Place of Origin" />
          <Column field="artist_display" header="Artist Display" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="Date Start" />
          <Column field="date_end" header="Date End" />
        </DataTable>
      ) : (
        <DataTable
          value={products}
          selectionMode="checkbox"
          selection={selectedRowsThisPage}
          onSelectionChange={handleSelectionChange}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
          rowClassName={() => "bg-white border-b border-gray-200 hover:bg-gray-50"}
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          <Column field="title" header="Title" />
          <Column field="place_of_origin" header="Place of Origin" />
          <Column field="artist_display" header="Artist Display" />
          <Column field="inscriptions" header="Inscriptions" />
          <Column field="date_start" header="Date Start" />
          <Column field="date_end" header="Date End" />
        </DataTable>
      )}
      <hr />
      <div className="card">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[12, 24, 48]}
          onPageChange={handleOnPageChange}
          template="PrevPageLink PageLinks NextPageLink CurrentPageReport"
          currentPageReportTemplate="Page {currentPage} of {totalPages}"
        />
      </div>
    </div>
  );
}

export default App;
