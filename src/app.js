const express = require("express");
const mongoose = require("mongoose");
const GiaoDich = require("./model/giaoDich");

const cord = require("cors");
const port = 5000;
const app = express();
app.use(cord());

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    return res.status(201).json({
      message: "File uploaded successfully",
      file: req.file.filename,
    });
  } catch (error) {
    console.error(error);
  }
});

app.post("/uploads", upload.array("images", 12), async (req, res, next) => {
  try {
    let reqData = {
      ngayGiaoDich: "2024-03-27",
      isNo: false,
      soGold: 50000,
      soTien: 550000,
      loaiChuyenKhoan: "Chuyển khoản Viettin",
      note: "Tai khoan do cap 13",
      user: "6604412ceef7455c04fbd2b3",
      googleAccount: "6604402a616c5eedd64827ca",
    };
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Create imgs from files
    // @ts-ignore
    const images = req.files.map(
      (file) => baseUrl + "/" + file.path.replaceAll("\\", "/")
    );

    // Create product
    await GiaoDich.create({ ...reqData, images });

    return res.status(201).json({
      message: "Files uploaded successfully",
      files: req.files,
    });
  } catch (error) {
    console.error(error);
  }
});

const uri = "mongodb+srv://langthambca:accban123@aow.gddjzij.mongodb.net/aow3";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res, next) => {
//   res.send("Hello World");
// });

const userRouter = require("./routes/user");
const giaoDichRouter = require("./routes/giaoDich");
const googleAccountsRouter = require("./routes/googleAccounts");

app.use("/api/users", userRouter);
app.use("/api/giaoDichs", giaoDichRouter);
app.use("/api/googleAccounts", googleAccountsRouter);

function randomInRange(x) {
  let min = x * 1000;
  let max = x * 1000 + 999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let gold = 10;
let goldValue = randomInRange(gold);
console.log(goldValue);

let isDone = false;
if (isDone) {
  goldValue = 0;
  console.log("Đã reset gold value về 0");
}

app.use("/", (req, res, next) => {
  if (req.url === "/get_vg_store_items/user_account") {
    console.log(req.query);
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
  } else if (req.url === "/get_vg_store_items/user_account") {
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
  } else {
    next();
  }
});

const startServer = async () => {
  try {
    // await mongoose.connect(uri);
    console.log("Database connected");
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
  } catch (error) {
    console.log("Error connecting to database");
  }
};

startServer();
