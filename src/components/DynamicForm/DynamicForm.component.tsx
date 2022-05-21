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
  Stack,
  Switch,
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

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import thLocale from "date-fns/locale/th";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { isValid } from "date-fns";
import { get } from "lodash";

interface props {
  contextItems: IDynamicFormModel[];
  setDisabled?: boolean;
}

const constants = {
  required: (label: string) => `กรุณาป้อน ${label} **`,
  compared: (label: string = "") => `ข้อมูลไม่ตรงกับ ${label} **`,
  duplicate: (label: string = "") => `ข้อมูลห้ามตรงกับ ${label} **`,
  minLength: (label: string = "") => `ต้องมีตัวอักษรอย่างน้อย ${label} ตัว **`,
  maxLength: (label: string = "") => `ต้องมีตัวอักษรไม่เกิน ${label} ตัว **`,
  pattern: (label: string = "") => `รูปแบบ ${label} ไม่ถูกต้อง **`,
  invalidDate: (label: string = "") => `ข้อมูล ${label} ไม่ถูกต้อง **`,
  minNumber: (label: string = "", num: number) =>
    `จำนวน ${label} ห้ามเกิน ${num}`,
  maxNumber: (label: string = "", num: number) =>
    `จำนวน ${label} ต้องไม่ต่ำกว่า ${num}`,
};

export default <T,>({
  contextItems,
  setDisabled = false,
}: props): JSX.Element => {
  const [showPassword, setShowPassword] = useState<{
    [key in string]: boolean;
  }>({});
  const { control, watch, getValues } = useFormContext<T>();
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
          maxLength,
          numberMax,
          numberMin,
          readOnly,
          minDateKey,
          autoFocus,
          pattern,
          switchLabel,
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
        if (maxLength)
          rules.maxLength = {
            value: maxLength,
            message: constants.maxLength(maxLength.toString()),
          };
        if (["date", "datetime"].includes(type))
          rules.validate = (date) =>
            isValid(date) || constants.invalidDate(label);
        if (numberMin)
          rules.min = {
            value: numberMin,
            message: constants.minNumber(label, numberMin),
          };
        if (numberMax)
          rules.max = {
            value: numberMax,
            message: constants.maxNumber(label, numberMax),
          };
        if (pattern)
          rules.pattern = {
            value: pattern,
            message: constants.pattern(label),
          };

        return (
          <Grid
            item
            xs={12}
            sm={grid ? grid : 12}
            key={`field-${label}-${key}`}
          >
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
                      autoFocus={autoFocus}
                      id={`${formCategory}-${name}`}
                      disabled={setDisabled || readOnly}
                      name={name}
                      type={type}
                      value={value}
                      placeholder={label}
                      autoComplete={"off"}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(error)}
                      label={!hideLabel && label}
                      helperText={error?.message}
                      multiline={["textarea"].includes(type)}
                      rows={4}
                      InputProps={{
                        inputMode: ["number"].includes(type)
                          ? "numeric"
                          : "text",
                        startAdornment: preflixIcon && (
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
                      disabled={setDisabled || readOnly}
                      name={name}
                      autoComplete={"off"}
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
                    <FormControl
                      error={Boolean(error)}
                      disabled={setDisabled || readOnly}
                    >
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
                    <FormControl
                      error={Boolean(error)}
                      fullWidth
                      disabled={setDisabled || readOnly}
                    >
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
            {["date"].includes(type) && (
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
                  const handleMinDate = Boolean(
                    getValues(minDateKey as Path<T>)
                  );

                  const setNextDate = minDateKey
                    ? new Date().setDate(
                        new Date(
                          get(watch(), minDateKey, new Date().toString())
                        ).getDate() + 1
                      )
                    : undefined;

                  return (
                    <FormControl fullWidth>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        locale={thLocale}
                      >
                        <DesktopDatePicker
                          disabled={setDisabled || readOnly || !handleMinDate}
                          onChange={onChange}
                          minDate={setNextDate}
                          value={new Date(value as string)}
                          PaperProps={{ elevation: 14 }}
                          renderInput={(params) => (
                            <TextField
                              ref={ref}
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                                placeholder: label,
                              }}
                              autoComplete={"off"}
                              id={`${formCategory}-${name}`}
                              autoFocus={autoFocus}
                              name={name}
                              placeholder={label}
                              onBlur={onBlur}
                              error={Boolean(error)}
                              label={!hideLabel && label}
                              helperText={error?.message}
                              variant={"outlined"}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  );
                }}
              />
            )}
            {["switch"].includes(type) && (
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
                    <FormControl
                      error={Boolean(error)}
                      fullWidth
                      disabled={setDisabled || readOnly}
                    >
                      {!hideLabel && (
                        <FormLabel id={`radio-buttons-group-label-${key}`}>
                          <Typography children={label} variant={"body2"} />
                        </FormLabel>
                      )}
                      <Stack direction={"row"} alignItems={"center"}>
                        {switchLabel![0] && (
                          <Typography
                            variant="subtitle2"
                            children={switchLabel![0]}
                          />
                        )}
                        <Switch
                          name={name}
                          value={value}
                          checked={Boolean(value)}
                          onChange={onChange}
                          id={`${formCategory}-${name}`}
                          ref={ref}
                          onBlur={onBlur}
                        />
                        {switchLabel![1] && (
                          <Typography
                            variant="subtitle2"
                            children={switchLabel![1]}
                          />
                        )}
                      </Stack>
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
