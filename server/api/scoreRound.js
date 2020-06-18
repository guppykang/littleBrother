const Room = require('../models/room');

exports.index = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method == 'OPTIONS') {
        return res.send(true);
    }

    console.log(req.body);
    //the given team is the team of the hinter

    let addResponse = null;

    //if the other team gets it right, they get a good point 
    if (req.body.sequence == req.body.guess) {
        if (req.body.team == 1) {
            req.body.score[2] += 1; //team two good points
            addResponse = await Room.update({ roomCode: req.body.code }, { teamTwoGoodPoints: req.body.score[2] });
        } else {
            req.body.score[0] += 1; //team one good points
            addResponse = await Room.update({ roomCode: req.body.code }, { teamOneGoodPoints: req.body.score[0] });
        }
    }

    //if the current team gets it wrong, the get a bad point
    if (req.body.sequence != req.body.answer) {
        if (req.body.team == 1) {
            req.body.score[1] += 1; //team one bad points
            addResponse = await Room.update({ roomCode: req.body.code }, { teamOneBadPoints: req.body.score[1] });
        } else {
            req.body.score[3] += 1; //team two bad points
            addResponse = await Room.update({ roomCode: req.body.code }, { teamTwoBadPoints: req.body.score[3] });
        }
    }
    if (addResponse == null) {
        //shit the bed. Server is not responding or bad data
        return res.send(false);
    }

    console.log(req.body.score);

    return res.send(req.body.score);
};
