import { Box, Button, Icon, Typography } from "@mui/material";
import React, { useRef } from "react";

// sx

const wrapperSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

const sharedZoneSx = {
  border: 1,
  borderColor: "divider",
  borderRadius: 2,
  bgcolor: "grey.50",
  height: 72, // fixed height — never changes between states
  overflow: "hidden", // clips anything that tries to break out
  p: 2,
};

const uploadZoneSx = {
  ...sharedZoneSx,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1.5,
  cursor: "pointer",
  "&:hover": {
    bgcolor: "grey.100",
    borderColor: "primary.main",
  },
};

const uploadZoneWithFileSx = {
  ...sharedZoneSx,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1.5,
  cursor: "default",
};

const fileInfoSx = {
  flex: 1,
  minWidth: 0, // allows flex shrink
  overflow: "hidden", // clips overflow
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
};

const FileUploadField = ({ label, value, onChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click(); // trigger hidden input on button click
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onChange(file);
  };

  const handleClear = () => {
    inputRef.current.value = ""; // reset the hidden input
    onChange(null);
  };

  return (
    <Box sx={wrapperSx}>
      {/* Label sits above the zone */}
      {/* <Typography variant="caption" color="text.secondary">
        {label}
      </Typography> */}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      {/* ── Empty state ── */}
      {!value && (
        <Box sx={uploadZoneSx} onClick={handleClick}>
          <Icon sx={{ fontSize: 32, color: "text.disabled", flexShrink: 0 }}>
            image
          </Icon>

          <Box sx={fileInfoSx}>
            <Typography variant="body2" noWrap sx={{ maxWidth: "100%" }}>
              {label}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ maxWidth: "100%" }}
            >
              Accepted: PNG, JPG, JPEG
            </Typography>
          </Box>

          <Button
            size="small"
            variant="outlined"
            startIcon={<Icon>upload</Icon>}
            sx={{ flexShrink: 0 }}
            component="span"
          >
            Upload
          </Button>
        </Box>
      )}

      {/* ── Filled state ── */}
      {value && (
        <Box sx={uploadZoneWithFileSx}>
          <Box
            component="img"
            src={URL.createObjectURL(value)}
            alt="preview"
            sx={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 1,
              flexShrink: 0,
            }}
          />

          <Box sx={fileInfoSx}>
            <Typography
              variant="body2"
              noWrap
              fontWeight={500}
              sx={{ maxWidth: "100%" }}
            >
              {value.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{ maxWidth: "100%" }}
            >
              {(value.size / 1024).toFixed(1)} KB
            </Typography>
          </Box>

          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<Icon>delete</Icon>}
            onClick={handleClear}
            sx={{ flexShrink: 0 }}
          >
            Clear
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadField;
