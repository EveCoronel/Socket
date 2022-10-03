const moment = require("moment/moment");

const formatMessage = (id, username, text) => {
    return {
        id,
        username,
        text,
        time: moment().format('DD/MM/YYYY - HH:mm')
    }
};


module.exports = {
    formatMessage
};