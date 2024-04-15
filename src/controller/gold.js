const GoogleAccount = require("../model/googleAccount");
const User = require("../model/user");
const GiaoDich = require("../model/giaoDich"); // Đảm bảo rằng bạn đã import GiaoDich từ đúng đường dẫn
const randomInRange = require("../utils/randomInRange");
const myIP = require('../utils/getIp');
// Path: src/routes/gold.js
var gold = 0;
var goldValue = randomInRange(gold);
var isDone = false;

if (isDone) {
    goldValue = 0;
    console.log("Đã reset gold value về 0");
}

var inputAddGiaoDich = {}

exports.setSoLuongGold = async (req, res) => {
    try {
        gold = req.body.soGold;
        inputAddGiaoDich = req.body;
        gold = gold / 1000;
        goldValue = randomInRange(gold);
        inputAddGiaoDich.soGold = goldValue;

        console.log("Tiến hành cài đặt gold chuẩn bị cày là: " + goldValue);
        console.log(inputAddGiaoDich);
        res.status(201).send("Đã cài đặt số gold chuẩn bị cày thành công: " + inputAddGiaoDich);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.setSoLuongGoldWhenLoadingPlow = async (req, res) => {
    try {
        const install_id = req.query.install_id;
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <TapjoyConnectReturnObject>
        <UserAccountObject>
            <TapPoints>
                ${goldValue}
            </TapPoints>
            <CurrencyName>
                Golden Credits
            </CurrencyName>
            <PointsID>
                ${install_id}
            </PointsID>
        </UserAccountObject>
        <Success>
                true
        </Success>
    </TapjoyConnectReturnObject>`;
        res.writeHead(200, { "Content-Type": "application/xml" });
        res.end(xmlContent); // send xmlContent as the response body
        console.log("Số gold chuẩn bị cày là: " + goldValue);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.cayGold = async (req, res) => {
    try {
        const install_id = req.query.install_id;
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
            <TapjoyConnectReturnObject>
                <UserAccountObject>
                    <TapPoints>
                        0
                    </TapPoints>
                    <CurrencyName>
                        Golden Credits
                    </CurrencyName>
                    <PointsID>
                        ${install_id}
                    </PointsID>
                </UserAccountObject>
                <Success>
                    true
                </Success>
                <Message>
                    You successfully spent  ${goldValue} points
                </Message>
            </TapjoyConnectReturnObject>`;

        res.writeHead(200, { "Content-Type": "application/xml" });
        res.end(xmlContent);
        console.log("Hoàn thành cày godld: " + goldValue);
        isDone = true;
        goldValue = 0;
        console.log("Đã reset gold value về 0");

        if (inputAddGiaoDich) {
            try {
                //thêm giao dịch
                console.log("Đang thêm giao dịch");

                const giaoDich = new GiaoDich(inputAddGiaoDich);
                await giaoDich.save();

                console.log("Đã thêm giao dịch:" + giaoDich);
            } catch (error) {
                console.log("Lỗi thêm giao dịch:" + error);
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
};
