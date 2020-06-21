const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

var storage = multer.diskStorage({
  // 파일을 저장한 목적지
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // 파일의 이름
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 프론트에서 가져온 이미지 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  // 받은 정보들을 DB에 저장할 곳
  const product = new Product(req.body);
  product.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.post("/products", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 50;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let findArgs = {};
  for (let key in req.body.filters) {
    // 이때key는 continents나 price이다
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }
  // 상품들의 정보를 가져옴
  Product.find(findArgs)
    // populate를 이용해서 writer의 모든 정보를 받아올 수 있다.
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productsInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res
          .status(200)
          .json({ success: true, productsInfo, postSize: productsInfo.length });
      }
    });
});

module.exports = router;
