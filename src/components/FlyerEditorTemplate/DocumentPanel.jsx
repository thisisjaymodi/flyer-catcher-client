import { Typography, Box } from "@mui/material";
import StoreFlyer from "./StoreFlyer.jsx";
// import data from "../../assets/data/mockData.js";



export default function DocumentPanel({form}) {
  

  return (
    
    <Box sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#e8e8e8",
        padding: { xs: "8px", sm: "12px", md: "24px" },
        boxSizing: "border-box",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}>
      <Box sx={{
          zoom: {
            xs: 0.4,   // 40% on mobile
            sm: 0.6,   // 60% on tablet
            md: 0.8,   // 80% on medium
            lg: 1,     // 100% on large+
          },
        }}>
       <StoreFlyer  {...form}/>
      </Box>
    </Box>
  );
}
