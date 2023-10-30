export default class NepaliDate {
    public year: number
    public month: number
    public day: number
    constructor(date: string) {
        const [year, month, day] = date.split("-");
        this.year = parseInt(year);
        this.month = parseInt(month);
        this.day = parseInt(day);
    }

    toString() {
        return `${this.year}-${this.month}-${this.day}`;
    }

    getYear() {
        return this.year;
    }

    getMonth() {
        return this.month;
    }

    getDay() {
        return this.day;
    }
}
