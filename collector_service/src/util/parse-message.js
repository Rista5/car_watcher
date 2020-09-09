
function parseBrokerMsg(msg) {
    const msgText = msg.content.toString();
    let msgObj = null;
    try {
        msgObj = JSON.parse(msgText);
    }
    catch (err) {
        console.error(err);
        console.log('DATA: ', msgText);
        return null;
    }
    return msgObj;
}

module.exports = parseBrokerMsg;