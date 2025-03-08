// import { useState , useEffect} from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   IconButton,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
//   Rating,
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import { useGetAllCardsQuery, useUpdateCardMutation } from "../api/apiSlice"; // Import updateCard mutation

// function Cards() {
//   const { data: cards, error, isLoading } = useGetAllCardsQuery(); // Fetching cards from the API
//   const [updateCard] = useUpdateCardMutation(); // Replace with the actual mutation hook for updating cards
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [open, setOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });


//   // Handle pagination change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handle modal open
//   const handleOpen = (card) => {
//     setSelectedCard({...card}); // Ensure a fresh copy of the card is passed
//     setOpen(true);
//   };

//   // Handle modal close
//   const handleClose = () => {
//     setOpen(false);
//     setSelectedCard(null);
//   };

//   // Handle form field changes
//   const handleChange = (event) => {
//     setSelectedCard({
//       ...selectedCard,
//       [event.target.name]: event.target.value,
//     });
//   };

//   useEffect(() => {
//     console.log('Selected Card:', selectedCard); // Check if it's being updated properly
//   }, [selectedCard]);

//   // Handle saving changes to the card
//   const handleSave = async () => {
//     console.log('Saving', selectedCard); // Log the payload before sending
//     if (!selectedCard) return; // Make sure selectedCard is not null or undefined
//     const { cardNumber, ...cardData } = selectedCard;  
//     try {
//       await updateCard({ cardNumber, cardData }).unwrap();      
//       handleClose(); // Close the modal on successful update
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };
  

 
  

//   // Handle loading and error states
//   if (isLoading) {
//     return <Typography variant="h6">Loading cards...</Typography>;
//   }

//   if (error) {
//     return (
//       <Typography variant="h6" color="error">
//         Error fetching cards
//       </Typography>
//     );
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Cards
//       </Typography>

//       <Paper>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Card No.</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Set</TableCell>
//                 <TableCell>Release Year</TableCell>
//                 <TableCell>Language</TableCell>
//                 <TableCell>Label</TableCell>
//                 <TableCell>Certification No.</TableCell>
//                 <TableCell>Address</TableCell>
//                 <TableCell>Terms Agreed</TableCell>
//                 <TableCell>Rarity</TableCell>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Grade</TableCell>
//                 <TableCell>Sub Grade</TableCell>
//                 <TableCell>Tracking Status</TableCell>
//                 <TableCell>Rating</TableCell>
//                 <TableCell>Tracking ID</TableCell>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cards
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((card) => (
//                   <TableRow key={card.id}>
//                     <TableCell>{card.cardNumber}</TableCell>
//                     <TableCell>{card.name}</TableCell>
//                     <TableCell>{card.set}</TableCell>
//                     <TableCell>{card.releaseYear}</TableCell>
//                     <TableCell>{card.language}</TableCell>
//                     <TableCell>{card.label}</TableCell>
//                     <TableCell>{card.certificationNumber}</TableCell>
//                     <TableCell>{card.address}</TableCell>
//                     <TableCell>{card.termsAgreed}</TableCell>
//                     <TableCell>{card.rarity}</TableCell>
//                     <TableCell>{card.image}</TableCell>
//                     <TableCell>{card.grade}</TableCell>
//                     <TableCell>{Object.values(card.subgrade).join(", ")}</TableCell>
//                     <TableCell>{card.trackingStatus}</TableCell>
//                     <TableCell>{card.rating}</TableCell>
//                     <TableCell>{card.trackingID}</TableCell>
//                     <TableCell>{card.userId}</TableCell>
//                     <TableCell>
//                       <IconButton size="small" onClick={() => handleOpen(card)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton size="small" color="error">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={cards.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       {/* Edit Modal */}
// {/* Edit Modal */}
// {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//   <DialogTitle>Edit Card</DialogTitle>
//   <DialogContent>
//     {[
//       {
//         name: "cardNumber",
//         type: "text",
//       },
//       {
//         name: "name",
//         type: "text",
//       },
//       {
//         name: "set",
//         type: "text",
//       },
//       {
//         name: "releaseYear",
//         type: "number",
//       },
//       {
//         name: "language",
//         type: "text",
//       },
//       {
//         name: "label",
//         type: "text",
//       },
//       {
//         name: "certificationNumber",
//         type: "text",
//       },
//       {
//         name: "address",
//         type: "text",
//       },
//       {
//         name: "termsAgreed",
//         type: "menu",
//         options: [
//           { value: true, label: "True" },
//           { value: false, label: "False" },
//         ],
//       },
//       {
//         name: "rarity",
//         type: "menu",
//         options: [
//           { value: "rare", label: "Rare" },
//           { value: "common", label: "Common" },
//           { value: "normal", label: "Normal" },
//         ],
//       },
//       {
//         name: "image",
//         type: "text",
//       },
//       {
//         name: "grade",
//         type: "numberRange",
//         range: { min: 1, max: 10 },
//       },
//       {
//         name: "trackingStatus",
//         type: "menu",
//         options: [
//           { value: "pending", label: "Pending" },
//           { value: "completed", label: "Completed" },
//           { value: "inprogress", label: "In Progress" },
//         ],
//       },
//       {
//         name: "rating",
//         type: "stars",
//         range: { min: 1, max: 5 },
//       },
//       {
//         name: "trackingID",
//         type: "text",
//       },
//       {
//         name: "userId",
//         type: "number",
//       },
//     ].map(({ name, type, options, range }) => {
//       const label = name.replace(/([A-Z])/g, " $1").trim();

//       if (type === "menu") {
//         return (
//           <TextField
//             key={name}
//             margin="normal"
//             label={label}
//             name={name}
//             fullWidth
//             select
//             value={selectedCard?.[name] || ""}
//             onChange={handleChange}
//           >
//             {options.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         );
//       }

//       if (type === "stars") {
//         return (
//           <div key={name} style={{ margin: "1rem 0" }}>
//             <Typography>{label}</Typography>
//             <Rating
//               name={name}
//               value={selectedCard?.[name] || 0}
//               max={range.max}
//               onChange={(e, newValue) => handleChange({ target: { name, value: newValue } })}
//             />
//           </div>
//         );
//       }

//       if (type === "numberRange") {
//         return (
//           <TextField
//             key={name}
//             margin="normal"
//             label={label}
//             name={name}
//             fullWidth
//             type="number"
//             inputProps={{
//               min: range.min,
//               max: range.max,
//             }}
//             value={selectedCard?.[name] || ""}
//             onChange={handleChange}
//           />
//         );
//       }

//       return (
//         <TextField
//           key={name}
//           margin="normal"
//           label={label}
//           name={name}
//           fullWidth
//           type={type}
//           value={selectedCard?.[name] || ""}
//           onChange={handleChange}
//         />
//       );
//     })}
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleClose} color="secondary">
//       Cancel
//     </Button>
//     <Button onClick={handleSave} color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog> */}
// {/* Edit Modal */}
// <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//   <DialogTitle>Edit Card</DialogTitle>
//   <DialogContent>
//     {/* Existing Fields */}
//     {[
//       {
//         name: "cardNumber",
//         type: "text",
//       },
//       {
//         name: "name",
//         type: "text",
//       },
//       {
//         name: "set",
//         type: "text",
//       },
//       {
//         name: "releaseYear",
//         type: "number",
//       },
//       {
//         name: "language",
//         type: "text",
//       },
//       {
//         name: "label",
//         type: "text",
//       },
//       {
//         name: "certificationNumber",
//         type: "text",
//       },
//       {
//         name: "address",
//         type: "text",
//       },
//       {
//         name: "termsAgreed",
//         type: "menu",
//         options: [
//           { value: true, label: "True" },
//           { value: false, label: "False" },
//         ],
//       },
//       {
//         name: "rarity",
//         type: "menu",
//         options: [
//           { value: "rare", label: "Rare" },
//           { value: "common", label: "Common" },
//           { value: "normal", label: "Normal" },
//         ],
//       },
//       {
//         name: "image",
//         type: "text",
//       },
//       {
//         name: "grade",
//         type: "numberRange",
//         range: { min: 1, max: 10 },
//       },
//       {
//         name: "trackingStatus",
//         type: "menu",
//         options: [
//           { value: "pending", label: "Pending" },
//           { value: "completed", label: "Completed" },
//           { value: "inprogress", label: "In Progress" },
//         ],
//       },
//       {
//         name: "rating",
//         type: "stars",
//         range: { min: 1, max: 5 },
//       },
//       {
//         name: "trackingID",
//         type: "text",
//       },
//       {
//         name: "userId",
//         type: "number",
//       },
//     ].map(({ name, type, options, range }) => {
//       const label = name.replace(/([A-Z])/g, " $1").trim();

//       if (type === "menu") {
//         return (
//           <TextField
//             key={name}
//             margin="normal"
//             label={label}
//             name={name}
//             fullWidth
//             select
//             value={selectedCard?.[name] || ""}
//             onChange={handleChange}
//           >
//             {options.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         );
//       }

//       if (type === "stars") {
//         return (
//           <div key={name} style={{ margin: "1rem 0" }}>
//             <Typography>{label}</Typography>
//             <Rating
//               name={name}
//               value={selectedCard?.[name] || 0}
//               max={range.max}
//               onChange={(e, newValue) =>
//                 handleChange({ target: { name, value: newValue } })
//               }
//             />
//           </div>
//         );
//       }

//       if (type === "numberRange") {
//         return (
//           <TextField
//             key={name}
//             margin="normal"
//             label={label}
//             name={name}
//             fullWidth
//             type="number"
//             inputProps={{
//               min: range.min,
//               max: range.max,
//             }}
//             value={selectedCard?.[name] || ""}
//             onChange={handleChange}
//           />
//         );
//       }

//       return (
//         <TextField
//           key={name}
//           margin="normal"
//           label={label}
//           name={name}
//           fullWidth
//           type={type}
//           value={selectedCard?.[name] || ""}
//           onChange={handleChange}
//         />
//       );
//     })}

//     {/* Subgrade Fields */}
//     <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//       Subgrade
//     </Typography>
//     {["surface", "edging", "centering", "corners"].map((field) => (
//       <TextField
//         key={field}
//         margin="normal"
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//         name={`subgrade.${field}`}
//         fullWidth
//         type="number"
//         value={selectedCard?.subgrade?.[field] || ""}
//         onChange={(e) =>
//           handleChange({
//             target: {
//               name: "subgrade",
//               value: {
//                 ...selectedCard.subgrade,
//                 [field]: parseFloat(e.target.value),
//               },
//             },
//           })
//         }
//       />
//     ))}
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleClose} color="secondary">
//       Cancel
//     </Button>
//     <Button onClick={handleSave} color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog>

//     </div>
//   );
// }

// export default Cards;


//===========================================================================

//===========================================================================

// Perfect Version ==========================================================

//===========================================================================

// import { useState } from "react";
// import { QRCode } from "react-qr-code"; // For QR code generation
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
//   Rating,
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, GetApp as GetAppIcon } from "@mui/icons-material";
// import { useGetAllCardsQuery, useUpdateCardMutation, useDeleteCardMutation  } from "../api/apiSlice";

// function Cards() {
//   const { data: cards, error, isLoading } = useGetAllCardsQuery();
//   const [updateCard] = useUpdateCardMutation();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [imageFile, setImageFile] = useState(null); // State to store the selected image file
//   const [openQRModal, setOpenQRModal] = useState(false); // State for QR modal
//   const [qrCardNumber, setQRCardNumber] = useState(""); // State to store the card number for QR code

//   const [deleteCard] = useDeleteCardMutation();
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
// const [cardToDelete, setCardToDelete] = useState(null); // Store the card to delete

//   console.log("cards", cards);

//   // Handle pagination change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handle edit modal open
//   const handleOpenEditModal = (card) => {
//     setSelectedCard({ ...card });
//     setOpenEditModal(true);
//   };

//   // Handle edit modal close
//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setSelectedCard(null);
//     setImageFile(null); // Reset the image file state
//   };

//   // Handle QR modal open
//   const handleOpenQRModal = (cardNumber) => {
//     setQRCardNumber(cardNumber);
//     setOpenQRModal(true);
//   };

//   // Handle QR modal close
//   const handleCloseQRModal = () => {
//     setOpenQRModal(false);
//     setQRCardNumber("");
//   };

//   // Handle form field changes
//   const handleChange = (event) => {
//     setSelectedCard({
//       ...selectedCard,
//       [event.target.name]: event.target.value,
//     });
//   };

//   // Handle image file selection
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setImageFile(file); // Store the selected file
//   };

//   // Upload image to Cloudinary
//   const uploadImageToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dnfc9g33c/image/upload", // Replace with your Cloudinary cloud name
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       const data = await response.json();
//       return data.secure_url; // Return the Cloudinary image URL
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       return null;
//     }
//   };

//   // Handle saving changes to the card
//   const handleSave = async () => {
//     if (!selectedCard) return;

//     // Upload the image to Cloudinary if a new image is selected
//     if (imageFile) {
//       const imageUrl = await uploadImageToCloudinary(imageFile);
//       if (imageUrl) {
//         selectedCard.image = imageUrl; // Update the image URL in the selectedCard state
//       }
//     }

//     const { cardNumber, ...cardData } = selectedCard;
//     try {
//       await updateCard({ cardNumber, cardData }).unwrap();
//       handleCloseEditModal(); // Close the modal on successful update
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   // Handle downloading QR code
//   const handleDownloadQR = () => {
//     const svg = document.getElementById("qr-code-svg");
//     if (svg) {
//       const svgData = new XMLSerializer().serializeToString(svg);
//       const blob = new Blob([svgData], { type: "image/svg+xml" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `QR_${qrCardNumber}.svg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const handleDeleteCard = async (cardNumber) => {
//     try {
//       await deleteCard(cardNumber).unwrap(); // Call the delete mutation
//       alert("Card deleted successfully!"); // Show success message
//     } catch (error) {
//       console.error("Failed to delete card:", error);
//       alert("Failed to delete card."); // Show error message
//     }
//   };

//   // Handle loading and error states
//   if (isLoading) {
//     return <Typography variant="h6">Loading cards...</Typography>;
//   }

//   if (error) {
//     return (
//       <Typography variant="h6" color="error">
//         Error fetching cards
//       </Typography>
//     );
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Cards
//       </Typography>

//       <Paper>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Card No.</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Set</TableCell>
//                 <TableCell>Release Year</TableCell>
//                 <TableCell>Language</TableCell>
//                 <TableCell>Label</TableCell>
//                 <TableCell>Certification No.</TableCell>
//                 <TableCell>Address</TableCell>
//                 <TableCell>Terms Agreed</TableCell>
//                 <TableCell>Rarity</TableCell>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Grade</TableCell>
//                 <TableCell>Sub Grade</TableCell>
//                 <TableCell>Tracking Status</TableCell>
//                 <TableCell>Rating</TableCell>
//                 <TableCell>Tracking ID</TableCell>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>QR View</TableCell>
//                 <TableCell>Download QR</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cards
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((card) => (
//                   <TableRow key={card.id}>
//                     <TableCell>{card.cardNumber}</TableCell>
//                     <TableCell>{card.name}</TableCell>
//                     <TableCell>{card.set}</TableCell>
//                     <TableCell>{card.releaseYear}</TableCell>
//                     <TableCell>{card.language}</TableCell>
//                     <TableCell>{card.label}</TableCell>
//                     <TableCell>{card.certificationNumber}</TableCell>
//                     <TableCell>{card.address}</TableCell>
//                     <TableCell>{card.termsAgreed}</TableCell>
//                     <TableCell>{card.rarity}</TableCell>
//                     <TableCell>
//                       <img src={card.image} alt="Card" style={{ width: "50px", height: "50px" }} />
//                     </TableCell>
//                     <TableCell>{card.grade}</TableCell>
//                     <TableCell>{Object.values(card.subgrade).join(", ")}</TableCell>
//                     <TableCell>{card.trackingStatus}</TableCell>
//                     <TableCell>{card.rating}</TableCell>
//                     <TableCell>{card.trackingID}</TableCell>
//                     <TableCell>{card.userId}</TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
//                         <VisibilityIcon />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
//                         <GetAppIcon />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton size="small" onClick={() => handleOpenEditModal(card)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//   size="small"
//   color="error"
//   onClick={() => {
//     setCardToDelete(card.cardNumber); // Set the card to delete
//     setOpenDeleteModal(true); // Open the confirmation modal
//   }}
// >
//   <DeleteIcon />
// </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={cards.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       {/* QR Code Modal */}
//       <Dialog open={openQRModal} onClose={handleCloseQRModal}>
//         <DialogTitle>QR Code for Card Number: {qrCardNumber}</DialogTitle>
//         <DialogContent>
//           <QRCode id="qr-code-svg" value={qrCardNumber} size={256} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDownloadQR} color="primary">
//             Download QR
//           </Button>
//           <Button onClick={handleCloseQRModal} color="secondary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Modal */}
//       <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Card</DialogTitle>
//         <DialogContent>
//           {/* Existing Fields */}
//           {[
//             {
//               name: "cardNumber",
//               type: "text",
//             },
//             {
//               name: "name",
//               type: "text",
//             },
//             {
//               name: "set",
//               type: "text",
//             },
//             {
//               name: "releaseYear",
//               type: "number",
//             },
//             {
//               name: "language",
//               type: "text",
//             },
//             {
//               name: "label",
//               type: "text",
//             },
//             {
//               name: "certificationNumber",
//               type: "text",
//             },
//             {
//               name: "address",
//               type: "text",
//             },
//             {
//               name: "termsAgreed",
//               type: "menu",
//               options: [
//                 { value: true, label: "True" },
//                 { value: false, label: "False" },
//               ],
//             },
//             {
//               name: "rarity",
//               type: "menu",
//               options: [
//                 { value: "rare", label: "Rare" },
//                 { value: "common", label: "Common" },
//                 { value: "normal", label: "Normal" },
//               ],
//             },
//             {
//               name: "image",
//               type: "text",
//             },
//             {
//               name: "grade",
//               type: "numberRange",
//               range: { min: 1, max: 10 },
//             },
//             {
//               name: "trackingStatus",
//               type: "menu",
//               options: [
//                 { value: "confirmed", label: "Order Confirmed" },
//                 { value: "shipped", label: "Shipped" },
//                 { value: "checking", label: "Checking" },
//                 { value: "delivered", label: "Delivered" },
//               ],
//             },
//             {
//               name: "rating",
//               type: "stars",
//               range: { min: 1, max: 5 },
//             },
//             {
//               name: "trackingID",
//               type: "text",
//             },
//             {
//               name: "userId",
//               type: "number",
//             },
//           ].map(({ name, type, options, range }) => {
//             const label = name.replace(/([A-Z])/g, " $1").trim();

//             if (type === "menu") {
//               return (
//                 <TextField
//                   key={name}
//                   margin="normal"
//                   label={label}
//                   name={name}
//                   fullWidth
//                   select
//                   value={selectedCard?.[name] || ""}
//                   onChange={handleChange}
//                 >
//                   {options.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               );
//             }

//             if (type === "stars") {
//               return (
//                 <div key={name} style={{ margin: "1rem 0" }}>
//                   <Typography>{label}</Typography>
//                   <Rating
//                     name={name}
//                     value={selectedCard?.[name] || 0}
//                     max={range.max}
//                     onChange={(e, newValue) =>
//                       handleChange({ target: { name, value: newValue } })
//                     }
//                   />
//                 </div>
//               );
//             }

//             if (type === "numberRange") {
//               return (
//                 <TextField
//                   key={name}
//                   margin="normal"
//                   label={label}
//                   name={name}
//                   fullWidth
//                   type="number"
//                   inputProps={{
//                     min: range.min,
//                     max: range.max,
//                   }}
//                   value={selectedCard?.[name] || ""}
//                   onChange={handleChange}
//                 />
//               );
//             }

//             return (
//               <TextField
//                 key={name}
//                 margin="normal"
//                 label={label}
//                 name={name}
//                 fullWidth
//                 type={type}
//                 value={selectedCard?.[name] || ""}
//                 onChange={handleChange}
//               />
//             );
//           })}

//           {/* Image Upload Field */}
//           <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//             Upload Image
//           </Typography>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ marginBottom: "1rem" }}
//           />

//           {/* Subgrade Fields */}
//           <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//             Subgrade
//           </Typography>
//           {["surface", "edging", "centering", "corners"].map((field) => (
//             <TextField
//               key={field}
//               margin="normal"
//               label={field.charAt(0).toUpperCase() + field.slice(1)}
//               name={`subgrade.${field}`}
//               fullWidth
//               type="number"
//               value={selectedCard?.subgrade?.[field] || ""}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "subgrade",
//                     value: {
//                       ...selectedCard.subgrade,
//                       [field]: parseFloat(e.target.value),
//                     },
//                   },
//                 })
//               }
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
//   <DialogTitle>Confirm Delete</DialogTitle>
//   <DialogContent>
//     <Typography>Are you sure you want to delete this card?</Typography>
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setOpenDeleteModal(false)} color="secondary">
//       Cancel
//     </Button>
//     <Button
//       onClick={() => {
//         handleDeleteCard(cardToDelete); // Call the delete function
//         setOpenDeleteModal(false); // Close the modal
//       }}
//       color="error"
//     >
//       Delete
//     </Button>
//   </DialogActions>
// </Dialog>
//     </div>
//   );
// }

// export default Cards;



//==================================================================================



// import { useState } from "react";
// import { QRCode } from "react-qr-code";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
//   Rating,
//   Avatar,
//   Chip,
//   CircularProgress,
//   Alert,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   GetApp as GetAppIcon,
// } from "@mui/icons-material";
// import { useGetAllCardsQuery, useUpdateCardMutation, useDeleteCardMutation } from "../api/apiSlice";

// function Cards() {
//   const { data: cards, error, isLoading } = useGetAllCardsQuery();
//   const [updateCard] = useUpdateCardMutation();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [openQRModal, setOpenQRModal] = useState(false);
//   const [qrCardNumber, setQRCardNumber] = useState("");
//   const [deleteCard] = useDeleteCardMutation();
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   // Check for mobile view
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Handle loading and error states
//   if (isLoading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert severity="error" sx={{ margin: "24px" }}>
//         Error fetching cards: {error.message}
//       </Alert>
//     );
//   }

//   // Handle empty data
//   if (!cards || cards.length === 0) {
//     return (
//       <Alert severity="info" sx={{ margin: "24px" }}>
//         No cards found.
//       </Alert>
//     );
//   }

//   // Handle pagination change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handle edit modal open
//   const handleOpenEditModal = (card) => {
//     setSelectedCard({ ...card });
//     setOpenEditModal(true);
//   };

//   // Handle edit modal close
//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setSelectedCard(null);
//     setImageFile(null);
//   };

//   // Handle QR modal open
//   const handleOpenQRModal = (cardNumber) => {
//     setQRCardNumber(cardNumber);
//     setOpenQRModal(true);
//   };

//   // Handle QR modal close
//   const handleCloseQRModal = () => {
//     setOpenQRModal(false);
//     setQRCardNumber("");
//   };

//   // Handle form field changes
//   const handleChange = (event) => {
//     setSelectedCard({
//       ...selectedCard,
//       [event.target.name]: event.target.value,
//     });
//   };

//   // Handle image file selection
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setImageFile(file);
//   };

//   // Handle saving changes to the card
//   const handleSave = async () => {
//     if (!selectedCard) return;

//     // Upload the image to Cloudinary if a new image is selected
//     if (imageFile) {
//       const imageUrl = await uploadImageToCloudinary(imageFile);
//       if (imageUrl) {
//         selectedCard.image = imageUrl;
//       }
//     }

//     const { cardNumber, ...cardData } = selectedCard;
//     try {
//       await updateCard({ cardNumber, cardData }).unwrap();
//       handleCloseEditModal();
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   // Handle downloading QR code
//   const handleDownloadQR = () => {
//     const svg = document.getElementById("qr-code-svg");
//     if (svg) {
//       const svgData = new XMLSerializer().serializeToString(svg);
//       const blob = new Blob([svgData], { type: "image/svg+xml" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `QR_${qrCardNumber}.svg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   // Handle deleting a card
//   const handleDeleteCard = async (cardNumber) => {
//     try {
//       await deleteCard(cardNumber).unwrap();
//       alert("Card deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete card:", error);
//       alert("Failed to delete card.");
//     }
//   };

//   return (
//     <div style={{ padding: "24px" }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
//         Cards Management
//       </Typography>

//       <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
//         <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "primary.main" }}>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Card No.</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Set</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Release Year</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Language</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Label</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Certification No.</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Address</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Terms Agreed</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rarity</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Grade</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sub Grade</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tracking Status</TableCell>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tracking ID</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>User ID</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>QR View</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Download QR</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cards
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((card) => (
//                   <TableRow key={card.id} hover>
//                     {!isMobile && <TableCell>{card.cardNumber}</TableCell>}
//                     <TableCell>{card.name}</TableCell>
//                     {!isMobile && <TableCell>{card.set}</TableCell>}
//                     {!isMobile && <TableCell>{card.releaseYear}</TableCell>}
//                     {!isMobile && <TableCell>{card.language}</TableCell>}
//                     {!isMobile && <TableCell>{card.label}</TableCell>}
//                     {!isMobile && <TableCell>{card.certificationNumber}</TableCell>}
//                     {!isMobile && <TableCell>{card.address}</TableCell>}
//                     <TableCell>
//                       <Chip
//                         label={card.termsAgreed ? "Agreed" : "Not Agreed"}
//                         color={card.termsAgreed ? "success" : "error"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={card.rarity}
//                         color={
//                           card.rarity === "rare"
//                             ? "secondary"
//                             : card.rarity === "common"
//                             ? "primary"
//                             : "default"
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Avatar src={card.image} alt="Card" sx={{ width: 50, height: 50 }} />
//                     </TableCell>
//                     {!isMobile && <TableCell>{card.grade}</TableCell>}
//                     {!isMobile && <TableCell>{Object.values(card.subgrade).join(", ")}</TableCell>}
//                     <TableCell>
//                       <Chip
//                         label={card.trackingStatus}
//                         color={
//                           card.trackingStatus === "delivered"
//                             ? "success"
//                             : card.trackingStatus === "shipped"
//                             ? "info"
//                             : "warning"
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                     {!isMobile && <TableCell><Rating value={card.rating} readOnly /></TableCell>}
//                     {!isMobile && <TableCell>{card.trackingID}</TableCell>}
//                     {!isMobile && <TableCell>{card.userId}</TableCell>}
//                     <TableCell>
//                       <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
//                         <VisibilityIcon color="primary" />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
//                         <GetAppIcon color="primary" />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton size="small" onClick={() => handleOpenEditModal(card)}>
//                         <EditIcon color="info" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         color="error"
//                         onClick={() => {
//                           setCardToDelete(card.cardNumber);
//                           setOpenDeleteModal(true);
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={cards.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
//         />
//       </Paper>

//       {/* QR Code Modal */}
//       <Dialog open={openQRModal} onClose={handleCloseQRModal}>
//         <DialogTitle>QR Code for Card Number: {qrCardNumber}</DialogTitle>
//         <DialogContent>
//           <QRCode id="qr-code-svg" value={qrCardNumber} size={256} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDownloadQR} color="primary">
//             Download QR
//           </Button>
//           <Button onClick={handleCloseQRModal} color="secondary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Modal */}
//       <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Card</DialogTitle>
//         <DialogContent>
//           {/* Existing Fields */}
//           {[
//             { name: "cardNumber", type: "text" },
//             { name: "name", type: "text" },
//             { name: "set", type: "text" },
//             { name: "releaseYear", type: "number" },
//             { name: "language", type: "text" },
//             { name: "label", type: "text" },
//             { name: "certificationNumber", type: "text" },
//             { name: "address", type: "text" },
//             {
//               name: "termsAgreed",
//               type: "menu",
//               options: [
//                 { value: true, label: "True" },
//                 { value: false, label: "False" },
//               ],
//             },
//             {
//               name: "rarity",
//               type: "menu",
//               options: [
//                 { value: "rare", label: "Rare" },
//                 { value: "common", label: "Common" },
//                 { value: "normal", label: "Normal" },
//               ],
//             },
//             { name: "image", type: "text" },
//             { name: "grade", type: "numberRange", range: { min: 1, max: 10 } },
//             {
//               name: "trackingStatus",
//               type: "menu",
//               options: [
//                 { value: "confirmed", label: "Order Confirmed" },
//                 { value: "shipped", label: "Shipped" },
//                 { value: "checking", label: "Checking" },
//                 { value: "delivered", label: "Delivered" },
//               ],
//             },
//             { name: "rating", type: "stars", range: { min: 1, max: 5 } },
//             { name: "trackingID", type: "text" },
//             { name: "userId", type: "number" },
//           ].map(({ name, type, options, range }) => {
//             const label = name.replace(/([A-Z])/g, " $1").trim();

//             if (type === "menu") {
//               return (
//                 <TextField
//                   key={name}
//                   margin="normal"
//                   label={label}
//                   name={name}
//                   fullWidth
//                   select
//                   value={selectedCard?.[name] || ""}
//                   onChange={handleChange}
//                 >
//                   {options.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               );
//             }

//             if (type === "stars") {
//               return (
//                 <div key={name} style={{ margin: "1rem 0" }}>
//                   <Typography>{label}</Typography>
//                   <Rating
//                     name={name}
//                     value={selectedCard?.[name] || 0}
//                     max={range.max}
//                     onChange={(e, newValue) =>
//                       handleChange({ target: { name, value: newValue } })
//                     }
//                   />
//                 </div>
//               );
//             }

//             if (type === "numberRange") {
//               return (
//                 <TextField
//                   key={name}
//                   margin="normal"
//                   label={label}
//                   name={name}
//                   fullWidth
//                   type="number"
//                   inputProps={{
//                     min: range.min,
//                     max: range.max,
//                   }}
//                   value={selectedCard?.[name] || ""}
//                   onChange={handleChange}
//                 />
//               );
//             }

//             return (
//               <TextField
//                 key={name}
//                 margin="normal"
//                 label={label}
//                 name={name}
//                 fullWidth
//                 type={type}
//                 value={selectedCard?.[name] || ""}
//                 onChange={handleChange}
//               />
//             );
//           })}

//           {/* Image Upload Field */}
//           <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//             Upload Image
//           </Typography>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ marginBottom: "1rem" }}
//           />

//           {/* Subgrade Fields */}
//           <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//             Subgrade
//           </Typography>
//           {["surface", "edging", "centering", "corners"].map((field) => (
//             <TextField
//               key={field}
//               margin="normal"
//               label={field.charAt(0).toUpperCase() + field.slice(1)}
//               name={`subgrade.${field}`}
//               fullWidth
//               type="number"
//               value={selectedCard?.subgrade?.[field] || ""}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "subgrade",
//                     value: {
//                       ...selectedCard.subgrade,
//                       [field]: parseFloat(e.target.value),
//                     },
//                   },
//                 })
//               }
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this card?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteModal(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={() => {
//               handleDeleteCard(cardToDelete);
//               setOpenDeleteModal(false);
//             }}
//             color="error"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Cards;




//==================================================
//2 feb 2025
//================================================

// import { useState } from "react";
// import { QRCode } from "react-qr-code";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Typography,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
//   Rating,
//   Avatar,
//   Chip,
//   CircularProgress,
//   Alert,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   GetApp as GetAppIcon,
// } from "@mui/icons-material";
// import { useGetAllCardsQuery, useUpdateCardMutation, useDeleteCardMutation , useAddCardMutation } from "../api/apiSlice";

// function Cards() {
//   const { data: cards, error, isLoading } = useGetAllCardsQuery();
//   const [updateCard] = useUpdateCardMutation();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [imageFile, setImageFile] = useState(null); // State to store the selected image file
//   const [openQRModal, setOpenQRModal] = useState(false);
//   const [qrCardNumber, setQRCardNumber] = useState("");
//   const [deleteCard] = useDeleteCardMutation();
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);

//   // Check for mobile view
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Handle loading and error states
//   if (isLoading) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert severity="error" sx={{ margin: "24px" }}>
//         Error fetching cards: {error.message}
//       </Alert>
//     );
//   }

//   // Handle empty data
//   if (!cards || cards.length === 0) {
//     return (
//       <Alert severity="info" sx={{ margin: "24px" }}>
//         No cards found.
//       </Alert>
//     );
//   }

//   // Handle pagination change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handle edit modal open
//   const handleOpenEditModal = (card) => {
//     setSelectedCard({ ...card });
//     setOpenEditModal(true);
//   };

//   // Handle edit modal close
//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setSelectedCard(null);
//     setImageFile(null); // Reset the image file state
//   };

//   // Handle QR modal open
//   const handleOpenQRModal = (cardNumber) => {
//     setQRCardNumber(cardNumber);
//     setOpenQRModal(true);
//   };

//   // Handle QR modal close
//   const handleCloseQRModal = () => {
//     setOpenQRModal(false);
//     setQRCardNumber("");
//   };

//   // Handle form field changes
//   const handleChange = (event) => {
//     setSelectedCard({
//       ...selectedCard,
//       [event.target.name]: event.target.value,
//     });
//   };

//   // Handle image file selection
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setImageFile(file); // Store the selected file
//   };

//   // Upload image to Cloudinary
//   const uploadImageToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dnfc9g33c/image/upload", // Replace with your Cloudinary cloud name
//         {
//           method: "POST",
//           body: formData,
//         }
//       );
//       const data = await response.json();
//       return data.secure_url; // Return the Cloudinary image URL
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       return null;
//     }
//   };

//   // Handle saving changes to the card
//   const handleSave = async () => {
//     if (!selectedCard) return;

//     // Upload the image to Cloudinary if a new image is selected
//     if (imageFile) {
//       const imageUrl = await uploadImageToCloudinary(imageFile);
//       if (imageUrl) {
//         selectedCard.image = imageUrl; // Update the image URL in the selectedCard state
//       }
//     }

//     const { cardNumber, ...cardData } = selectedCard;
//     try {
//       await updateCard({ cardNumber, cardData }).unwrap();
//       handleCloseEditModal(); // Close the modal on successful update
//     } catch (error) {
//       console.error("Error updating card:", error);
//     }
//   };

//   // Handle downloading QR code
//   const handleDownloadQR = () => {
//     const svg = document.getElementById("qr-code-svg");
//     if (svg) {
//       const svgData = new XMLSerializer().serializeToString(svg);
//       const blob = new Blob([svgData], { type: "image/svg+xml" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `QR_${qrCardNumber}.svg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   // Handle deleting a card
//   const handleDeleteCard = async (cardNumber) => {
//     try {
//       await deleteCard(cardNumber).unwrap();
//       alert("Card deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete card:", error);
//       alert("Failed to delete card.");
//     }
//   };

//   return (
//     <div style={{ padding: "24px" }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
//         Cards Management
//       </Typography>

//       <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
//         <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "primary.main" }}>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Card No.</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Set</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Release Year</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Language</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Label</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Certification No.</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Address</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Terms Agreed</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rarity</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Grade</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sub Grade</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tracking Status</TableCell>
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tracking ID</TableCell>}
//                 {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>User ID</TableCell>}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>QR View</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Download QR</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cards
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((card) => (
//                   <TableRow key={card.id} hover>
//                     {!isMobile && <TableCell>{card.cardNumber}</TableCell>}
//                     <TableCell>{card.name}</TableCell>
//                     {!isMobile && <TableCell>{card.set}</TableCell>}
//                     {!isMobile && <TableCell>{card.releaseYear}</TableCell>}
//                     {!isMobile && <TableCell>{card.language}</TableCell>}
//                     {!isMobile && <TableCell>{card.label}</TableCell>}
//                     {!isMobile && <TableCell>{card.certificationNumber}</TableCell>}
//                     {!isMobile && <TableCell>{card.address}</TableCell>}
//                     <TableCell>
//                       <Chip
//                         label={card.termsAgreed ? "Agreed" : "Not Agreed"}
//                         color={card.termsAgreed ? "success" : "error"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={card.rarity}
//                         color={
//                           card.rarity === "rare"
//                             ? "secondary"
//                             : card.rarity === "common"
//                             ? "primary"
//                             : "default"
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Avatar src={card.image} alt="Card" sx={{ width: 50, height: 50 }} />
//                     </TableCell>
//                     {!isMobile && <TableCell>{card.grade}</TableCell>}
//                     {!isMobile && <TableCell>{Object.values(card.subgrade).join(", ")}</TableCell>}
//                     <TableCell>
//                       <Chip
//                         label={card.trackingStatus}
//                         color={
//                           card.trackingStatus === "delivered"
//                             ? "success"
//                             : card.trackingStatus === "shipped"
//                             ? "info"
//                             : "warning"
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                     {!isMobile && <TableCell><Rating value={card.rating} readOnly /></TableCell>}
//                     {!isMobile && <TableCell>{card.trackingID}</TableCell>}
//                     {!isMobile && <TableCell>{card.userId}</TableCell>}
//                     <TableCell>
//                       <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
//                         <VisibilityIcon color="primary" />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
//                         <GetAppIcon color="primary" />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton size="small" onClick={() => handleOpenEditModal(card)}>
//                         <EditIcon color="info" />
//                       </IconButton>
//                       <IconButton
//                         size="small"
//                         color="error"
//                         onClick={() => {
//                           setCardToDelete(card.cardNumber);
//                           setOpenDeleteModal(true);
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={cards.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
//         />
//       </Paper>

//       {/* QR Code Modal */}
//       <Dialog open={openQRModal} onClose={handleCloseQRModal}>
//         <DialogTitle>QR Code for Card Number: {qrCardNumber}</DialogTitle>
//         <DialogContent>
//           <QRCode id="qr-code-svg" value={qrCardNumber} size={256} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDownloadQR} color="primary">
//             Download QR
//           </Button>
//           <Button onClick={handleCloseQRModal} color="secondary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Modal */}
//       <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Card</DialogTitle>
//         <DialogContent>
//           {/* Existing Fields */}
//           {[
//             { name: "cardNumber", type: "text" },
//             { name: "name", type: "text" },
//             { name: "set", type: "text" },
//             { name: "releaseYear", type: "number" },
//             { name: "language", type: "text" },
//             { name: "label", type: "text" },
//             { name: "certificationNumber", type: "text" },
//             { name: "address", type: "text" },
//             {
//               name: "termsAgreed",
//               type: "menu",
//               options: [
//                 { value: true, label: "True" },
//                 { value: false, label: "False" },
//               ],
//             },
//             {
//               name: "rarity",
//               type: "menu",
//               options: [
//                 { value: "rare", label: "Rare" },
//                 { value: "common", label: "Common" },
//                 { value: "normal", label: "Normal" },
//               ],
//             },
//             { name: "image", type: "text" },
//             { name: "grade", type: "numberRange", range: { min: 1, max: 10 } },
//             {
//               name: "trackingStatus",
//               type: "menu",
//               options: [
//                 { value: "confirmed", label: "Order Confirmed" },
//                 { value: "shipped", label: "Shipped" },
//                 { value: "checking", label: "Checking" },
//                 { value: "delivered", label: "Delivered" },
//               ],
//             },
//             { name: "rating", type: "stars", range: { min: 1, max: 5 } },
//             { name: "trackingID", type: "text" },
//             { name: "userId", type: "number" },
//           ].map(({ name, type, options, range }) => {
//             const label = name.replace(/([A-Z])/g, " $1").trim();

//             if (type === "menu") {
//               return (
//                 <TextField
//                   key={name}
//                   margin="normal"
//                   label={label}
//                   name={name}
//                   fullWidth
//                   select
//                   value={selectedCard?.[name] || ""}
//                   onChange={handleChange}
//                 >
//                   {options.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               );
//             }

//             if (type === "stars") {
//               return (
//                 <div key={name} style={{ margin: "1rem 0" }}>
//                   <Typography>{label}</Typography>
//                   <Rating
//                     name={name}
//                     value={selectedCard?.[name] || 0}
//                     max={range.max}
//                     onChange={(e, newValue) =>
//                       handleChange({ target: { name, value: newValue } })
//                     }
//                   />
//                 </div>
//               );
//             }

//             if (type === "numberRange") {
//               return (
//                 <TextField
//                   key={name}
//                   margin="normal"
//                   label={label}
//                   name={name}
//                   fullWidth
//                   type="number"
//                   inputProps={{
//                     min: range.min,
//                     max: range.max,
//                   }}
//                   value={selectedCard?.[name] || ""}
//                   onChange={handleChange}
//                 />
//               );
//             }

//             return (
//               <TextField
//                 key={name}
//                 margin="normal"
//                 label={label}
//                 name={name}
//                 fullWidth
//                 type={type}
//                 value={selectedCard?.[name] || ""}
//                 onChange={handleChange}
//               />
//             );
//           })}

//           {/* Image Upload Field */}
//           <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//             Upload Image
//           </Typography>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ marginBottom: "1rem" }}
//           />

//           {/* Subgrade Fields */}
//           <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
//             Subgrade
//           </Typography>
//           {["surface", "edging", "centering", "corners"].map((field) => (
//             <TextField
//               key={field}
//               margin="normal"
//               label={field.charAt(0).toUpperCase() + field.slice(1)}
//               name={`subgrade.${field}`}
//               fullWidth
//               type="number"
//               value={selectedCard?.subgrade?.[field] || ""}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "subgrade",
//                     value: {
//                       ...selectedCard.subgrade,
//                       [field]: parseFloat(e.target.value),
//                     },
//                   },
//                 })
//               }
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Modal */}
//       <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this card?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteModal(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={() => {
//               handleDeleteCard(cardToDelete);
//               setOpenDeleteModal(false);
//             }}
//             color="error"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Cards;

//]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]



import { useState } from "react";
import { QRCode } from "react-qr-code";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Rating,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useGetAllCardsQuery, useUpdateCardMutation, useDeleteCardMutation, useAddCardMutation } from "../api/apiSlice";
import {  FormControl, InputLabel, Select } from "@mui/material";

function Cards() {
  const { data: cards, error, isLoading } = useGetAllCardsQuery();
  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [addCard] = useAddCardMutation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newCard, setNewCard] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [qrCardNumber, setQRCardNumber] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle QR Modal
  const handleCloseQRModal = () => {
    setOpenQRModal(false);
    setQRCardNumber("");
  };

  const handleOpenQRModal = (cardNumber) => {
    setQRCardNumber(cardNumber);
    setOpenQRModal(true);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400, // Adjust width
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: "24px" }}>
        Error fetching cards: {error.message}
      </Alert>
    );
  }

  // if (!cards || cards.length === 0) {
  //   return (
  //     <Alert severity="info" sx={{ margin: "24px" }}>
  //       No cards found.
  //     </Alert>
  //   );
  // }

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle edit modal open
  const handleOpenEditModal = (card) => {
    setSelectedCard({ ...card });
    setOpenEditModal(true);
  };

  // Handle edit modal close
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCard(null);
    setImageFile(null);
  };

  // Handle add modal open
  const handleOpenAddModal = () => {
    setNewCard({});
    setOpenAddModal(true);
  };

  // Handle add modal close
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewCard({});
    setImageFile(null);
  };

  // Handle form field changes for Edit Modal
  const handleChange = (event) => {
    setSelectedCard({
      ...selectedCard,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form field changes for Add Modal
  const handleAddChange = (event) => {
    setNewCard({
      ...newCard,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image file selection for Edit Modal
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  // Handle image file selection for Add Modal
  const handleAddImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  // Handle saving changes to the card
  const handleSave = async () => {
    if (!selectedCard) return;

    if (imageFile) {
      const imageUrl = await uploadImageToCloudinary(imageFile);
      if (imageUrl) {
        selectedCard.image = imageUrl;
      }
    }

    try {
      const { cardNumber, ...cardData } = selectedCard;
      await updateCard({ cardNumber, cardData }).unwrap();
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  // Handle saving new card
  const handleAddCard = async () => {
    if (!newCard) return;

    if (imageFile) {
      const imageUrl = await uploadImageToCloudinary(imageFile);
      if (imageUrl) {
        newCard.image = imageUrl;
      }
    }

    try {
      await addCard(newCard).unwrap();
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  // Handle downloading QR code
  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR_${qrCardNumber}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Handle deleting a card
  const handleDeleteCard = async (cardNumber) => {
    try {
      await deleteCard(cardNumber).unwrap();
      alert("Card deleted successfully!");
    } catch (error) {
      console.error("Failed to delete card:", error);
      alert("Failed to delete card.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>      
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
        Cards Management
      </Typography>

      {/* Add Card Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddModal}
        sx={{ marginBottom: "16px" }}
      >
        Add Card
      </Button>



      <Paper elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
        <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Card No.</TableCell>}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Set</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Release Year</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Language</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Label</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Certification No.</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Address</TableCell>}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Terms Agreed</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Holographic</TableCell>
                
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rarity</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Grade</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sub Grade</TableCell>}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tracking Status</TableCell>
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tracking ID</TableCell>}
                {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>User ID</TableCell>}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>QR View</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Download QR</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((card) => (
                  <TableRow key={card.id} hover>
                    {!isMobile && <TableCell>{card.cardNumber}</TableCell>}
                    <TableCell>{card.name}</TableCell>
                    {!isMobile && <TableCell>{card.set}</TableCell>}
                    {!isMobile && <TableCell>{card.releaseYear}</TableCell>}
                    {!isMobile && <TableCell>{card.language}</TableCell>}
                    {!isMobile && <TableCell>{card.label}</TableCell>}
                    {!isMobile && <TableCell>{card.certificationNumber}</TableCell>}
                    {!isMobile && <TableCell>{card.address}</TableCell>}
                    <TableCell>
                      <Chip
                        label={card.termsAgreed ? "Agreed" : "Not Agreed"}
                        color={card.termsAgreed ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={card.holographic ? "Holographic" : "Recerse Holographic"}
                        color={card.holographic ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>                    
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <Avatar src={card.image} alt="Card" sx={{ width: 50, height: 50 }} />
                    </TableCell>
                    {!isMobile && <TableCell>{card.grade}</TableCell>}
                    {!isMobile && <TableCell>{Object.values(card.subgrade).join(", ")}</TableCell>}
                    <TableCell>
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
                    </TableCell>
                    {!isMobile && <TableCell><Rating value={card.rating} readOnly /></TableCell>}
                    {!isMobile && <TableCell>{card.trackingID}</TableCell>}
                    {!isMobile && <TableCell>{card.userId}</TableCell>}
                    <TableCell>
                      <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenQRModal(card.cardNumber)}>
                        <GetAppIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleOpenEditModal(card)}>
                        <EditIcon color="info" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setCardToDelete(card.cardNumber);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cards.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
        />
      </Paper>

      {/* QR Code Modal */}
      <Dialog open={openQRModal} onClose={handleCloseQRModal}>
        <DialogTitle>QR Code for Card Number: {qrCardNumber}</DialogTitle>
        <DialogContent>
          <QRCode id="qr-code-svg" value={qrCardNumber} size={256} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownloadQR} color="primary">
            Download QR
          </Button>
          <Button onClick={handleCloseQRModal} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent>
          {/* Existing Fields */}
          {[
            { name: "cardNumber", type: "text" },
            { name: "name", type: "text" },
            { name: "set", type: "text" },
            { name: "releaseYear", type: "number" },
            { name: "language", type: "text" },
            { name: "label", type: "text" },
            { name: "certificationNumber", type: "text" },
            { name: "address", type: "text" },  
            {
              name: "termsAgreed",                         
              type: "menu",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" },
              ],
            },
            {
              name: "holographic",                        
              type: "menu",
              options: [
                { value: true, label: "Holographic" },
                { value: false, label: "Recerse Holographic" },
              ],
            },
            {
              name: "rarity",
              type: "menu",
              options: [
                { value: "rare", label: "Rare" },
                { value: "common", label: "Common" },
                { value: "normal", label: "Normal" },
              ],
            },
            { name: "image", type: "text" },
            { name: "grade", type: "numberRange", range: { min: 1, max: 10 } },
            {
              name: "trackingStatus",
              type: "menu",
              options: [
                { value: "confirmed", label: "Order Confirmed" },
                { value: "shipped", label: "Shipped" },
                { value: "checking", label: "Checking" },
                { value: "delivered", label: "Delivered" },
              ],
            },
            { name: "rating", type: "stars", range: { min: 1, max: 5 } },
            { name: "trackingID", type: "text" },
            { name: "userId", type: "number" },
          ].map(({ name, type, options, range }) => {
            const label = name.replace(/([A-Z])/g, " $1").trim();

            if (type === "menu") {
              return (
                <TextField
                  key={name}
                  margin="normal"
                  label={label}
                  name={name}
                  fullWidth
                  select
                  value={selectedCard?.[name] || ""}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            if (type === "stars") {
              return (
                <div key={name} style={{ margin: "1rem 0" }}>
                  <Typography>{label}</Typography>
                  <Rating
                    name={name}
                    value={selectedCard?.[name] || 0}
                    max={range.max}
                    onChange={(e, newValue) =>
                      handleChange({ target: { name, value: newValue } })
                    }
                  />
                </div>
              );
            }

            if (type === "numberRange") {
              return (
                <TextField
                  key={name}
                  margin="normal"
                  label={label}
                  name={name}
                  fullWidth
                  type="number"
                  inputProps={{
                    min: range.min,
                    max: range.max,
                  }}
                  value={selectedCard?.[name] || ""}
                  onChange={handleChange}
                />
              );
            }

            return (
              <TextField
                key={name}
                margin="normal"
                label={label}
                name={name}
                fullWidth
                type={type}
                value={selectedCard?.[name] || ""}
                onChange={handleChange}
              />
            );
          })}

          {/* Image Upload Field */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
            Upload Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "1rem" }}
          />

          {/* Subgrade Fields */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
            Subgrade
          </Typography>
          {["surface", "edging", "centering", "corners"].map((field) => (
            <TextField
              key={field}
              margin="normal"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={`subgrade.${field}`}
              fullWidth
              type="number"
              value={selectedCard?.subgrade?.[field] || ""}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "subgrade",
                    value: {
                      ...selectedCard.subgrade,
                      [field]: parseFloat(e.target.value),
                    },
                  },
                })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Card Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Card</DialogTitle>
        <DialogContent>
          {/* Fields for adding a new card */}
          {[
            { name: "cardNumber", type: "text" },
            { name: "name", type: "text" },
            { name: "set", type: "text" },
            { name: "releaseYear", type: "number" },
            { name: "language", type: "text" },
            { name: "label", type: "text" },
            { name: "certificationNumber", type: "text" },
            { name: "address", type: "text" },
            {
              name: "termsAgreed",                         
              type: "menu",
              options: [
                { value: true, label: "True" },
                { value: false, label: "False" },
              ],
            },
            {
              name: "holographic",                        
              type: "menu",
              options: [
                { value: true, label: "Holographic" },
                { value: false, label: "Recerse Holographic" },
              ],
            },
            {
              name: "rarity",
              type: "menu",
              options: [
                { value: "rare", label: "Rare" },
                { value: "common", label: "Common" },
                { value: "normal", label: "Normal" },
              ],
            },
            { name: "image", type: "text" },
            { name: "grade", type: "numberRange", range: { min: 1, max: 10 } },
            {
              name: "trackingStatus",
              type: "menu",
              options: [
                { value: "confirmed", label: "Order Confirmed" },
                { value: "shipped", label: "Shipped" },
                { value: "checking", label: "Checking" },
                { value: "delivered", label: "Delivered" },
              ],
            },
            { name: "rating", type: "stars", range: { min: 1, max: 5 } },
            { name: "trackingID", type: "text" },
            { name: "userId", type: "number" },
          ].map(({ name, type, options, range }) => {
            const label = name.replace(/([A-Z])/g, " $1").trim();

            if (type === "menu") {
              return (
                <TextField
                  key={name}
                  margin="normal"
                  label={label}
                  name={name}
                  fullWidth
                  select
                  value={newCard?.[name] || ""}
                  onChange={handleAddChange}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            if (type === "stars") {
              return (
                <div key={name} style={{ margin: "1rem 0" }}>
                  <Typography>{label}</Typography>
                  <Rating
                    name={name}
                    value={newCard?.[name] || 0}
                    max={range.max}
                    onChange={(e, newValue) =>
                      handleAddChange({ target: { name, value: newValue } })
                    }
                  />
                </div>
              );
            }

            if (type === "numberRange") {
              return (
                <TextField
                  key={name}
                  margin="normal"
                  label={label}
                  name={name}
                  fullWidth
                  type="number"
                  inputProps={{
                    min: range.min,
                    max: range.max,
                  }}
                  value={newCard?.[name] || ""}
                  onChange={handleAddChange}
                />
              );
            }

            return (
              <TextField
                key={name}
                margin="normal"
                label={label}
                name={name}
                fullWidth
                type={type}
                value={newCard?.[name] || ""}
                onChange={handleAddChange}
              />
            );
          })}

          {/* Image Upload Field */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
            Upload Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleAddImageChange}
            style={{ marginBottom: "1rem" }}
          />

          {/* Subgrade Fields */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem" }}>
            Subgrade
          </Typography>
          {["surface", "edging", "centering", "corners"].map((field) => (
            <TextField
              key={field}
              margin="normal"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={`subgrade.${field}`}
              fullWidth
              type="number"
              value={newCard?.subgrade?.[field] || ""}
              onChange={(e) =>
                handleAddChange({
                  target: {
                    name: "subgrade",
                    value: {
                      ...newCard.subgrade,
                      [field]: parseFloat(e.target.value),
                    },
                  },
                })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCard} color="primary">
            Add Card
          </Button>
        </DialogActions>
      </Dialog>




      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this card?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteCard(cardToDelete);
              setOpenDeleteModal(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cards;