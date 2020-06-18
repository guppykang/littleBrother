const Room = require('../models/room');

exports.index = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method == 'OPTIONS') {
        return res.send(true);
    }

    console.log(req.body);

    let nextHinter = null;
    if (req.body.team == 1) {
        let query = await Room.find({ roomCode: req.body.code });
        nextHinter = query[0].teamOneNextHinter;
    }
    else if (req.body.team == 2) {
        let query = await Room.find({ roomCode: req.body.code });
        nextHinter = query[0].teamTwoNextHinter;
    }

    console.log(nextHinter);

    return res.json(nextHinter);
};
