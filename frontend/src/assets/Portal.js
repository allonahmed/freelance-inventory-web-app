import { PortalWithState } from "react-portal";
import React, { useEffect } from "react";

export const Portal = () => {
  useEffect(() => {
    if (open) {
      // document.getElementById("root").style.filter = "grayscale(100%)";
      document.getElementById("root").style.opacity = ".6";
    } else {
      document.getElementById("root").style.opacity = "1";
    }
  }, [open]);

  return (
    <div className="portal" style={{ color: "white" }}>
      <PortalWithState
        node={document.getElementById("portal")}
        closeOnOutsideClick
        closeOnEsc
      >
        {({ openPortal, closePortal, isOpen, portal }) => (
          <React.Fragment>
            <button onClick={openPortal}>Open Portal</button>
            {portal(
              <p className="modal">
                This is more advanced Portal. It handles its own state.{" "}
                <button onClick={closePortal}>Close me!</button>, hit ESC or
                click outside of me.
              </p>
            )}
          </React.Fragment>
        )}
      </PortalWithState>
    </div>
  );
};
