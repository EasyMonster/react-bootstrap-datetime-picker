import * as React from 'react';
import { Rifm } from 'rifm';
import { Form, Button, } from 'react-bootstrap';
import moment from 'moment';

const parseDigits = string => (string.match(/\d+/g) || []).join('');
// const validChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'P', 'M'];
// const parseDigits = (string) => {
//     return string
//     .split('')
//     .map((char) => {
//         return validChars.includes(char) ? char : '';
//     })
//     .join('');
// }

const formatDate = string => {
    const digits = parseDigits(string);
    const chars = digits.split('');
    const result = chars
        .reduce(
            (r, v, index) => {
                if (index === 2 || index === 4) {
                    return `${r}/${v}`;
                }
                else if (index === 8) {
                    return `${r} ${v}`;
                }
                else if (index === 10) {
                    return `${r}:${v}`;
                }
                // else if (index === 12) {
                //     return `${r} ${v}`;
                // }
                else {
                    return `${r}${v}`;
                }
            }, ''
        )
        .substr(0, 16);
    return result;
};

const addMask = string => {
    const digits = parseDigits(string);
    const months = digits.slice(0, 2).padEnd(2, 'M');
    const days = digits.slice(2, 4).padEnd(2, 'd');
    const years = digits.slice(4, 8).padEnd(4, 'y');
    const hours = digits.slice(8, 10).padEnd(2, 'h');
    const minutes = digits.slice(10, 12).padEnd(2, 'm');
    // const noons = digits.slice(12, 14).padEnd(2, 'n');
    return `${months}/${days}/${years} ${hours}:${minutes}`;
};

const DateFormatter = ({ label = "", now = false, value, onChange, placeholder = "dd/MM/yyyy hh:mm", required = false }) => {

    const renderInput = ({ value, onChange }) => {
        const setTimeNow = () => {
            onChange({ target: { value: moment().format('MM/DD/YYYY HH:mm') } });
        }

        return (
            <>
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                {now && <Button onClick={setTimeNow}>Now</Button>}
            </>
        );
    };

    return (
        <>
            <Rifm
                accept={/[\d]/g}
                mask={true}
                format={formatDate}
                replace={addMask}
                value={value}
                onChange={onChange}
            >
                {renderInput}
            </Rifm>
            <div>{value}</div>

        </>
    );
};


export default DateFormatter;
