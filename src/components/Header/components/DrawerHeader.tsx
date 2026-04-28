import * as React from "react";
import MailIcon from "@mui/icons-material/Mail";
import {
  Divider,
  List,
  ListItem,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Link from "next/link";

function DrawerHeader({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}) {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {[
          { name: "Chính Sách Bảo Mật", url: "/privacy-policy" },
          { name: "Tất Cả Bài Viết", url: "/post" },
          { name: "Giới Thiệu", url: "/about" },
          { name: "Câu Hỏi Thường Gặp", url: "/faq" },
        ].map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link href={text.url}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}

export default DrawerHeader;
