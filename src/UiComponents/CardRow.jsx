import {
  TableCell,
  TableRow,
  Avatar,
  Chip,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CardRow({ card, isMobile, onEdit, onViewQR, onDelete }) {
  const renderCellContent = (field) => {
    switch (field) {
      // Text fields
      case "cardNumber":
      case "name":
      case "set":
      case "releaseYear":
      case "language":
      case "label":
      case "certificationNumber":
      case "address":
      case "grade":
      case "trackingID":
      case "userId":
        return card[field];

      // Boolean chips
      case "termsAgreed":
        return (
          <Chip
            label={card.termsAgreed ? "Agreed" : "Not Agreed"}
            color={card.termsAgreed ? "success" : "error"}
            size="small"
          />
        );

      case "holographic":
        return (
          <Chip
            label={card.holographic ? "Holographic" : "Reverse Holographic"}
            color={card.holographic ? "success" : "error"}
            size="small"
          />
        );

      // Rarity chip
      case "rarity":
        return (
          <Chip
            label={card.rarity}
            color={
              card.rarity === "rare"
                ? "secondary"
                : card.rarity === "common"
                ? "primary"
                : "default"
            }
            size="small"
          />
        );

      // Images
      case "image":
      case "image2":
        return (
          <Avatar
            src={card[field]}
            alt={field === "image" ? "Front" : "Back"}
            sx={{ width: 50, height: 50 }}
          />
        );

      // Subgrade (combined)
      case "subgrade":
        return !isMobile ? Object.values(card.subgrade).join(", ") : null;

      // Tracking status
      case "trackingStatus":
        return (
          <Chip
            label={card.trackingStatus}
            color={
              card.trackingStatus === "delivered"
                ? "success"
                : card.trackingStatus === "shipped"
                ? "info"
                : "warning"
            }
            size="small"
          />
        );

      // Rating
      case "rating":
        return !isMobile ? <Rating value={card.rating} readOnly /> : null;

      // QR Actions
      case "qrView":
        return (
          <Tooltip title="View QR">
            <IconButton onClick={() => onViewQR(card.cardNumber)}>
              <VisibilityIcon color="primary" />
            </IconButton>
          </Tooltip>
        );

      case "qrDownload":
        return (
          <Tooltip title="Download QR">
            <IconButton onClick={() => onViewQR(card.cardNumber)}>
              <GetAppIcon color="primary" />
            </IconButton>
          </Tooltip>
        );

      // Actions
      case "actions":
        return (
          <div>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(card)}>
                <EditIcon color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete(card.cardNumber)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </div>
        );

      default:
        return card[field];
    }
  };

  // Define column order and mobile visibility
  const columns = [
    { id: "cardNumber", mobile: false },
    { id: "name", mobile: true },
    { id: "set", mobile: false },
    { id: "releaseYear", mobile: false },
    { id: "language", mobile: false },
    { id: "label", mobile: false },
    { id: "certificationNumber", mobile: false },
    { id: "address", mobile: false },
    { id: "termsAgreed", mobile: true },
    { id: "holographic", mobile: true },
    { id: "rarity", mobile: true },
    { id: "image", mobile: true },
    { id: "image2", mobile: true },
    { id: "grade", mobile: false },
    { id: "subgrade", mobile: false },
    { id: "trackingStatus", mobile: true },
    { id: "rating", mobile: false },
    { id: "trackingID", mobile: false },
    { id: "userId", mobile: false },
    { id: "qrView", mobile: true },
    { id: "qrDownload", mobile: true },
    { id: "actions", mobile: true },
  ];

  return (
    <TableRow hover>
      {columns.map(
        (column) =>
          (!isMobile || column.mobile) && (
            <TableCell key={`${card.id}-${column.id}`}>
              {renderCellContent(column.id)}
            </TableCell>
          )
      )}
    </TableRow>
  );
}

export default CardRow;
