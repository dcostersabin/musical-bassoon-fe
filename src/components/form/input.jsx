import { useState } from "react";
// mui
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Input = ({
  name,
  label,
  type = "text",
  variant = "outlined",
  classDetails = "",
  minRowsTextArea = 5,
  size = "medium",
  formik,
  endAdornment,
  helperText,
  styles = {},
  radioLabels = [],
  defaultValue = "",
  handleChange,
  customValue,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const value = customValue || formik.values?.[name] || "";
  const errorMessage = formik.errors?.[name];
  const isTouched = formik.touched?.[name];
  const isError = isTouched && errorMessage?.length > 0;

  return type === "password" ? (
    <FormControl variant={variant} className={classDetails}>
      <InputLabel error={isError} htmlFor={name}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={name}
        label={label}
        name={name}
        variant={variant}
        className={"pe-0"}
        style={styles}
        endAdornment={
          <InputAdornment
            className="position-absolute"
            sx={{ right: "14px" }}
            position="end"
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((prevState) => !prevState)}
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
            >
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        type={!showPassword ? type : "text"}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={isError}
      />
      <FormHelperText error>{isError ? errorMessage : " "}</FormHelperText>
      {!isError && helperText ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        "\n\n"
      )}
    </FormControl>
  ) : type === "textarea" ? (
    <TextareaAutosize
      id={name}
      name={name}
      className={classDetails}
      style={styles}
      minRows={minRowsTextArea}
      placeholder={label}
      variant={variant}
      value={value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={isError}
    />
  ) : type === "checkbox" ? (
    <FormControlLabel
      className={`${classDetails} ${isError ? "text-danger" : ""}`}
      style={styles}
      componentsProps={{ typography: { variant: "caption" } }}
      control={<Checkbox className={isError ? "text-danger" : ""} />}
      label={label}
      name={name}
      // checked={value}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  ) : type === "radio" ? (
    <FormControl variant={variant} className={classDetails} sx={styles}>
      <FormLabel className="mb-2 fw-bold text-reset" error={isError} id={name}>
        {label}
      </FormLabel>
      <RadioGroup
        className={`${classDetails} w-100 gap-3 ${
          isError ? "text-danger" : ""
        }`}
        value={value}
        sx={styles}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        defaultValue={defaultValue}
      >
        <div className="d-flex flex-row gap-3">
          {radioLabels.map((label, key) => (
            <FormControlLabel
              key={key}
              value={label.value}
              control={
                <Radio size="medium" className={isError ? "text-danger" : ""} />
              }
              label={
                <div className="d-flex flex-column">
                  <div className="d-flex flex-row align-items-center gap-2">
                    {label.icon} <span>{label.label}</span>
                  </div>
                  {label.helperText && (
                    <FormHelperText className="m-0">
                      {label.helperText}
                    </FormHelperText>
                  )}
                </div>
              }
            />
          ))}
        </div>
      </RadioGroup>
    </FormControl>
  ) : (
    <TextField
      id={name}
      name={name}
      type={type}
      label={label}
      variant={variant}
      size={size}
      className={classDetails}
      sx={styles}
      value={value}
      onChange={handleChange || formik.handleChange}
      onBlur={formik.handleBlur}
      error={isError}
      helperText={isError ? errorMessage : helperText || " "}
      InputProps={{ endAdornment }}
    />
  );
};

export default Input;
