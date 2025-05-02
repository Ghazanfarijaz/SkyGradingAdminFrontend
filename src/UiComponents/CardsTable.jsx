import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Chip,
  Rating,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardRow from "./CardRow";

const columns = [
  { id: "cardNumber", label: "Certification No.", mobile: false },
  { id: "name", label: "Name", mobile: true },
  { id: "set", label: "Set", mobile: false },
  { id: "releaseYear", label: "Release Year", mobile: false },
  { id: "language", label: "Language", mobile: false },
  { id: "label", label: "Label", mobile: false },
  { id: "certificationNumber", label: "Card No.", mobile: false },
  { id: "address", label: "Address", mobile: false },
  { id: "termsAgreed", label: "Terms Agreed", mobile: true },
  { id: "holographic", label: "Holographic", mobile: true },
  { id: "rarity", label: "Rarity", mobile: true },
  { id: "image", label: "Front Image", mobile: true },
  { id: "image2", label: "Backside Image", mobile: true },
  { id: "grade", label: "Grade", mobile: false },
  { id: "subgrade", label: "Sub Grade", mobile: false },
  { id: "trackingStatus", label: "Tracking Status", mobile: true },
  { id: "rating", label: "Rating", mobile: false },
  { id: "trackingID", label: "Tracking ID", mobile: false },
  { id: "userId", label: "User ID", mobile: false },
  { id: "qrView", label: "QR View", mobile: true },
  { id: "qrDownload", label: "Download QR", mobile: true },
  { id: "actions", label: "Actions", mobile: true },
];

function CardsTable({
  cards,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEditCard,
  onViewQR,
  onDeleteCard,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh)", overflow: "auto" }}>
        <Table stickyHeader aria-label="cards table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              {columns.map(
                (column) =>
                  (!isMobile || column.mobile) && (
                    <TableCell
                      key={column.id}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        backgroundColor: theme.palette.primary.main,
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.length > 0 ? (
              cards
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((card) => (
                  <CardRow
                    key={card.id || card.cardNumber}
                    card={card}
                    isMobile={isMobile}
                    onEdit={() => onEditCard(card)}
                    onViewQR={() => onViewQR(card.cardNumber)}
                    onDelete={() => onDeleteCard(card.cardNumber)}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center", py: 4 }}
                >
                  No cards found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
        component="div"
        count={cards.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          "& .MuiTablePagination-toolbar": {
            padding: "8px 16px",
          },
        }}
      />
    </Paper>
  );
}

export default CardsTable;
