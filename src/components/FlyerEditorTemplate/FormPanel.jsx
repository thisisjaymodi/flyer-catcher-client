import React from "react";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Icon,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Alert,
  
} from "@mui/material";
import { useState, useEffect } from "react";
import FileUploadField from "../FileUploadField";


export default function FormPanel({ onDownloadPDF, onPrintFlyer, form, setForm  }) {
  
  const steps = ["branding", "products", "review"];
  const [activeStep, setActiveStep] = React.useState(0);


  


  // ── Sx ──────────────────────────────────────────────────────────────
  const wrapperSx = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };
  const topBarSx = {
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 2,
  };
  const scrollAreaSx = {
    flex: 1,
    overflowY: "auto",
    py: 2,
  };
  const bottomBarSx = {
    flexShrink: 0,
    pt: 2,
  };
  const sectionSx = {
    p: 3,
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "background.paper",
  };
  const productCardSx = {
    p: 2,
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "grey.50",
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // ── Handlers for top-level fields ──
  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  // ── Handlers for products array ──
  const handleProductChange = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product,
      ),
    }));
  };
  const handleAddProduct = () => {
    setForm((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: Date.now(),
          product_logo: "",
          product_name: "",
          product_price: "",
          discount: "",
          product_upc: "",
          other_detail: "",
        },
      ],
    }));
  };
  const handleDeleteProduct = (id) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((product) => product.id !== id),
    }));
  };

  

  return (
    <Box sx={wrapperSx}>
      {/* TOP */}
      <Box sx={topBarSx}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>
                    {label.charAt(0).toUpperCase() +
                      label.slice(1).toLowerCase()}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps Completed - please download the flyer below.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  startIcon={<Icon>chevron_left</Icon>}
                  variant="outlined"
                  size="small"
                >
                  Back
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  startIcon={<Icon>chevron_left</Icon>}
                  variant="outlined"
                  size="small"
                >
                  Back
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                ></Typography>
                <Button
                  endIcon={
                    activeStep === steps.length - 1 ? (
                      <Icon>check</Icon>
                    ) : (
                      <Icon>chevron_right</Icon>
                    )
                  }
                  variant="outlined"
                  size="small"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
      <Divider />
      {/* Middle */}
      <Box sx={scrollAreaSx}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          Flyer {steps[activeStep]?.toLowerCase() || "complete"}
        </Typography>

        <Box sx={sectionSx}>
          {steps[activeStep] === "branding" && (
            <Stack spacing={3}>
              <FileUploadField
                label="Store Branding (upload image)"
                value={form.store_branding}
                onChange={(file) => handleFieldChange("store_branding", file)}
              />
              <TextField
                label="Store Name"
                size="small"
                fullWidth
                placeholder="My Pizza Store"
                value={form.store_name}
                onChange={(e) => handleFieldChange("store_name", e.target.value)}
              />
              <TextField
                label="Store Location"
                size="small"
                fullWidth
                placeholder="1234 King St, Hamilton, On"
                value={form.store_location}
                onChange={(e) => handleFieldChange("store_location", e.target.value)}
              />
              <TextField
                label="Tag Line"
                size="small"
                fullWidth
                placeholder="Diwali Sale"
                value={form.tag_line}
                onChange={(e) => handleFieldChange("tag_line", e.target.value)}
              />

              <TextField
                label="Terms & Conditions"
                size="small"
                fullWidth
                multiline
                rows={3}
                placeholder="This flyer is subject to..."
                value={form.terms}
                onChange={(e) => handleFieldChange("terms", e.target.value)}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Effective from"
                    size="small"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={form.effective_from}
                    onChange={(e) =>
                      handleFieldChange("effective_from", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Valid till"
                    size="small"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={form.valid_till}
                    onChange={(e) =>
                      handleFieldChange("valid_till", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </Stack>
          )}
          {steps[activeStep] === "products" && (
            <Stack spacing={3}>
              {form.products.map((product, i) => (
                <Box key={product.id} sx={productCardSx}>
                  <Stack spacing={2}>
                    <Typography variant="h6" sx={{ textAlign: "start" }}>
                      Product #{i + 1}
                    </Typography>
                    {/* Row 1: Product Name & Price */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          label="Product Name"
                          size="small"
                          fullWidth
                          placeholder="Amazing Fries"
                          value={product.product_name}
                          onChange={(e) =>
                            handleProductChange(
                              product.id,
                              "product_name",
                              e.target.value,
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Product Price"
                          size="small"
                          fullWidth
                          placeholder="$3.65*"
                          value={product.product_price}
                          onChange={(e) =>
                            handleProductChange(
                              product.id,
                              "product_price",
                              e.target.value,
                            )
                          }
                        />
                      </Grid>
                    </Grid>

                    {/* Row 2: Discount & UPC */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Discount"
                          size="small"
                          fullWidth
                          placeholder="SAVE 20%"
                          value={product.discount}
                          onChange={(e) =>
                            handleProductChange(
                              product.id,
                              "discount",
                              e.target.value,
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Product UPC"
                          size="small"
                          fullWidth
                          placeholder="12510566"
                          value={product.product_upc}
                          onChange={(e) =>
                            handleProductChange(
                              product.id,
                              "product_upc",
                              e.target.value,
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                    {/* Row 3: Product Logo */}
                    <FileUploadField
                      label="Product Logo (upload image)"
                      value={product.product_logo}
                      onChange={(file) =>
                        handleProductChange(product.id, "product_logo", file)
                      }
                    />
                    {/* Row 4: Other Details */}
                    <TextField
                      label="Other Details"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="*Taxes, cheese, add-ons extra..."
                      value={product.other_detail}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          "other_detail",
                          e.target.value,
                        )
                      }
                    />

                    {/* Delete button */}
                    <Divider />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Box
                        role="button"
                        aria-label="delete product"
                        onClick={() => handleDeleteProduct(product.id)}
                        sx={{
                          display: "inline-flex",
                          cursor: "pointer",
                          color: "action.active",
                          "&:hover": { color: "error.main" },
                        }}
                      >
                        <Icon sx={{ fontSize: 20 }}>delete</Icon>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              ))}

              {/* Add Product Button */}
              <Button
                startIcon={<Icon>add</Icon>}
                variant="outlined"
                onClick={handleAddProduct}
                fullWidth
              >
                Add Product
              </Button>
            </Stack>
          )}
          {steps[activeStep] === "review" && (
            <Stack spacing={3}>
              <Alert severity="info" icon={<Icon>info</Icon>}>
                Please review the flyer to the right. If confirmed, click
                Finish.
              </Alert>
            </Stack>
          )}
          {activeStep === steps.length && (
            <Stack spacing={1}>
              <div>
              <Button variant="contained" startIcon={<Icon>download</Icon>} size="medium" aria-label="download" fullWidth onClick={onDownloadPDF}>
                Download PDF
              </Button>
              </div>
              <Button variant="outlined" startIcon={<Icon>print</Icon>} size="medium" aria-label="print" onClick={onPrintFlyer} fullWidth>
                Print Flyer
              </Button>
            </Stack>
          )}
        </Box>
      </Box>
      <Divider />
      {/* Bottom */}
      <Box sx={bottomBarSx}>
        <Box sx={{ textAlign: "right" }}>
          <Button
            disabled={activeStep >= steps.length - 1}
            startIcon={<Icon>save</Icon>}
            variant="contained"
            size="small"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
