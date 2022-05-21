import React from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Fab,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { get, noop } from "lodash";
import { useNavigate } from "react-router-dom";
import dateUtils from "utils/date";
import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const constants = {
  pageTitle: "รายการข้อมูล",
  createTime: "เพิ่มพนักงาน",
  backBtn: "ย้อนกลับ",
  emptyData: "ไม่พบข้อมูล",
  pageRemark: "ตารางข้อมูลการลางาน",
  cancelLeave: "ยกเลิกการลา",
  approve: "อนุมัติ",
  rollbackApprove: "ยกเลิกการอนุมติ",
  helperText: "",
};

const translateLeaveRemark: { [key in string]: string } = {
  "1": "ลากิจ",
  "2": "ลาป่วย",
  "3": "ลาครึ่งวัน",
};

const translateColumn: { [type in keyof IResponseGetLeaveApprove]: string } = {
  leaveId: "เลขที่เอกสาร",
  leaveApproved: "สถานะการอนุมัติ",
  leaveCreated: "วันที่สร้างเอกสาร",
  leaveStart: "วันที่ลางาน",
  leaveEnd: "วันที่สิ้นสุดการลางาน",
  leaveRemark: "หมายเหตุ",
  leaveFullname: "ชื่อพนักงาน",
};

export default (({
  getAllLeaveApprove = () => {
    noop();
  },
  clearGetLeavesheetApprove = () => {
    noop();
  },
  setLoading = () => {
    noop();
  },
  openToast = () => {
    noop();
  },
  leaveApproveCode = 0,
  ...props
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    getAllLeaveApprove();
    return () => {
      clearGetLeavesheetApprove();
    };
  }, []);

  const initDataTable = () => {
    const rows: IResponseGetLeaveApprove[] & { id: number }[] = [];
    const columns: GridColDef[] = [];
    if (get(props, "leaveApproveDataList", []).length > 0) {
      rows.push(
        ...get(props, "leaveApproveDataList", []).map((rowItems, index) => ({
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
        ...Object.keys(get(props, "leaveApproveDataList", [])[0]).map(
          (convertKey) =>
            ({
              field: convertKey,
              headerName:
                translateColumn[convertKey as keyof IResponseGetLeaveApprove],
              type: ["leaveRemark"].includes(convertKey)
                ? "string"
                : typeof props.leaveApproveDataList[0][
                    convertKey as keyof IResponseGetLeaveApprove
                  ] === "object"
                ? "string"
                : typeof props.leaveApproveDataList[0][
                    convertKey as keyof IResponseGetLeaveApprove
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
            params: GridRenderCellParams<any, IResponseGetLeaveApprove>
          ) =>
            !params.row.leaveApproved && (
              <Stack direction={"row"} spacing={3}>
                <Button
                  variant={"contained"}
                  color={"success"}
                  children={constants.approve}
                  onClick={() =>
                    handleUpdateLeaveState({
                      id: params.row.leaveId,
                      state: !params.row.leaveApproved,
                    })
                  }
                />
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

  const handleUpdateLeaveState = async (data: {
    id: string;
    state: boolean;
  }) => {
    const { id, state } = data;
    setLoading(true);
    await axios
      .put(`${apis.leaves}/approve/${id}`, { id, state })
      .then((response: AxiosResponse<IResponse<null>>) => {
        const { data } = response;
        setLoading(false);
        openToast({
          open: true,
          toastType: "success",
          toastMessage: data.message || data.devMessage,
          toastDuration: 1500,
        });
      })
      .catch((error: IResponse<null>) => {
        setLoading(false);
        openToast({
          open: true,
          toastType: "error",
          toastMessage: error.message || error.devMessage,
          toastDuration: 3000,
        });
      })
      .finally(() => {
        getAllLeaveApprove();
        setLoading(false);
      });
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
}) as React.FunctionComponent<
  ILeaveApprovePageProps & ILeaveApprovePageActionProps
>;
