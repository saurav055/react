import * as React from 'react';
import PropTypes from 'prop-types'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import {Box,InputLabel,MenuItem,FormControl,Select} from '@mui/material'


export default function BasicSelect({ value, onChange, labels, ...rest }) {
  return (
    <Box sx={{ minWidth: 120,marginRight:"5px" }}>
      <FormControl fullWidth>
        <InputLabel id="country_code">Country</InputLabel>
        <Select
          labelId="country_code"
          id="country_code"
          value={value}
          label="Country"
          onChange={event => onChange(event.target.value || undefined)}
        >
          <MenuItem value="">
            {labels['ZZ']}
          </MenuItem>

          {getCountries().map((country) => (
            <MenuItem key={country} value={getCountryCallingCode(country)}>
              {labels[country]} +{getCountryCallingCode(country)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}


