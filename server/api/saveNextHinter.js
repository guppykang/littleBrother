const Room = require('../models/room');

exports.index = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method == 'OPTIONS') {
        return res.send(true);
    }

    console.log(req.body);

    let addResponse = null;

    if (req.body.team == 1) {
        addResponse = await Room.update({ roomCode: req.body.code }, { teamOneNextHinter: req.body.index });
    }
    else if (req.body.team == 2) {
        addResponse = await Room.update({ roomCode: req.body.code }, { teamTwoNextHinter: req.body.index });
    }

    return res.send(addResponse);
};
