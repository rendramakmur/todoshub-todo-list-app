const axios = require('axios');

class APIController {
    static getHolidays(req, res, next) {
        let presentMonth = new Date().getMonth()+1;
        let presentYear = new Date().getFullYear();
        let api = process.env.API_HOLIDAY;

        axios({
            method: 'GET',
            url: `https://calendarific.com/api/v2/holidays?&api_key=${api}&country=ID&year=${presentYear}&month=${presentMonth}`
        })
        .then(response => {
            let holidayList = response.data.response.holidays
            let cleanHolidayList = []
            let holidaysDate = []

            holidayList.forEach(holiday => {
                let flag = false;
                holidaysDate.forEach(date => {
                    if (holiday.date.iso === date) {
                        flag = true;
                    }
                })
                if (holiday.type[0] === 'National holiday' && flag === false) {
                    holidaysDate.push(holiday.date.iso)
                    cleanHolidayList.push({
                        name: holiday.name,
                        date: holiday.date.iso,
                        type: holiday.type[0]
                    })
                }
            })

            res.status(200).json(cleanHolidayList);
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = APIController;