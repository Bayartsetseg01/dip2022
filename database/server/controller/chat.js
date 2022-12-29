const mongoose = require("mongoose");
const users = require("../models/users");
const Users = require("../models/users");
const axios = require("axios");

exports.chat = async (req, res, next) => {
  try {
    console.log(`userId ${req.body.user_id}`);
    console.log(`text ${req.body.text}`);
    var text = req.body.text;
    // console.log(req.body);
    const users = await Users.findById(req.body.user_id);
    if (!users) {
      return res.status(400).json({
        success: false,
        error: req.params.id + " id-t хэрэглэгч байхгүй",
      });
    }

    appIp = users.ip;
    console.log(appIp);

    //chatRes = await axios.get(encodeURI(`${appIp}/chat/?text=${text}`));
    chatRes = await axios.post("http://127.0.0.1:5005/webhooks/rest/webhook", {
      sender: "test_user",
      message: text,
    });
    console.log(chatRes.data);

    res.status(200).json({
      success: true,
      ip: appIp,
      data: chatRes.data,
      // `${req.params.id} id-t get user`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};
