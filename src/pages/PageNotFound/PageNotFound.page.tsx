import {
  Button,
  Container,
  Icon,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import NotificationImportantTwoToneIcon from "@mui/icons-material/NotificationImportantTwoTone";

const ContainerPage = styled(Container)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  overflow: "hidden",
});

const ButtonBack = styled(Button)({});

const constants = {
  pageTitle: "เกิดข้อผิดพลาด",
  pageSubTitle: "ไม่พบเนื้อหา...",
  btnTitle: "ย้อนกลับ",
};

export default () => {
  const navigate = useNavigate();
  return (
    <ContainerPage>
      <Typography
        variant="h1"
        color={"orangered"}
        children={<NotificationImportantTwoToneIcon fontSize="inherit" />}
      />
      <Stack spacing={1} my={2} alignItems={"center"}>
        <Typography variant="h4" children={constants.pageTitle} />
        <Typography
          variant="body1"
          color={"gray"}
          children={constants.pageSubTitle}
        />
      </Stack>
      <ButtonBack
        color={'error'}
        size="large"
        variant="contained"
        onClick={() => navigate(-1)}
        children={<Typography variant="body1" children={constants.btnTitle} />}
      />
    </ContainerPage>
  );
};
