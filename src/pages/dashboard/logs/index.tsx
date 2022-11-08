import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { entitiesLogs, fetchLogs } from "@store/dashboard/slice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function Logs() {
  const dispatch = useDispatch();
  const [logs, setLogs] = React.useState<any[]>([]);
  // const [filters, setFilters] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const entitiesLogsSelector = useSelector(entitiesLogs) ?? [];

  React.useEffect(() => {
    setLoading(true);
    dispatch(
      fetchLogs({
        page: 0,
        size: 20,
        queryParams: ""
      })
    );
  }, []);

  React.useEffect(() => {
    if (entitiesLogsSelector?.loggers) {
      const loggers = Object.entries(
        entitiesLogsSelector.loggers
      ).map((e: any) => ({ name: e[0], level: e[1].effectiveLevel }));
      setLogs(loggers);
      setLoading(false);
    }
  }, [entitiesLogsSelector]);

  React.useEffect(() => {
    console.log("logs ", logs);
  }, [logs]);

  // const changeLevel = (loggerName: string, level: string) => () => dispatch(changeLogLevel(loggerName, level));
  // const getClassName = (level, check, className) => (level === check ? `btn btn-sm btn-${className}` : '');

  const representativeBodyAcitvityTemplate = (logger: any) => {
    console.log("logger ", logger);
    return (
      <span className="p-buttonset">
        <Button label={"TRACE"} className={"p-button-text p-button-info"} />
        <Button label={"DEBUG"} className={"p-button-text p-button-success"} />
        <Button label={"WARN"} className={"p-button-text p-button-warning"} />
        <Button label={"ERROR"} className={"p-button-text p-button-danger"} />
        <Button label={"OFF"} className={"p-button-text p-button-secondary"} />
      </span>
    );
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2">
        <h1>Logs</h1>
        <p>There are {logs.length} loggers.</p>
        <div className="card">
          <DataTable
            value={logs}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            // filters={filters}
            filterDisplay="row"
            loading={loading}
            responsiveLayout="scroll"
            globalFilterFields={["name"]}
            // header={header}
            emptyMessage="No customers found.">
            <Column
              header="Name"
              filterField="name"
              field="name"
              filter
              filterPlaceholder="Search by Name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Level"
              body={representativeBodyAcitvityTemplate}
              style={{ minWidth: "12rem" }}
            />
          </DataTable>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Logs;
