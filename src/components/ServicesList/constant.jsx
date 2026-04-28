import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
export const services = [
  {
    name: "Grab Xe Máy",
    icon: <TwoWheelerIcon fontSize="small" sx={{ color: "#1976d2" }} />,
    discount: true,
  },
  {
    name: "Grab Giao Hàng",
    icon: <DeliveryDiningIcon fontSize="small" sx={{ color: "#1976d2" }} />,
    discount: true,
  },
  {
    name: "Grab 4 Chỗ",
    icon: <DirectionsCarIcon fontSize="small" sx={{ color: "#1976d2" }} />,
    discount: true,
  },
  {
    name: "Grab 7 Chỗ",
    icon: <AirportShuttleIcon fontSize="small" sx={{ color: "#1976d2" }} />,
    discount: true,
  },
];
