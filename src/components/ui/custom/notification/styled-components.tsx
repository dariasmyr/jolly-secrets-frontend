import styled from 'styled-components';

export const Header = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 157%; /* 21.98px */
  letter-spacing: 0.1px;
`;

export const Text = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 8px;
`;
