import React, { useState } from "react";
import {
  Typography,
  Button,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  useGetNewOrdersQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useAddCardMutation,
} from "../api/apiSlice";
import CardsTable from "../UiComponents/CardsTable";
import AddCardModal from "../UiComponents/AddCardModal";
import EditCardModal from "../UiComponents/EditCardModal";
import QRModal from "../UiComponents/QRModal";
import DeleteModal from "../UiComponents/DeleteModal";

function NewOrder() {
  const {
    data: cards = [],
    error,
    isLoading,
    isFetching,
  } = useGetNewOrdersQuery();
  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [addCard] = useAddCardMutation();

  // State management
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [qrCardNumber, setQRCardNumber] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortLoading, setSortLoading] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    key: "cardNumber",
    direction: "asc",
  });

  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const requestSort = (key) => {
    setSortLoading(true);

    // Use setTimeout to allow UI to update before heavy computation
    setTimeout(() => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
      setSortLoading(false);
    }, 50);
  };

  const sortedCards = React.useMemo(() => {
    const sortableCards = [...cards];
    if (sortConfig.key) {
      sortableCards.sort((a, b) => {
        // Handle null/undefined values
        if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
        if (!a[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        if (!b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;

        // Compare values
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCards;
  }, [cards, sortConfig]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="success" sx={{ m: 2 }}>
        No New orders {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ padding: "24px", position: "relative" }}>
      {/* Loading overlay for sorting */}
      {sortLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Cards Management
        </Typography>

        <Box>
          <Tooltip title="Sort options">
            <IconButton
              onClick={handleSortMenuOpen}
              sx={{ mr: 2, backgroundColor: theme.palette.action.hover }}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)}
          >
            Add Card
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={handleSortMenuClose}
      >
        <MenuItem disabled sx={{ fontWeight: "bold" }}>
          Sort By
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            requestSort("cardNumber");
            handleSortMenuClose();
          }}
        >
          Certification No.
          {sortConfig.key === "cardNumber" &&
            (sortConfig.direction === "asc" ? (
              <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
            ) : (
              <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
            ))}
        </MenuItem>
        <MenuItem
          onClick={() => {
            requestSort("name");
            handleSortMenuClose();
          }}
        >
          Name
          {sortConfig.key === "name" &&
            (sortConfig.direction === "asc" ? (
              <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
            ) : (
              <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
            ))}
        </MenuItem>
        <MenuItem
          onClick={() => {
            requestSort("releaseYear");
            handleSortMenuClose();
          }}
        >
          Release Year
          {sortConfig.key === "releaseYear" &&
            (sortConfig.direction === "asc" ? (
              <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
            ) : (
              <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
            ))}
        </MenuItem>
        <MenuItem
          onClick={() => {
            requestSort("grade");
            handleSortMenuClose();
          }}
        >
          Grade
          {sortConfig.key === "grade" &&
            (sortConfig.direction === "asc" ? (
              <ArrowUpwardIcon fontSize="small" sx={{ ml: 1 }} />
            ) : (
              <ArrowDownwardIcon fontSize="small" sx={{ ml: 1 }} />
            ))}
        </MenuItem>
      </Menu>

      <CardsTable
        cards={sortedCards}
        page={page}
        rowsPerPage={rowsPerPage}
        isMobile={isMobile}
        onPageChange={setPage}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value);
          setPage(0);
        }}
        onEditCard={(card) => {
          setSelectedCard(card);
          setOpenEditModal(true);
        }}
        onViewQR={(cardNumber) => {
          setQRCardNumber(cardNumber);
          setOpenQRModal(true);
        }}
        onDeleteCard={(cardNumber) => {
          setCardToDelete(cardNumber);
          setOpenDeleteModal(true);
        }}
        sortConfig={sortConfig}
        requestSort={requestSort}
        isFetching={isFetching}
      />

      {/* Modals */}
      <EditCardModal
        open={openEditModal}
        card={selectedCard}
        onClose={() => setOpenEditModal(false)}
        onSave={updateCard}
      />

      <AddCardModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={addCard}
      />

      <QRModal
        open={openQRModal}
        cardNumber={qrCardNumber}
        onClose={() => setOpenQRModal(false)}
      />

      <DeleteModal
        open={openDeleteModal}
        cardNumber={cardToDelete}
        onClose={() => setOpenDeleteModal(false)}
        onDelete={deleteCard}
      />
    </Box>
  );
}

export default NewOrder;
