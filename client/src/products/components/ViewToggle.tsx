import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import type { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, newMode) => newMode && onViewModeChange(newMode)}
        aria-label="view mode"
      >
        <ToggleButton value="list" aria-label="list view">
          📋 List
        </ToggleButton>
        <ToggleButton value="card" aria-label="card view">
          🔲 Cards
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
