import { ReactElement, useEffect, useState } from 'react';
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
  showDescription: boolean; // Флаг для отображения описания
}

interface StepperProperties {
  steps: IStepProperties[];
  lastCompletedStep: number;
}

export const Stepper = ({
  steps,
  lastCompletedStep,
}: StepperProperties): ReactElement => {
  const [activeStep, setActiveStep] = useState(lastCompletedStep);

  useEffect(() => {
    setActiveStep(lastCompletedStep);
  }, [lastCompletedStep]);

  return (
    <MuiStepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label} completed={index < activeStep}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            {step.showDescription && (
              <Typography>{step.description}</Typography>
            )}
            <Box sx={{ mb: 2 }} />
          </StepContent>
        </Step>
      ))}
    </MuiStepper>
  );
};
