import _ from "lodash";
import { Badge } from "reactstrap";
import { monsta } from "@/helpers/render/text";
import { idDate } from "@/helpers/format/date";

export const columns = [
  {
    dataField: "clue",
    text: "Petunjuk",
    sort: true,
    formatter: (cell, row) => row.attributes.clue,
  },
  {
    dataField: "image",
    text: "Gambar",
    sort: false,
    formatter: (cell, row) => (
      <div className="d-flex justify-content-center align-items-start">
        <img style={{ width: "170px" }} src={row.attributes?.image.url} />
      </div>
    ),
    headerStyle: (colum, colIndex) => {
      return { width: "100px", textAlign: "center" };
    },
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
