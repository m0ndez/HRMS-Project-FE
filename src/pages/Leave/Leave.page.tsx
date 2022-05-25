import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Fab,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { get, noop } from "lodash";
import dateUtils from "utils/date";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { responseCode } from "constants/response";
import { ExportToolbar } from "components";

const translateLeaveRemark: { [key in string]: string } = {
  "1": "ลากิจ",
  "2": "ลาป่วย",
  "3": "ลาครึ่งวัน",
};

const constants = {
  pageTitle: "รายการข้อมูล",
  createTime: "ลงข้อมูลการลางาน",
  backBtn: "ย้อนกลับ",
  emptyData: "ไม่พบข้อมูล",
  pageRemark: "ตารางข้อมูลประวัติการลางาน",
  cancelLeave: "ยกเลิกการลา",
  helperText: "การลางานไม่สามารถยกเลิกได้หากได้ทำการอนุมัติแล้ว",
};

const translateColumn: { [type in keyof IResponseGetLeavesheet]: string } = {
  leaveId: "เลขที่เอกสาร",
  leaveApproved: "สถานะการอนุมัติ",
  leaveCreated: "วันที่สร้างเอกสาร",
  leaveStart: "วันที่ลางาน",
  leaveEnd: "วันที่สิ้นสุดการลางาน",
  leaveRemark: "หมายเหตุ",
  leaveCreatedBy: "รหัสหนักงาน",
};

export default (({
  getAllLeavesheet,
  leavesheetCode = 0,
  leavesheetError = "",
  leavesheetIsFetching = false,
  deletedLeavesheetCode = 0,
  clearDeleteTimesheet = () => {
    noop();
  },
  deleteLeavesheet = () => {
    noop();
  },
  deletedLeavesheetIsFetching = false,
  ...props
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    getAllLeavesheet();
    return () => {
      clearDeleteTimesheet();
    };
  }, []);

  React.useEffect(() => {
    if ([deletedLeavesheetCode].includes(responseCode.OK)) {
      getAllLeavesheet();
    }
    return () => {};
  }, [deletedLeavesheetIsFetching]);

  const initDataTable = () => {
    const rows: IResponseGetLeavesheet[] & { id: number }[] = [];
    const columns: GridColDef[] = [];
    if (get(props, "leavesheetDataList", []).length > 0) {
      rows.push(
        ...get(props, "leavesheetDataList", []).map((rowItems, index) => ({
          id: index + 1,
          ...rowItems,
          leaveStart: dateUtils.formatDate(rowItems.leaveStart),
          leaveEnd: dateUtils.formatDate(rowItems.leaveEnd),
          leaveCreated: dateUtils.formatDate(rowItems.leaveCreated),
          leaveRemark: translateLeaveRemark[rowItems.leaveRemark],
        }))
      );
      columns.push(
        {
          field: "id",
          headerName: "ลำดับที่",
          headerAlign: "center",
          align: "center",
        },
        ...Object.keys(get(props, "leavesheetDataList", [])[0]).map(
          (convertKey) =>
            ({
              field: convertKey,
              headerName:
                translateColumn[convertKey as keyof IResponseGetLeavesheet],
              type:
                typeof props.leavesheetDataList[0][
                  convertKey as keyof IResponseGetLeavesheet
                ] === "object"
                  ? "string"
                  : typeof props.leavesheetDataList[0][
                      convertKey as keyof IResponseGetLeavesheet
                    ],
              flex: 1,
              minWidth: 200,
              align: "center",
              headerAlign: "center",
            } as GridColDef)
        ),
        {
          field: "manage",
          headerName: "การจัดการ",
          sortable: false,
          headerAlign: "center",
          align: "center",
          renderCell: (
            params: GridRenderCellParams<any, IResponseGetLeavesheet>
          ) =>
            !params.row.leaveApproved && (
              <Stack direction={"row"} spacing={1}>
                <Tooltip title={constants.cancelLeave}>
                  <Fab
                    color="error"
                    size="small"
                    onClick={() => deleteLeavesheet(params.row.leaveId)}
                  >
                    <DeleteForeverRoundedIcon />
                  </Fab>
                </Tooltip>
              </Stack>
            ),
        }
      );
    }
    return {
      rows,
      columns,
    };
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" children={constants.pageTitle} />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={14} sx={{ p: 3 }}>
          <Grid
            container
            item
            xs={12}
            mb={2}
            spacing={2}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12} sm={6}>
              <Typography children={constants.pageRemark} variant={"h6"} />
              <Typography variant="subtitle1" children={constants.helperText} />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              direction={"row"}
              justifyContent={"flex-end"}
              spacing={2}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color={"success"}
                  onClick={() =>
                    navigate("/leavesheet/create", {
                      state: { mode: "create" },
                    })
                  }
                >
                  {constants.createTime}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color={"secondary"}
                  onClick={() => navigate(-1)}
                >
                  {constants.backBtn}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <DataGrid
              components={{ Toolbar: ExportToolbar }}
              autoHeight
              rows={initDataTable().rows}
              columns={initDataTable().columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              editMode={"row"}
              disableSelectionOnClick
              localeText={{
                noRowsLabel: constants.emptyData,
              }}
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}) as React.FunctionComponent<
  ILeavePageComponentProps & ILeavePageComponentActionProps
>;
