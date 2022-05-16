import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyCircle from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Controller,
  FieldPath,
  Path,
  PathValue,
  RegisterOptions,
  UnpackNestedValue,
  useFormContext,
} from "react-hook-form";

interface props {
  contextItems: IDynamicFormModel[];
}

const constants = {
  required: (label: string) => `กรุณาป้อน ${label} **`,
  compared: (label: string = "") => `ข้อมูลไม่ตรงกับ ${label} **`,
  duplicate: (label: string = "") => `ข้อมูลห้ามตรงกับ ${label} **`,
  minLength: (label: string = "") => `ต้องมีตัวอักษรอย่างน้อย ${label} ตัว **`,
};

export default <T,>({ contextItems }: props): JSX.Element => {
  const [showPassword, setShowPassword] = useState<{
    [key in string]: boolean;
  }>({});
  const { control, watch } = useFormContext<T>();
  return (
    <>
      {contextItems.map((row, key) => {
        const {
          label,
          name,
          type,
          required,
          value,
          formCategory,
          options,
          preflixIcon,
          grid,
          hideLabel,
          compareValue,
          duplicateCheck,
          minLength,
        } = row;
        const rules: Exclude<
          RegisterOptions,
          "valueAsNumber" | "valueAsDate" | "setValueAs"
        > = {};
        if (required)
          rules.required = { value: true, message: constants.required(label) };
        if (compareValue)
          rules.validate = (keyCompare) =>
            keyCompare === watch(compareValue as Path<T>) ||
            constants.compared(
              contextItems.find((f) => f.name === compareValue)?.label
            );
        if (duplicateCheck)
          rules.validate = (keyCompare) =>
            keyCompare !== watch(duplicateCheck as Path<T>) ||
            constants.duplicate(
              contextItems.find((f) => f.name === duplicateCheck)?.label
            );
        if (minLength)
          rules.minLength = {
            value: minLength,
            message: constants.minLength(minLength.toString()),
          };

        return (
          <Grid item xs={grid ? grid : 12} key={`field-${label}-${key}`}>
            {["text", "number", "textarea"].includes(type) && (
              <Controller
                name={name as FieldPath<T>}
                defaultValue={
                  value as UnpackNestedValue<PathValue<T, Path<T>>> | undefined
                }
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                  const { name, onBlur, onChange, ref, value } = field;
                  const { error } = fieldState;
                  return (
                    <TextField
                      fullWidth
                      ref={ref}
                      autoFocus
                      id={`${formCategory}-${name}`}
                      name={name}
                      type={type}
                      value={value}
                      placeholder={label}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(error)}
                      label={!hideLabel && label}
                      helperText={error?.message}
                      multiline={["textarea"].includes(type)}
                      rows={4}
                      InputProps={
                        preflixIcon
                          ? {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle
                                    color={Boolean(error) ? "error" : undefined}
                                  />
                                </InputAdornment>
                              ),
                            }
                          : undefined
                      }
                      variant={"outlined"}
                    />
                  );
                }}
              />
            )}

            {["password"].includes(type) && (
              <Controller
                name={name as FieldPath<T>}
                defaultValue={
                  value as UnpackNestedValue<PathValue<T, Path<T>>> | undefined
                }
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
                      type={showPassword[name] ? "text" : type}
                      value={value}
                      placeholder={label}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(error)}
                      label={!hideLabel && label}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: preflixIcon ? (
                          <InputAdornment position="start">
                            <KeyCircle
                              color={Boolean(error) ? "error" : undefined}
                            />
                          </InputAdornment>
                        ) : undefined,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  [name]:
                                    showPassword[name] === undefined
                                      ? true
                                      : !showPassword[name],
                                })
                              }
                            >
                              {showPassword[name] ? (
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

            {["radio"].includes(type) && (
              <Controller
                name={name as FieldPath<T>}
                defaultValue={
                  value as UnpackNestedValue<PathValue<T, Path<T>>> | undefined
                }
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                  const { name, onBlur, onChange, ref, value } = field;
                  const { error } = fieldState;
                  return (
                    <FormControl error={Boolean(error)}>
                      {!hideLabel && (
                        <FormLabel id={`radio-buttons-group-label-${key}`}>
                          <Typography children={label} variant={"body2"} />
                        </FormLabel>
                      )}
                      <RadioGroup
                        row
                        aria-labelledby={`radio-buttons-group-label-${key}`}
                        defaultValue={value}
                        name={name}
                        value={value}
                        onChange={onChange}
                        id={`${formCategory}-${name}`}
                        ref={ref}
                        onBlur={onBlur}
                      >
                        {options!.map((items, itemKey) => (
                          <FormControlLabel
                            key={`radio-${itemKey}`}
                            value={items.value}
                            control={<Radio />}
                            label={
                              <Typography
                                children={items.label}
                                variant={"body2"}
                              />
                            }
                          />
                        ))}
                      </RadioGroup>
                      <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                  );
                }}
              />
            )}
            {["select"].includes(type) && (
              <Controller
                name={name as FieldPath<T>}
                defaultValue={
                  value as UnpackNestedValue<PathValue<T, Path<T>>> | undefined
                }
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                  const { name, onBlur, onChange, ref, value } = field;
                  const { error } = fieldState;
                  return (
                    <FormControl error={Boolean(error)} fullWidth>
                      {!hideLabel && (
                        <FormLabel id={`radio-buttons-group-label-${key}`}>
                          <Typography children={label} variant={"body2"} />
                        </FormLabel>
                      )}
                      <Select
                        aria-labelledby={`radio-buttons-group-label-${key}`}
                        defaultValue={value}
                        name={name}
                        value={value}
                        onChange={onChange}
                        id={`${formCategory}-${name}`}
                        ref={ref}
                        onBlur={onBlur}
                      >
                        {options!.map((items, itemKey) => (
                          <MenuItem
                            key={`radio-${itemKey}`}
                            value={items.value}
                          >
                            {items.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                  );
                }}
              />
            )}
          </Grid>
        );
      })}
    </>
  );
};
