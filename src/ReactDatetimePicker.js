import React, {useState} from "react";
import { Form, Button, } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import './ReactDatetimePicker.css';
import Datetime from 'react-datetime';
import moment from 'moment';

const ReactDatetimePicker = ({ label = "", now = false, value, onChange, placeholder = "", required = false }) => {
    const [digit, setDigit] = useState(0);

    let inputProps = {
        placeholder: placeholder,
        required: required,
    };

    const renderInput = (props) => {
        const dateFormatPlaceholder = [2, 5, 10, 13, 16];
        const validChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'P', 'M', ];
        const mask = "--/--/---- --:-- --";

        const setTimeNow = () => {
            props.onChange({ target: { value: moment() } });
        }

        // const checkValid = (values) => {
        //     for (let i = 0; i < values.length - 1; i++) {
        //         if (!parseInt(values[i])) {
        //             return i;
        //         }
        //     }
        //     if (values[values.length - 1] !== "AM" && values[values.length - 1] !== "PM") {
        //         return values.length - 1;
        //     }
        //     return -1;
        // }

        // const findStartIndex = (index, values) => {
        //     if (index === 0) {
        //         return 0;
        //     }
        //     var startIndex = 0;
        //     for (var i = 0; i < index; i++) {
        //         startIndex += values[i] + 1;
        //     }
        //     return startIndex;
        // }

        // const toValue = (value) => {
        //     console.log(value);
        //     if (value === "") {
        //         return value;
        //     }
        //     var dateFormatTemplate = "__/__/____ __:__ __";
        //     var newValue = "";
        //     for (var i = 0; i < value.length; i++) {
        //         if (!dateFormatPlaceholder.includes(i) && !parseInt(value.charAt(i))) {
        //             newValue += "_";
        //         }
        //         else {
        //             newValue += value.charAt(i);
        //         }
        //     }
        //     const result = newValue + dateFormatTemplate.substr(newValue.length);
        //     console.log(result);
        //     return result;

        // }

        // const toValue = (value) => {
        //     const values = value.split(/[\s:/]+/);
        //     // // var month = values[0];
        //     // // var day = values[1];
        //     // // var year = values[2];
        //     // // var hour = values[3];
        //     // // var minute = values[4];
        //     // // var noon = values[5];
        //     if (value === "") {
        //         return "MM/dd/yyyy --:-- --";
        //     }
        //     let invalidIndex = checkValid(values);
        //     if (invalidIndex === -1) {
        //         return value;
        //     }
        //     var invalidStartIndex = findStartIndex(invalidIndex, values);
        //     var invalidEndIndex = invalidStartIndex + values[invalidIndex].length;

        //     return value;
        // }

        const toValue = (value) => {
            const result = maskDateFormatter(value);
            // const result = maskDateFormatter(value.substr(0, digit));
            console.log("result:" + result);
            // setDigit(result.length);
            // console.log("digit:" + digit);
            const resultSuffix = mask.substr(result.length);
            console.log("resultSuffix:" + resultSuffix);
            return result + resultSuffix;
            // return result;
        }

        const maskDateFormatter = (value) => {
            const result = value
                .toString()
                .split('')
                .map((char, i) => {
                    if (i > mask.length - 1) {
                        return '';
                    }
                    const maskChar = mask[i];
                    const nextMaskChar = mask[i + 1];

                    const acceptedChar = validChar.includes(char) ? char : '';
                    const formattedChar = !dateFormatPlaceholder.includes(i) ? acceptedChar : maskChar + acceptedChar;

                    if (i === value.length - 1 && nextMaskChar && dateFormatPlaceholder.includes(i + 1)) {
                        // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
                        return formattedChar ? formattedChar + nextMaskChar : '';
                    }
                    return formattedChar;
                })
                .join('');
            return result;
        }

        // const onSelect = (e) => {
        //     const values = e.target.value.split(/[\s:/]+/);
        //     var month = values[0];
        //     var day = values[1];
        //     var year = values[2];
        //     var hour = values[3];
        //     var minute = values[4];
        //     var noon = values[5];

        //     if (month === "MM") {
        //         e.target.setSelectionRange(0, 2);
        //     }
        //     else if (day === "dd") {
        //         e.target.setSelectionRange(3, 5);
        //     }
        //     else if (year === "yyyy") {
        //         e.target.setSelectionRange(6, 10);
        //     }
        //     else if (hour === "hh") {
        //         e.target.setSelectionRange(11, 13);
        //     }
        //     else if (minute === "mm") {
        //         e.target.setSelectionRange(14, 16);
        //     }
        //     else if (noon === "??") {
        //         e.target.setSelectionRange(17, 19);
        //     }

        // }

        return (
            <div className="datetimePickerWrapper">
                {/* <Form.Control {...props} value={toValue(props.value)} onFocus={(e) => onSelect(e)} /> */}
                <Form.Control {...props} value={toValue(props.value)} />
                {now && <Button onClick={setTimeNow}>Now</Button>}
            </div>
        );
    }

    return <Datetime className="datetimePicker" inputProps={inputProps} renderInput={now ? renderInput : null} value={value} onChange={onChange} />;

};

export default ReactDatetimePicker;