import React, { useRef, useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import FormPanel from "../components/FlyerEditorTemplate/FormPanel";
import DocumentPanel from "../components/FlyerEditorTemplate/DocumentPanel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



const FlyerEditor = () => {
  
// ── Sx ──────────────────────────────────────────────────────────────
const boxSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  minHeight: "100vh", // always at least full screen
  height: { xl: "100vh" }, // locked ONLY on xl — true desktop
  overflowX: { xs: "hidden", sm: "auto", xl: "hidden" }, // tablet/laptop: h-scroll allowed
  overflowY: { xs: "auto", sm: "auto", xl: "hidden" }, // desktop: locked, rest: scrollable
  gap: 3,
  p: 3,
  bgcolor: "grey.100",
};
const formPaperSx = {
  borderRadius: 4,
  p: 4,
  border: 1,
  borderColor: "divider",
  boxShadow: 3,
  "&:hover": { boxShadow: 6 },
  bgcolor: "background.paper",
  overflowY: { xl: "auto" }, // independent scroll only when layout is locked
  flexGrow: { xs: 1, sm: 0 }, // mobile: stretch full width, else: fixed
  flexShrink: 0, // never compress below flexBasis on any screen
  flexBasis: {
    xs: "auto", // mobile: full width column
    sm: "45%", // iPad mini / small tablet 600-899px
    md: "42%", // iPad Pro / Surface 900-1199px
    lg: "38%", // small laptops 1200-1535px
    xl: "35%", // large desktop 1536px+
  },
  minWidth: {
    sm: 260, // never squish below 260px before h-scroll kicks in
    md: 300,
  },
};
const previewPaperSx = {
  flex: 1, // absorbs all remaining space after form
  borderRadius: 4,
  p: 3,
  bgcolor: "grey.300",
  boxShadow: 3,
  overflowY: { xl: "auto" },
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minWidth: {
    sm: 280, // guarantees document is always reachable via h-scroll
    md: 320,
  },
};  
   
const documentPanelRef = useRef(null);
const [form, setForm] = useState({
    store_id: "",
    store_name: "",
    store_location: "",
    store_branding: null,
    effective_from: "",
    valid_till: "",
    tag_line: "",
    terms: "",
    products: [
      {
        id: 1,
        product_upc: "",
        product_name: "",
        product_price: "",
        discount: "",
        product_logo: null,
        other_detail: "",
      },
    ],
  });

// ── Handle ──────────────────────────────────────────────────────────────
const downloadAsPDF = async () => {
    const container = documentPanelRef.current;
    if (!container) return;

    // Grab every page element in DOM order
    const pageElements = container.querySelectorAll("[data-flyer-page]");
    if (!pageElements.length) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [794, 1123], // matches your FlyerPage exactly
    });

    for (let i = 0; i < pageElements.length; i++) {
      const canvas = await html2canvas(pageElements[i], {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 794,
        height: 1123,
      });

      const imgData = canvas.toDataURL("image/png");

      if (i > 0) pdf.addPage([794, 1123], "portrait");

      pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
    }

    pdf.save("flyer.pdf");
  };
const printFlyer = () => {
  const container = documentPanelRef.current;
  if (!container) return;

  const pageElements = container.querySelectorAll("[data-flyer-page]");
  if (!pageElements.length) return;

  // Collect all page HTML
  const pagesHTML = Array.from(pageElements)
    .map(el => el.outerHTML)
    .join("");

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Flyer Print</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fff; }
          .flyer-page {
            width: 794px;
            height: 1123px;
            page-break-after: always;
            overflow: hidden;
          }
          @media print {
            @page { size: A4 portrait; margin: 0; }
            .flyer-page { page-break-after: always; }
          }
        </style>
      </head>
      <body>
        ${pagesHTML}
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

// ✅ Warn user before they close/refresh tab
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Check if form has any data
      const hasData = 
        form.store_name || 
        form.store_location || 
        form.tag_line || 
        form.products.some(p => p.product_name || p.product_price);
      
      if (hasData) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires this
        return ''; // Some browsers use return value
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form]);

  return (
    <div>
      <Box sx={boxSx}>
        {/* Left: Form — top on mobile */}
        <Paper sx={formPaperSx} elevation={0}>
          <FormPanel onDownloadPDF={downloadAsPDF}  onPrintFlyer={printFlyer} form={form} setForm={setForm}/>
        </Paper>

        {/* Right: Document — bottom on mobile */}
        <Paper sx={previewPaperSx} elevation={0}>
          <div ref={documentPanelRef}>
            <DocumentPanel form={form}/>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default FlyerEditor;
