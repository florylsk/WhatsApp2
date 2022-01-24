import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

const blue = {
    200: '#80BFFF',
    400: '#3399FF',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledInputElement = styled('input')(
    ({ theme }) => `
  width: 1250px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-color: "#000000";
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[900]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[800]};
  border-radius: 21px;
  padding: 12px 12px;
  transition: all 150ms ease;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[900]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[900]};
  }

  &:focus {
    outline: 2px solid ${theme.palette.mode === 'dark' ? grey[900] : grey[900]};
    outline-offset: 2px;
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
        <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
});

export default function UnstyledInput() {
    return <CustomInput aria-label="Demo input" placeholder="Type a message" />;
}