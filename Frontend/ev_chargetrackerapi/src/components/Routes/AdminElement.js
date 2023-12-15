import React from "react";

function AdminElement({ userType, children }) {
  if (userType == "admin") {
    return <>{children}</>;
  } else {
    return (
      <div>
        <div style={{ color: "red", marginTop: "40px", fontSize: "30px" }}>
          You do not have access to this page. Admin access required !
        </div>
      </div>
    );
  }
}

export default AdminElement;
