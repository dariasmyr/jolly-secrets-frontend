import * as React from 'react';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';

interface BreadStepProperties {
  label: string;
  link: string;
  onClick: (label: string) => void;
}

const BreadStep: React.FC<BreadStepProperties> = ({ label, link, onClick }) => (
  <Link
    underline="hover"
    color="inherit"
    href={link}
    onClick={(): void => onClick(label)}
  >
    {label}
  </Link>
);

interface CollapsedBreadcrumbsProperties {
  steps: BreadStepProperties[];
}

const CollapsedBreadcrumbs: React.FC<CollapsedBreadcrumbsProperties> = ({
  steps,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentLabel, setCurrentLabel] = React.useState('');

  const handleClick = (label: string): void => {
    setCurrentLabel(label);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div role="presentation">
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        {steps.map(({ label, link }, index) => (
          <BreadStep
            key={index}
            label={label}
            link={link}
            onClick={handleClick}
          />
        ))}
      </Breadcrumbs>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Вы перешли в {currentLabel}.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CollapsedBreadcrumbs;
