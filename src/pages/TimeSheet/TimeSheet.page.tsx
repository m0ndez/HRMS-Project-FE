import {
  Box,
  Button,
  Fab,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { get } from "lodash";
import dateUtils from "utils/date";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { responseCode } from "constants/response";

const constants = {
  pageTitle: "รายการข้อมูล",
  createTime: "ลงข้อมูลการทำงาน",
  backBtn: "ย้อนกลับ",
  emptyData: "ไม่พบข้อมูล",
  pageRemark: "ตารางข้อมูลประวัติการทำงาน",
};

const translateColumn: { [type in keyof IResponseGetTimesheet]: string } = {
  workCreated: "วันที่สร้างเอกสาร",
  workCreatedBy: "รหัสพนักงาน",
  workDate: "วันที่ปฏิบัติงาน",
  workDetail: "รายละเอียด",
  workEdited: "วันที่แก้ไข",
  workHours: "เวลาการทำงาน",
  workId: "เลขที่เอกสาร",
};

export default (({
  getAllTimesheet,
  deleteTimesheet,
  deleteTimesheetIsFetching,
  deleteTimeSheetCode,
  clearDeleteTimesheet,
  ...props
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    getAllTimesheet();

    return () => {
      clearDeleteTimesheet();
    };
  }, []);

  React.useEffect(() => {
    if ([deleteTimeSheetCode].includes(responseCode.OK)) {
      getAllTimesheet();
    }
  }, [deleteTimesheetIsFetching]);

  const initDataTable = () => {
    const rows: IResponseGetTimesheet[] & { id: number }[] = [];
    const columns: GridColDef[] = [];
    if (get(props, "timesheetDataList", []).length > 0) {
      rows.push(
        ...get(props, "timesheetDataList", []).map((rowItems, index) => ({
          id: index + 1,
          ...rowItems,
          workEdited: rowItems.workEdited
            ? dateUtils.formatDate(rowItems.workEdited)
            : "ไม่มีข้อมูล",
          workDate: dateUtils.formatDate(rowItems.workDate),
          workCreated: dateUtils.formatDate(rowItems.workCreated),
        }))
      );
      columns.push(
        {
          field: "id",
          headerName: "ลำดับที่",
          headerAlign: "center",
          align: "center",
        },
        ...Object.keys(get(props, "timesheetDataList", [])[0]).map(
          (convertKey) =>
            ({
              field: convertKey,
              headerName:
                translateColumn[convertKey as keyof IResponseGetTimesheet],
              type:
                typeof props.timesheetDataList[0][
                  convertKey as keyof IResponseGetTimesheet
                ] === "object"
                  ? "string"
                  : typeof props.timesheetDataList[0][
                      convertKey as keyof IResponseGetTimesheet
                    ],
              flex: 1,
              minWidth: ["workDetail"].includes(convertKey) ? 350 : 150,
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
            params: GridRenderCellParams<any, IResponseGetTimesheet>
          ) => (
            <Stack direction={"row"} spacing={1}>
              <Tooltip title={"แก้ไขข้อมูล"}>
                <Fab
                  size="small"
                  color={"default"}
                  onClick={() =>
                    navigate(`/timesheet/edit/${params.row.workId}`, {
                      state: {
                        mode: "edit",
                        id: params.row.workId,
                      },
                    })
                  }
                >
                  <EditRoundedIcon color="info" />
                </Fab>
              </Tooltip>
              <Tooltip title={"ลบใบงาน"}>
                <Fab
                  color="error"
                  size="small"
                  onClick={() => deleteTimesheet(params.row.workId)}
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
                    navigate("/timesheet/create", { state: { mode: "create" } })
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
}) as React.FunctionComponent<ITimesheetPageProps & ITimesheetPageActionProps>;
