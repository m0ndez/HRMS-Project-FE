import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyCircle from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormikProps } from "formik";
import { useState } from "react";

type props = {
  rememberWording: string;
};

export default ({
  rememberWording,
  ...props
}: FormikProps<ILoginForm> & props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form onSubmit={props.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={props.values.username}
          onChange={props.handleChange}
          error={props.touched.username && Boolean(props.errors.username)}
          helperText={props.touched.username && props.errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant={"standard"}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={props.values.password}
          onChange={props.handleChange}
          error={props.touched.password && Boolean(props.errors.password)}
          helperText={props.touched.password && props.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyCircle />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant={"standard"}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={props.handleChange}
                value={props.values.remember}
                id={"remember"}
                name={"remember"}
                color="success"
              />
            }
            label={<Typography variant="body2" children={rememberWording} />}
          />
        </FormGroup>
        <Button color="success" variant="contained" fullWidth type="submit">
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
