import React from "react";
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
  LinearProgress,
  Skeleton,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CardRow from "./CardRow";

const columns = [
  {
    id: "cardNumber",
    label: "Certification No.",
    mobile: false,
    sortable: true,
  },
  { id: "name", label: "Name", mobile: true, sortable: true },
  { id: "set", label: "Set", mobile: false, sortable: false },
  { id: "releaseYear", label: "Release Year", mobile: false, sortable: true },
  { id: "language", label: "Language", mobile: false, sortable: false },
  { id: "label", label: "Label", mobile: false, sortable: false },
  {
    id: "certificationNumber",
    label: "Card No.",
    mobile: false,
    sortable: false,
  },
  { id: "address", label: "Address", mobile: false, sortable: false },
  { id: "termsAgreed", label: "Terms Agreed", mobile: true, sortable: false },
  { id: "holographic", label: "Holographic", mobile: true, sortable: false },
  { id: "rarity", label: "Rarity", mobile: true, sortable: false },
  { id: "image", label: "Front Image", mobile: true, sortable: false },
  { id: "image2", label: "Backside Image", mobile: true, sortable: false },
  { id: "grade", label: "Grade", mobile: false, sortable: true },
  { id: "subgrade", label: "Sub Grade", mobile: false, sortable: false },
  {
    id: "trackingStatus",
    label: "Tracking Status",
    mobile: true,
    sortable: false,
  },
  { id: "rating", label: "Rating", mobile: false, sortable: false },
  { id: "trackingID", label: "Tracking ID", mobile: false, sortable: false },
  { id: "userId", label: "User ID", mobile: false, sortable: false },
  { id: "qrView", label: "QR View", mobile: true, sortable: false },
  { id: "qrDownload", label: "Download QR", mobile: true, sortable: false },
  { id: "actions", label: "Actions", mobile: true, sortable: false },
];

function CardsTable({
  cards,
  page,
  rowsPerPage,
  isMobile,
  onPageChange,
  onRowsPerPageChange,
  onEditCard,
  onViewQR,
  onDeleteCard,
  sortConfig,
  requestSort,
  isFetching,
}) {
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 25));
  };

  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: "12px", overflow: "hidden", position: "relative" }}
    >
      {isFetching && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            height: 2,
          }}
        />
      )}

      <TableContainer
        sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
      >
        <Table
          stickyHeader
          aria-label="cards table"
          size={isMobile ? "small" : "medium"}
        >
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
                        cursor: column.sortable ? "pointer" : "default",
                        minWidth: isMobile ? 100 : "auto",
                        "&:hover": {
                          backgroundColor: column.sortable
                            ? theme.palette.primary.dark
                            : theme.palette.primary.main,
                        },
                      }}
                      onClick={
                        column.sortable
                          ? () => requestSort(column.id)
                          : undefined
                      }
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {column.label}
                        {sortConfig.key === column.id && (
                          <Box sx={{ ml: 0.5 }}>
                            {sortConfig.direction === "asc" ? (
                              <ArrowUpwardIcon fontSize="small" />
                            ) : (
                              <ArrowDownwardIcon fontSize="small" />
                            )}
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching && cards.length === 0 ? (
              // Skeleton loading for initial load
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns
                    .filter((col) => !isMobile || col.mobile)
                    .map((column) => (
                      <TableCell key={`${column.id}-${index}`}>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : cards.length > 0 ? (
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
                  colSpan={
                    columns.filter((col) => !isMobile || col.mobile).length
                  }
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
        rowsPerPageOptions={[25, 50, 100]}
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
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              mb: 0,
            },
        }}
      />
    </Paper>
  );
}

export default CardsTable;
