const axios = require('axios');

class APIController {
    static getHolidays(req, res, next) {
        let presentMonth = new Date().getMonth()+1;

        axios({
            method: 'GET',
            url: `https://calendarific.com/api/v2/holidays?&api_key=6312d25328d071897cc8bd5489d48707a5b534ab&country=ID&year=2021&month=${presentMonth}`
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