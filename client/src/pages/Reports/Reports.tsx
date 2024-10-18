import { TableStickyHeader } from "../../components/TableStickyHeader/TableStickyHeader";
import { useGetReportsQuery } from "../../features/report/reportApiSice";

export default function MyReports() {
  const { data } = useGetReportsQuery([]);

  console.log(data);

  return <>{data && <TableStickyHeader reports={data} />}</>;
}
