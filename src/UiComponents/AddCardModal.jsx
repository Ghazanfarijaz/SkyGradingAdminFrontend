import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Rating,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import { uploadImageToCloudinary } from "./CloudinaryUpload";

const fieldDefinitions = [
  {
    name: "cardNumber",
    label: "Certification Number",
    type: "text",
    required: true,
  },
  { name: "name", label: "Name", type: "text", required: true },
  { name: "set", label: "Set", type: "text" },
  { name: "releaseYear", label: "Release Year", type: "number" },
  { name: "language", label: "Language", type: "text" },
  { name: "label", label: "Label", type: "text" },
  { name: "certificationNumber", label: "Card Number", type: "text" },
  { name: "address", label: "Address", type: "text" },
  {
    name: "termsAgreed",
    label: "Terms Agreed",
    type: "select",
    options: [
      { value: true, label: "Agreed" },
      { value: false, label: "Not Agreed" },
    ],
  },
  {
    name: "holographic",
    label: "Holographic",
    type: "select",
    options: [
      { value: true, label: "Holographic" },
      { value: false, label: "Reverse Holographic" },
    ],
  },
  {
    name: "rarity",
    label: "Rarity",
    type: "select",
    options: [
      { value: "rare", label: "Rare" },
      { value: "common", label: "Common" },
      { value: "normal", label: "Normal" },
    ],
  },
  {
    name: "trackingStatus",
    label: "Tracking Status",
    type: "select",
    options: [
      { value: "confirmed", label: "Order Confirmed" },
      { value: "shipped", label: "Shipped" },
      { value: "checking", label: "Checking" },
      { value: "delivered", label: "Delivered" },
    ],
  },
  { name: "grade", label: "Grade", type: "number", min: 1, max: 10 },
  { name: "rating", label: "Rating", type: "rating", max: 5 },
  { name: "trackingID", label: "Tracking ID", type: "text" },
  { name: "userId", label: "User ID", type: "number" },
];

const subgradeFields = [
  { name: "surface", label: "Surface" },
  { name: "edging", label: "Edging" },
  { name: "centering", label: "Centering" },
  { name: "corners", label: "Corners" },
];

function AddCardModal({ open, onClose, onSave }) {
  const [cardData, setCardData] = useState({
    subgrade: {
      surface: "",
      edging: "",
      centering: "",
      corners: "",
    },
  });
  const [imageFile, setImageFile] = useState(null);
  const [image2File, setImage2File] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("subgrade.")) {
      const subgradeField = name.split(".")[1];
      setCardData((prev) => ({
        ...prev,
        subgrade: {
          ...prev.subgrade,
          [subgradeField]: value,
        },
      }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingChange = (name, value) => {
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Upload images if present
      const finalData = { ...cardData };

      if (imageFile) {
        finalData.image = await uploadImageToCloudinary(imageFile);
      }

      if (image2File) {
        finalData.image2 = await uploadImageToCloudinary(image2File);
      }

      await onSave(finalData);
      handleClose();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleClose = () => {
    setCardData({
      subgrade: {
        surface: "",
        edging: "",
        centering: "",
        corners: "",
      },
    });
    setImageFile(null);
    setImage2File(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {fieldDefinitions.map((field) => (
            <div key={field.name}>
              {field.type === "select" ? (
                <FormControl fullWidth margin="normal">
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={cardData[field.name] || ""}
                    onChange={handleChange}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : field.type === "rating" ? (
                <div style={{ marginTop: "16px" }}>
                  <Typography>{field.label}</Typography>
                  <Rating
                    name={field.name}
                    value={Number(cardData[field.name]) || 0}
                    max={field.max}
                    onChange={(_, newValue) =>
                      handleRatingChange(field.name, newValue)
                    }
                  />
                </div>
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={cardData[field.name] || ""}
                  onChange={handleChange}
                  inputProps={{
                    min: field.min,
                    max: field.max,
                  }}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </Box>

        <Typography variant="h6" mt={3} mb={1}>
          Subgrade
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 2,
          }}
        >
          {subgradeFields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              margin="normal"
              label={field.label}
              name={`subgrade.${field.name}`}
              type="number"
              value={cardData.subgrade[field.name] || ""}
              onChange={handleChange}
              inputProps={{
                min: 0,
                max: 10,
                step: 0.5,
              }}
            />
          ))}
        </Box>

        <Typography variant="h6" mt={3} mb={1}>
          Images
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <div>
            <Typography variant="subtitle1">Front Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div>
            <Typography variant="subtitle1">Back Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage2File(e.target.files[0])}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCardModal;
