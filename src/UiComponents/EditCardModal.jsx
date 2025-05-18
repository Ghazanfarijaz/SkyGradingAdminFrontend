import { useState, useEffect } from "react";
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
  Alert,
  Avatar,
} from "@mui/material";
import { uploadImageToCloudinary } from "./CloudinaryUpload";

const fieldDefinitions = [
  {
    name: "cardNumber",
    label: "Certification Number",
    type: "text",
    disabled: true,
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
    type: "text",
    // options: [
    //   { value: "rare", label: "Rare" },
    //   { value: "common", label: "Common" },
    //   { value: "normal", label: "Normal" },
    // ],
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

function EditCardModal({ open, card, onClose, onSave }) {
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
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (card) {
      setCardData({
        ...card,
        subgrade: card.subgrade || {
          surface: "",
          edging: "",
          centering: "",
          corners: "",
        },
      });
    }
  }, [card]);

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
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload new images if provided
      const updatedCard = { ...cardData };

      if (imageFile) {
        updatedCard.image = await uploadImageToCloudinary(imageFile);
      }

      if (image2File) {
        updatedCard.image2 = await uploadImageToCloudinary(image2File);
      }

      await onSave({
        cardNumber: updatedCard.cardNumber,
        cardData: updatedCard,
      });

      handleClose();
    } catch (err) {
      setError(err.message || "Failed to update card");
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
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
    setError(null);
    onClose();
  };

  if (!card) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Card ({cardData.cardNumber})</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 2,
            maxHeight: "60vh",
            overflowY: "auto",
            p: 1,
          }}
        >
          {fieldDefinitions.map((field) => (
            <div key={field.name}>
              {field.type === "select" ? (
                <FormControl fullWidth margin="normal">
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={cardData[field.name] ?? ""}
                    onChange={handleChange}
                    label={field.label}
                    disabled={field.disabled}
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
                    precision={0.5}
                  />
                </div>
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={cardData[field.name] ?? ""}
                  onChange={handleChange}
                  disabled={field.disabled}
                  inputProps={{
                    min: field.min,
                    max: field.max,
                    step: field.step,
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
              value={cardData.subgrade?.[field.name] || ""}
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
        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
          <div>
            <Typography variant="subtitle1">Current Front Image</Typography>
            {cardData.image && (
              <Avatar
                src={cardData.image}
                variant="rounded"
                sx={{ width: 100, height: 100, mb: 1 }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div>
            <Typography variant="subtitle1">Current Back Image</Typography>
            {cardData.image2 && (
              <Avatar
                src={cardData.image2}
                variant="rounded"
                sx={{ width: 100, height: 100, mb: 1 }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage2File(e.target.files[0])}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCardModal;
