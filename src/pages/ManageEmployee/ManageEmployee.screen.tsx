import * as React from "react";
import {
  Button,
  Fab,
  Grid,
  Paper,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { get, noop } from "lodash";
import dateUtils from "utils/date";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { axios } from "utils";
import apis from "constants/apis";
import { AxiosResponse } from "axios";
import { EMPLOYEE_POSITION } from "constants/employeePostion";
import { ExportToolbar } from "components";

const constants = {
  pageTitle: "รายการข้อมูล",
  createTime: "เพิ่มพนักงาน",
  backBtn: "ย้อนกลับ",
  emptyData: "ไม่พบข้อมูล",
  pageRemark: "ตารางข้อมูลพนักงาน",
  cancelLeave: "ยกเลิกการลา",
  helperText: "",
};

const translateColumn: { [type in keyof IResponseGetEmployee]: string } = {
  id: "รหัสพนักงาน",
  fname: "ชื่อ",
  lname: "สกุล",
  address: "ที่อยู่",
  created: "วันที่สร้าง",
  username: "รหัสผู้ใช้",
  password: "รหัสผ่าน",
  position: "ตำแหน่ง",
  sex: "เพศ",
  state: "สถานะรหัส",
  tel: "เบอร์โทรศัพท์",
};

const translateSex: { [key in number]: string } = {
  1: "ชาย",
  2: "หญิง",
};

export default (({
  employeeGet = () => {
    noop();
  },
  employeeGetCode = 0,
  employeeGetIsFetching = false,
  openToast = () => {
    noop();
  },
  setLoading = () => {
    noop();
  },

  ...props
}) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    employeeGet();
  }, []);

  const handleChangeEmployeeState = async (id: string, state: boolean) => {
    setLoading(true);
    await axios
      .put(`${apis.employee}/state/${id}`, { id, state: !state })
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
        employeeGet();
        setLoading(false);
      });
  };

  const handleDeleteEmployee = async (id: string) => {
    setLoading(true);
    await axios
      .delete(`${apis.employee}/${id}`)
      .then((response: AxiosResponse<IResponse<null>>) => {
        setLoading(false);
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
        employeeGet();
        setLoading(false);
      });
  };

  const initDataTable = () => {
    const rows: IResponseGetEmployee[] & { id: number }[] = [];
    const columns: GridColDef[] = [];
    if (get(props, "employeeGetDataList", []).length > 0) {
      rows.push(
        ...get(props, "employeeGetDataList", []).map((rowItems, index) => ({
          ids: index + 1,
          ...rowItems,
          created: dateUtils.formatDate(rowItems.created),
          position: EMPLOYEE_POSITION[rowItems.position],
        }))
      );
      columns.push(
        {
          field: "ids",
          headerName: "ลำดับที่",
          headerAlign: "center",
          align: "center",
        },
        ...Object.keys(get(props, "employeeGetDataList", [])[0])
          .filter((f) => !["lname"].includes(f))
          .map(
            (convertKey) =>
              ({
                field: convertKey,
                headerName:
                  translateColumn[convertKey as keyof IResponseGetEmployee],
                type:
                  typeof props.employeeGetDataList[0][
                    convertKey as keyof IResponseGetEmployee
                  ] === "object"
                    ? "string"
                    : typeof props.employeeGetDataList[0][
                        convertKey as keyof IResponseGetEmployee
                      ],
                flex: 1,
                minWidth: 200,
                align: "center",
                headerAlign: "center",
                renderCell: ["state"].includes(convertKey)
                  ? (
                      params: GridRenderCellParams<any, IResponseGetEmployee>
                    ) => (
                      <>
                        <Typography variant="subtitle2" children={"ปิด"} />
                        <Switch
                          checked={params.row.state}
                          onClick={() =>
                            handleChangeEmployeeState(
                              params.row.id,
                              params.row.state
                            )
                          }
                        />
                        <Typography variant="subtitle2" children={"เปิด"} />
                      </>
                    )
                  : undefined,
                valueGetter: ["sex"].includes(convertKey)
                  ? (
                      params: GridRenderCellParams<any, IResponseGetEmployee>
                    ) => {
                      return translateSex[params.row.sex];
                    }
                  : ["fname"].includes(convertKey)
                  ? (
                      params: GridRenderCellParams<any, IResponseGetEmployee>
                    ) => {
                      return `${params.row.fname} ${params.row.lname}`;
                    }
                  : undefined,
              } as GridColDef)
          ),
        {
          field: "manage",
          headerName: "การจัดการ",
          sortable: false,
          headerAlign: "center",
          disableExport: true,
          align: "center",
          renderCell: (
            params: GridRenderCellParams<any, IResponseGetEmployee>
          ) => (
            <Stack direction={"row"} spacing={1}>
              <Tooltip title={"แก้ไขข้อมูล"}>
                <Fab
                  size="small"
                  color={"default"}
                  onClick={() =>
                    navigate(`/manage/employees/edit/${params.row.id}`, {
                      state: {
                        mode: "edit",
                        id: params.row.id,
                      },
                    })
                  }
                >
                  <EditRoundedIcon color="info" />
                </Fab>
              </Tooltip>
              <Tooltip title={constants.cancelLeave}>
                <Fab
                  color="error"
                  size="small"
                  onClick={() => handleDeleteEmployee(params.row.id)}
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
                    navigate("/manage/employees/create", {
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
              loading={employeeGetIsFetching}
              autoHeight
              rows={initDataTable().rows}
              columns={initDataTable().columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              editMode={"row"}
              disableSelectionOnClick
              localeText={{
                noRowsLabel: constants.emptyData,
                toolbarColumns: "ปรับแต่งตาราง",
              }}
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}) as React.FunctionComponent<
  IEmployeeManagementPageProps & IEmployeeManagementPageActionProps
>;
