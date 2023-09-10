import _ from "lodash";
import { Badge } from "reactstrap";
import { monsta } from "@/helpers/render/text";
import { toDatetime24, idDate } from "@/helpers/format/date";

export const columns = [
  {
    dataField: "image",
    text: "Gambar",
    sort: false,
    formatter: (cell, row) =>
      row.attributes?.image?.url && (
        <div className="d-flex justify-content-center align-items-start">
          <img style={{ width: "170px" }} src={row.attributes?.image.url} />
        </div>
      ),
    headerStyle: (colum, colIndex) => {
      return { width: "100px", textAlign: "center" };
    },
  },
  {
    dataField: "title",
    text: "Nama",
    sort: true,
    formatter: (cell, row) => (
      <>
        <h6>{row.attributes.title}</h6>
        {row.attributes.address && <p>{row.attributes.address}</p>}
        {row.attributes.map_link && (
          <a href={row.attributes.map_link} target="_blank">
            Get Direction
          </a>
        )}
      </>
    ),
  },
  {
    dataField: "duration",
    text: "Durasi",
    sort: true,
    formatter: (cell, row) => row.attributes.duration,
  },
  {
    dataField: "event_at",
    text: "Tanggal Acara/Event",
    sort: true,
    formatter: (cell, row) => toDatetime24(row.attributes.event_at),
  },
  {
    dataField: "start_date",
    text: "Tanggal Mulai",
    sort: true,
    formatter: (cell, row) => idDate(row.attributes.start_date),
  },
  {
    dataField: "end_date",
    text: "Tanggal Selesai",
    sort: true,
    formatter: (cell, row) => idDate(row.attributes.end_date),
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    formatter: (cell, row) => (
      <Badge
        className={` font-size-12 badge-soft-${
          row.attributes["status"] ? "success" : "danger"
        }`}
        color={"red"}
        pill
      >
        {row.attributes["status"] ? "Aktif" : "Tidak Aktif"}
      </Badge>
    ),
  },
  {
    dataField: "reward_amount",
    text: "Reward MONSTA",
    sort: true,
    formatter: (cell, row) => monsta(row.attributes?.reward_amount),
  },
];

export const selectRow = (setSelectedId) => ({
  mode: "radio",
  clickToSelect: true,
  hideSelectColumn: false,
  bgColor: "rgba(239, 242, 247, 0.5)",
  onSelect: (row) => {
    setSelectedId(row);
  },
});
