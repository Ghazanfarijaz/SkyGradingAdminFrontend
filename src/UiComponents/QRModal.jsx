import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import QRCode from "react-qr-code";
const DownloadIcon = GetAppIcon; // Create alias if needed

function QRModal({ open, onClose, cardNumber }) {
  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR_${cardNumber}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>QR Code for Card: {cardNumber}</DialogTitle>
      <DialogContent>
        <QRCode id="qr-code-svg" value={cardNumber} size={256} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDownloadQR} startIcon={<DownloadIcon />}>
          Download
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default QRModal;
