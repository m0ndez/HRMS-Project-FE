import * as React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const constants = {
  pageTitle: "รายการข้อมูล",
  createTime: "เพิ่มพนักงาน",
  backBtn: "ย้อนกลับ",
  emptyData: "ไม่พบข้อมูล",
  pageRemark: "ตารางข้อมูลพนักงาน",
  cancelLeave: "ยกเลิกการลา",
  helperText: "",
};

export default (() => {
  const navigate = useNavigate();

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
            {/* <DataGrid
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
        /> */}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}) as React.FunctionComponent<
  IEmployeeManagementPageProps & IEmployeeManagementPageActionProps
>;
