import _ from "lodash";
import { Badge } from "reactstrap";
import { monsta } from "@/helpers/render/text";
import { idDate } from "@/helpers/format/date";

export const columns = [
  {
    dataField: "question",
    text: "Pertayaan",
    sort: true,
    formatter: (cell, row) => row.attributes.question,
  },

  {
    dataField: "answers",
    text: "Jawaban",
    sort: true,
    formatter: (cell, row) =>
      row.attributes.answers.map((answer) => (
        <span>
          {answer}
          <br />
        </span>
      )),
  },
  {
    dataField: "correct_answer",
    text: "Jawaban Benar",
    sort: true,
    formatter: (cell, row) => row.attributes.correct_answer,
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
          row.attributes["status"] !== "inactive" ? "success" : "danger"
        }`}
        color={"red"}
        pill
      >
        {row.attributes["status"] !== "inactive" ? "Aktif" : "Tidak Aktif"}
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
