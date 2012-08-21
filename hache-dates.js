/*
   function hDate
   parameters: dateString dateType options
   returns: boolean

   dateString is a date passed as a string in the following
   formats:

   type 1 : 19970529
   type 2 : 970529
   type 3 : 29/05/1997
   type 4 : 29/05/97

   dateType is a numeric integer from 1 to 4, representing
   the type of dateString passed, as defined above.

   Returns string containing the age in years, months and days
   in the format yyy years mm months dd days.
   Returns empty string if dateType is not one of the expected
   values.
*/
var hDate = function (dateString, dateType, options) {

    var mergeObj = function (obj1, obj2) {
        for (var p in obj2) {
            if (obj2.hasOwnProperty(p)) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    },
    settings = {
            ago: 'ago',
            now: 'today',
            minute: 'Minute',
            minutes: 'Minutes',
            hour: 'Hour',
            hours: 'Hours',
            day: 'day',
            days: 'days',
            week: 'Week',
            weeks: 'Weeks',
            month: 'month',
            months: 'months',
            year: 'year',
            years: 'years',
            yearTpl: '{yearNum} {yearWord}',
            monthTpl: '{seperator}{monthNum} {monthWord}',
            dayTpl: '{seperator}{dayNum} {dayWord}',
            outputTpl: '{yearTpl}{monthTpl}{dayTpl} {ago}',
            seperator: ', ',
            lastSeperator: ' and '
        };
        //console.log(settings);
        mergeObj(settings, options);
        //console.log(settings);
    var now = new Date();
    var today = new Date(now.getYear(),now.getMonth(),now.getDate());

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dayNow = now.getDate();

    if (dateType == 1)
        var dob = new Date(dateString.substring(0,4),
                            dateString.substring(4,6)-1,
                            dateString.substring(6,8));
    else if (dateType == 2)
        var dob = new Date(dateString.substring(0,2),
                            dateString.substring(2,4)-1,
                            dateString.substring(4,6));
    else if (dateType == 3)
        var dob = new Date(dateString.substring(6,10),
                            dateString.substring(3,5)-1,
                            dateString.substring(0,2));
    else if (dateType == 4)
        var dob = new Date(dateString.substring(6,8),
                            dateString.substring(3,5)-1,
                            dateString.substring(0,2));
    else
        return '';

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dayDob = dob.getDate();

    yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow -monthDob;
    }

    if (dayNow >= dayDob)
        var dayAge = dayNow - dayDob;
    else {
        monthAge--;
        var dayAge = 31 + dayNow - dayDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    var seperator = ' ';

    if(yearAge !== 0)
        yearOutput = settings.yearTpl.replace('{yearNum}', yearAge).replace('{yearWord}', (yearAge == 1)? settings.year: settings.years);

    if(monthAge !== 0)
        monthOutput = settings.monthTpl.replace('{monthNum}', monthAge).replace('{monthWord}', (monthAge == 1)? settings.month: settings.months);

    if(dayAge !== 0)
        dayOutput = settings.dayTpl.replace('{dayNum}', dayAge).replace('{dayWord}', (dayAge == 1)? settings.day: settings.days);

    if (dayAge === 0)
        return settings.now;
    
    if(typeof yearOutput != 'undefined'){
        seperator = (typeof monthOutput != 'undefined' && typeof dayOutput != 'undefined')? seperator = settings.seperator: (typeof monthOutput != 'undefined' || typeof dayOutput != 'undefined')? seperator = settings.lastSeperator:  seperator = '';
        settings.outputTpl = settings.outputTpl.replace('{yearTpl}', yearOutput.replace('{seperator}', seperator));
    } else {
        settings.outputTpl = settings.outputTpl.replace('{yearTpl}', '');
    }
    if(typeof monthOutput != 'undefined'){
        seperator = (typeof yearOutput != 'undefined' && typeof dayOutput != 'undefined')? seperator = settings.seperator: (typeof yearOutput != 'undefined' && typeof dayOutput == 'undefined')? seperator = settings.lastSeperator:  seperator = '';
        settings.outputTpl = settings.outputTpl.replace('{monthTpl}', monthOutput.replace('{seperator}', seperator));
    } else {
        settings.outputTpl = settings.outputTpl.replace('{monthTpl}', '');
    }
    if(typeof dayOutput != 'undefined'){
        seperator = (typeof yearOutput != 'undefined' || typeof monthOutput != 'undefined')? seperator = settings.lastSeperator: seperator = '';
        settings.outputTpl = settings.outputTpl.replace('{dayTpl}', dayOutput.replace('{seperator}', seperator));
    } else {
        settings.outputTpl = outputTpl.replace('{dayTpl}', '');
    }

    return settings.outputTpl.replace('{ago}', settings['ago']);
}