import { ReactElement } from 'react';
import {
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper as MuiStepper,
  Typography,
} from '@mui/material';

interface IStepProperties {
  label: string;
  description: string;
  showDescription: boolean;
  completed: boolean;
}

interface StepperProperties {
  steps: IStepProperties[];
}

export const Stepper = ({ steps }: StepperProperties): ReactElement => {
  return (
    <MuiStepper orientation="vertical">
      {steps.map((step) => (
        <Step
          key={step.label}
          completed={step.completed}
          active={!step.completed}
        >
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            {step.showDescription && (
              <Typography>{step.description}</Typography>
            )}
            <Box sx={{ mb: 0 }} />
          </StepContent>
        </Step>
      ))}
    </MuiStepper>
  );
};
