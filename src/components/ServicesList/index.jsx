"use client";
import { Box, Grid, Typography } from "@mui/material";
import { services } from "./constant";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import FormBooking from "@/components/FormBooking";
import { useState } from "react";

function ServiceList() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ padding: "10px 0" }}>
        <Grid container spacing={1}>
          {services.map((service, index) => (
            <Grid item xs={3} key={index}>
              <Box
                onClick={() => {
                  handleOpen();
                }}
                sx={{
                  ":hover": { background: "#f5f4f4" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: {
                    xs: "5px 0",
                    md: "10px",
                    xl: 2,
                  },
                  borderRadius: 2,
                  boxShadow: { xs: 2, sm: 0 },
                  height: "100%",
                }}
              >
                {service.icon}
                <Typography
                  wrap="nowrap"
                  sx={{ fontSize: "12px" }}
                  variant="body1"
                >
                  {service.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Đặt Xe Online</DialogTitle>
        <DialogContent>
          <FormBooking onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ServiceList;
