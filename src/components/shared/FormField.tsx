import React from 'react';
import TextField from '@material-ui/core/TextField';

interface FormFieldProps {
    name: string;
    label: string;
    value: string;
    handleChange: (value: string) => void;
}

export const FormField = ({ name, label, value, handleChange }: FormFieldProps) => (
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        autoFocus
    />
);
