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
    return `${year}-${month}-${day}`;
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
        setError("Invalid date")
    }

    const [nepaliDate, setNepaliDate] = useState(npdf);
    const [englishDate, setEnglishDate] = useState(endif);

    function convertNepaliToEnglish(nepaliDate: string) {
        const [y, m, d] = nepaliDate.split("-");
        const npdate = new NepaliDate(y, m, d);
        const { year, month, date } = npdate.getAD()
        return `${year}-${month}-${date}`;
    }

    function convertEnglishToNepali(englishDate: Date) {
        const nepaliDate = new NepaliDate(englishDate);
        const { year, month, date } = nepaliDate.getBS()
        return `${year}-${(month.toString()).padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    }

    function handleNepaliDateChange(e: any) {
        try {
            setNepaliDate(e.target.value);
            setEnglishDate(convertNepaliToEnglish((e.target.value).toString()));
        } catch (err) {
            setNepaliDate(e.target.value);
            setEnglishDate("")
            setError("Invalid date")
        }
    }

    function handleEnglishDateChange(e: any) {
        try {
            const englishDate: Date = new Date(e.target.value);
            setEnglishDate(toDateString(englishDate));
            setNepaliDate(convertEnglishToNepali(englishDate));
        } catch (err) {
            setEnglishDate(e.target.value);
            setNepaliDate("")
            setError("Invalid date")
        }
    }

    return {
        nepaliDate,
        englishDate,
        handleNepaliDateChange,
        handleEnglishDateChange,
        error
    };
}
