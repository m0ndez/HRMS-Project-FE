import * as React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { noop, get } from "lodash";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dateUtils from "utils/date";
import { ExportToolbar } from "components";
import { EMPLOYEE_POSITION } from "constants/employeePostion";

const constants = {
  pageTitle: "รายการข้อมูล",
  createTime: "เพิ่มพนักงาน",
  backBtn: "ย้อนกลับ",
  emptyData: "ไม่พบข้อมูล",
  pageRemark: "ตารางข้อมูลพนักงาน",
  cancelLeave: "ยกเลิกการลา",
  helperText: "",
};

const translateColumn: { [type in keyof IResponseEmployeeReport]: string } = {
  empId: "รหัสพนักงาน",
  empPosition: "ตำแหน่ง",
  workCreatedBy: "ชื่อ",
  workDate: "วันที่ทำงาน",
  workDetail: "รายละเอียด",
  workHours: "ชั่วโมงการทำงาน",
  workId: "รหัสเอกสาร",
};

export default (({
  employeeGet = () => {
    noop();
  },
  employeeGetCode = 0,
  employeeGetDataList = [],
  employeeGetIsFetching = false,
  getEmployeeReport = () => {
    noop();
  },
  cancelGetEmployeeReport = () => {
    noop();
  },
  employeeReportCode = 0,
  employeeReportIsFetching = false,
  ...props
}) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    getEmployeeReport();
    return () => {
      cancelGetEmployeeReport();
    };
  }, []);

  const initDataTable = () => {
    const rows: IResponseEmployeeReport[] & { id: number }[] = [];
    const columns: GridColDef[] = [];
    if (get(props, "employeeReportDataList", []).length > 0) {
      rows.push(
        ...get(props, "employeeReportDataList", []).map((rowItems, index) => ({
          id: index + 1,
          ...rowItems,
          empPosition: EMPLOYEE_POSITION[rowItems.empPosition],
          workDate: dateUtils.formatDate(rowItems.workDate),
        }))
      );
      columns.push(
        {
          field: "id",
          headerName: "ลำดับที่",
          headerAlign: "center",
          align: "center",
        },
        ...Object.keys(get(props, "employeeReportDataList", [])[0]).map(
          (convertKey) =>
            ({
              field: convertKey,
              headerName:
                translateColumn[convertKey as keyof IResponseEmployeeReport],
              type:
                typeof props.employeeReportDataList[0][
                  convertKey as keyof IResponseEmployeeReport
                ] === "object"
                  ? "string"
                  : typeof props.employeeReportDataList[0][
                      convertKey as keyof IResponseEmployeeReport
                    ],
              flex: 1,
              minWidth: 200,
              groupable: true,
              align: "center",
              headerAlign: "center",
            } as GridColDef)
        )
        // {
        //   disableExport: true,
        //   field: "manage",
        //   headerName: "การจัดการ",
        //   sortable: false,
        //   headerAlign: "center",
        //   align: "center",
        //   renderCell: (
        //     params: GridRenderCellParams<any, IResponseEmployeeReport>
        //   ) =>
        //     !params.row.leaveApproved && (
        //       <Stack direction={"row"} spacing={3}>
        //         <Button
        //           variant={"contained"}
        //           color={"success"}
        //           children={constants.approve}
        //           onClick={() =>
        //             handleUpdateLeaveState({
        //               id: params.row.leaveId,
        //               state: !params.row.leaveApproved,
        //             })
        //           }
        //         />
        //       </Stack>
        //     ),
        // }
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
  IEmployeeReportPageProps & IEmployeeReportPageActionProps
>;
