import { ReactElement, useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper as MuiStepper,
  Typography,
} from '@mui/material';

export interface IStepProperties {
  label: string;
  description: string;
  buttonLabel?: string;
  buttonActive?: boolean;
  isActiveStep?: boolean;
}

export const Stepper = ({
  steps,
}: {
  steps: IStepProperties[];
}): ReactElement => {
  const [stepsState, setStepsState] = useState<{ [step: number]: boolean }>({});

  const handleNext = (): void => {
    const currentActiveIndex = steps.findIndex((step) => step.isActiveStep);
    if (currentActiveIndex < steps.length - 1) {
      steps[currentActiveIndex].isActiveStep = false;
      steps[currentActiveIndex + 1].isActiveStep = true;
    }
    setStepsState((previousStepsState) => ({
      ...previousStepsState,
      [currentActiveIndex]: true,
    }));
  };

  return (
    <MuiStepper
      activeStep={steps.findIndex((step) => step.isActiveStep)}
      orientation="vertical"
    >
      {steps.map((step, index) => (
        <Step key={step.label} completed={stepsState[index]}>
          <StepLabel>{step.label}</StepLabel>
          <StepContent>
            <Typography>{step.description}</Typography>
            <Box sx={{ mb: 2 }}>
              <div>
                {step.buttonActive && (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {step.buttonLabel || 'Continue'}
                  </Button>
                )}
              </div>
            </Box>
          </StepContent>
        </Step>
      ))}
    </MuiStepper>
  );
};
