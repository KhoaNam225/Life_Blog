import React from "react";
import { Nav } from "react-bootstrap";

const SideMenu = () => {
  return (
    <div id="side-menu">
      <Nav style={{ display: "flex", flexDirection: "column" }}>
        <Nav.Link href="/admin/profile" style={{ padding: "8px", color: "black" }} >Profile</Nav.Link>
        <Nav.Link href="/admin/blogs" style={{ padding: "8px", color: "black" }} >Blogs</Nav.Link>
        <Nav.Link href="/admin/friends" style={{ padding: "8px", color: "black" }} >Friends</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideMenu;
