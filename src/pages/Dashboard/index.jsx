import React from "react";
import { Container } from "reactstrap";
import { QRCode } from "react-qrcode-logo";
import qrIcon from "@/assets/brand/icon.png";

const Dashboard = () => {
  document.title = "Dashboard | Admin YouthCamp";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4>Dashboard</h4>
          <hr />
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <h5>QR Pelatihan</h5>
              <QRCode
                value="a2261913-45a8-4867-80c4-efed5f9110a7"
                logoImage={qrIcon}
                logoWidth={300}
                logoOpacity={0.2}
                qrStyle="dots"
                bgColor="#FFC40C"
                fgColor="#EE157F"
                quietZone={20}
                size={300}
                eyeColor={["#EE157F", "#96519B", "#2EB4AC"]}
                eyeRadius={[
                  {
                    outer: [16, 16, 0, 16],
                    inner: [1, 1, 1, 1],
                  },
                  {
                    outer: [16, 16, 16, 0],
                    inner: [1, 1, 1, 1],
                  },
                  {
                    outer: [16, 0, 16, 16],
                    inner: [1, 1, 1, 1],
                  },
                ]}
              />
            </div>
            <div>
              <h5>QR Redeem Kado</h5>
              <QRCode
                value="a2261913-45a8-4867-80c4-efed5f9110a6"
                logoImage={qrIcon}
                logoWidth={300}
                logoOpacity={0.2}
                qrStyle="dots"
                bgColor="#FFC40C"
                fgColor="#EE157F"
                quietZone={20}
                size={300}
                eyeColor={["#EE157F", "#96519B", "#2EB4AC"]}
                eyeRadius={[
                  {
                    outer: [16, 16, 0, 16],
                    inner: [1, 1, 1, 1],
                  },
                  {
                    outer: [16, 16, 16, 0],
                    inner: [1, 1, 1, 1],
                  },
                  {
                    outer: [16, 0, 16, 16],
                    inner: [1, 1, 1, 1],
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
