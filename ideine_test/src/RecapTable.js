import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

export default function recapTable(checkBoxControl, row, which) {
    for (let i = 0; i < checkBoxControl.length; i++) {
        recapTable(checkBoxControl[i].children, row, which);
        if (checkBoxControl[i].checked[which]) {
            row.push(
                <TableRow key={checkBoxControl[i].key}>
                    <TableCell>{checkBoxControl[i].key}</TableCell>
                </TableRow>
            )
        }
    }
    return row;
}