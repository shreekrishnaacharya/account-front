import { useState } from 'react';

import NepaliDate from '../common/nepalidate1'

interface NepaliDateConverter {
    defaultDate: string,
    type: "np" | "en"
}

function toDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number.
    const day = date.getDate();
    return `${year}-${(month.toString()).padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function toDate(date: string) {
    const [year, month, day] = date.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function useNepaliDateConverter({ defaultDate = toDateString(new Date()), type = "en" }: NepaliDateConverter) {
    const [error, setError] = useState("");
    let npdf = ""
    let endif = ""
    try {
        if (type === "en") {
            npdf = convertEnglishToNepali(toDate(defaultDate));
            endif = defaultDate;
        } else {
            endif = convertNepaliToEnglish(defaultDate)
            npdf = defaultDate;
        }
    } catch (e) {
        if (type === "en") {
            endif = defaultDate;
            npdf = "";
        } else {
            npdf = defaultDate;
            endif = "";
        }
        // setError("Invalid date")
    }
    console.log(npdf, endif, "initial")
    const [nepaliDate, setNepaliDate] = useState(npdf);
    const [englishDate, setEnglishDate] = useState(endif);

    function convertNepaliToEnglish(nepaliDate: string) {
        const [y, m, d] = nepaliDate.split("-");
        const npdate = new NepaliDate(y, parseInt(m) - 1, d);
        const { year, month, date } = npdate.getAD()
        return `${year}-${month}-${date}`;
    }

    function convertEnglishToNepali(englishDate: any) {
        const nepaliDate = new NepaliDate(new Date(englishDate));
        const { year, month, date } = nepaliDate.getBS()
        return `${year}-${(month.toString()).padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    }

    function handleNepaliDateChange(e: any) {
        try {
            setNepaliDate(e);
            setEnglishDate(convertNepaliToEnglish((e).toString()));
            console.log(e, "nepali")
        } catch (err) {
            setNepaliDate(e);
            setEnglishDate("")
            setError("Invalid date")
        }
    }

    function handleEnglishDateChange(e: any) {
        try {
            console.log(e, "english")
            // const englishDate: Date = new Date(e);
            // setEnglishDate(toDateString(e));
            setEnglishDate((e));
            setNepaliDate(convertEnglishToNepali(e));
        } catch (err) {
            setEnglishDate(e);
            setNepaliDate("")
            setError("Invalid date")
        }
    }
    console.log(nepaliDate, englishDate, "final")
    return {
        nepaliDate,
        englishDate,
        handleNepaliDateChange,
        handleEnglishDateChange,
        error
    };
}
