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
}

interface StepperProperties {
  steps: IStepProperties[];
  initialStep: number;
}

export const Stepper = ({
  steps,
  initialStep,
}: StepperProperties): ReactElement => {
  const [activeStep, setActiveStep] = useState(initialStep);

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  return (
    <MuiStepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label} completed={index < activeStep}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            <Typography>{step.description}</Typography>
            <Box sx={{ mb: 2 }} />
          </StepContent>
        </Step>
      ))}
    </MuiStepper>
  );
};
