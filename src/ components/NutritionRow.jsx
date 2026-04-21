import { Box, Typography, Divider } from '@mui/material';

function NutritionRow({ label, value, unit = 'g' }) {
  if (value === undefined || value === null) return null;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
        <Typography variant="body1" color="text.secondary">{label}</Typography>
        <Typography variant="body1" fontWeight="bold">{value}{unit}</Typography>
      </Box>
      <Divider />
    </>
  );
}

export default NutritionRow;