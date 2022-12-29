import React, { useEffect } from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Card } from "primereact/card";
import { useDispatch, useSelector } from "react-redux";
import {
  entitiesMetrics,
  fetchMetrics,
  loadingEntitiesMetrics
} from "@store/dashboard/slice";
import { ProgressSpinner } from "primereact/progressspinner";

function Dashboard() {
  const dispatch = useDispatch();

  const loadingEntitiesMetricsSelector =
    useSelector(loadingEntitiesMetrics) ?? false;
  const entitiesMetricsSelector = useSelector(entitiesMetrics) ?? [];

  useEffect(() => {
    if (!entitiesMetricsSelector.length) {
      dispatch(fetchMetrics({}));
    }
  }, []);

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2">
        <h1>Hello Dashboard</h1>

        <h3>
          <a
            href={`${process.env.NEXT_PUBLIC_API_END_POINT}api/management/logfile`}
            target={"_blank"}>
            Show log file
          </a>
        </h3>

        {loadingEntitiesMetricsSelector ? (
          <div className="flex">
            <div className="flex-1 flex align-items-center justify-content-center font-bold text-white m-2 px-5 py-3 border-round">
              <ProgressSpinner />
            </div>
          </div>
        ) : (
          <div className="flex">
            {entitiesMetricsSelector.map((item: any, index: number) => (
              <div
                key={`index-${index}`}
                className="flex-1 flex align-items-center justify-content-center bg-gray-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
                <Card title={item.name} subTitle={item.value}>
                  <p className="m-0">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        )}

        <div>Monitoring App with Micrometer, Prometheus</div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
