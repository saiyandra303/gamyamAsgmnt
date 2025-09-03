import React from 'react';
import { FormControlLabel, Switch, Box } from '@mui/material';

interface ActiveFilterProps {
  activeOnly: boolean;
  onActiveFilterChange: (activeOnly: boolean) => void;
}

export const ActiveFilter: React.FC<ActiveFilterProps> = ({ 
  activeOnly, 
  onActiveFilterChange 
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={activeOnly}
            onChange={(e) => onActiveFilterChange(e.target.checked)}
            color="primary"
          />
        }
        label="Show active products only"
      />
    </Box>
  );
};
