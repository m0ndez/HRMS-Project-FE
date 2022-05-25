import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const DashboardPage: FunctionComponent = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" children={'ยินดีต้องรับเข้าสู้ระบบ HRMS'} />
            </Grid>
        </Grid>
    )
};

export default DashboardPage;
