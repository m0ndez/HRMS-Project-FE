import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyCircle from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import {
  Controller,
  FieldPath,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { ILoginModel } from "pages/Login/Model/interface";

type props = {
  btnLabel: string;
  remark: string;
  contextItems: ILoginModel[];
  rememberWording?: string;
};

export default ({ contextItems, btnLabel, remark }: props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { control } = useFormContext<ILoginForm>();
  return (
    <>
      {contextItems.map((row, key) => {
        const { label, name, type, required, value, formCategory } = row;
        const rules: Exclude<
          RegisterOptions,
          "valueAsNumber" | "valueAsDate" | "setValueAs"
        > = {};
        if (required)
          rules.required = { value: true, message: `กรุณาป้อน ${label} **` };

        return (
          <React.Fragment key={`field-${label}-${key}`}>
            {["text", "number"].includes(type) && (
              <Controller
                name={name as FieldPath<ILoginForm>}
                defaultValue={value}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                  const { name, onBlur, onChange, ref, value } = field;
                  const { error } = fieldState;
                  return (
                    <TextField
                      ref={ref}
                      autoFocus
                      fullWidth
                      id={`${formCategory}-${name}`}
                      name={name}
                      type={type}
                      value={value}
                      placeholder={label}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(error)}
                      label={label}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle
                              color={Boolean(error) ? "error" : undefined}
                            />
                          </InputAdornment>
                        ),
                      }}
                      variant={"outlined"}
                    />
                  );
                }}
              />
            )}

            {["password"].includes(type) && (
              <Controller
                name={name as FieldPath<ILoginForm>}
                defaultValue={value}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                  const { name, onBlur, onChange, ref, value } = field;
                  const { error } = fieldState;
                  return (
                    <TextField
                      ref={ref}
                      fullWidth
                      id={`${formCategory}-${name}`}
                      name={name}
                      type={showPassword ? "text" : type}
                      value={value}
                      placeholder={label}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(error)}
                      label={label}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyCircle
                              color={Boolean(error) ? "error" : undefined}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant={"outlined"}
                    />
                  );
                }}
              />
            )}
          </React.Fragment>
        );
      })}
      <Typography variant="body2" children={remark} color={"GrayText"} />
      <Button color="success" variant="contained" fullWidth type="submit">
        <Typography variant="body1" children={btnLabel} />
      </Button>
    </>
  );
};
