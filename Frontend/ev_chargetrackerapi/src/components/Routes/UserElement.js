import React from "react";

function UserElement({ userType, children }) {
  if (userType === "user") {
    return <>{children}</>;
  } else {
    return (
      <div>
        <div style={{ color: "red", marginTop: "40px", fontSize: "30px" }}>
          You do not have access to this page. Login required !
        </div>
      </div>
    );
  }
}

export default UserElement;
