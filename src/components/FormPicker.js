import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function FormPicker(props) {
    const { title = '', value = '', data = [], onChange, className } = props;

    const handleChange = (event) => {
        onChange(event.target.value)
    };

    return (
        <FormControl variant={"outlined"} className={className}>
            <InputLabel id={'label-id'}>{title}</InputLabel>
            <Select
                id={'select-id'}
                labelId={'label-id'}
                label={title}
                value={value}
                onChange={handleChange}>
                {data.map((item, index) => <MenuItem value={item.id} key={index}>{item.text}</MenuItem>)}
            </Select>
        </FormControl>
    )
}
