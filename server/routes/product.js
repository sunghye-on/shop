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
  // const sd = res.json({
  //   success: true,
  //   filePath: res.req.file.path,
  //   fileName: res.req.file.filename,
  // });
  console.log("iamge", res.req.file);
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
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
  let term = req.body.searchTerm;
  console.log(term);
  let findArgs = {};
  for (let key in req.body.filters) {
    // 이때key는 continents나 price이다
    if (req.body.filters[key].length > 0) {
      console.log("test", key);
      if (key === "price") {
        // 받아온 price 값에 따라 첫번째 값보다 크거나 같고 두번째 값보다 작거나 같다.
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(findArgs);
  // 검색어가 있다면
  if (term) {
    Product.find(findArgs)
      // 받아온 검색어로 검색하는 mongoDB 자체의 기능
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productsInfo) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        } else {
          return res.status(200).json({
            success: true,
            productsInfo,
            postSize: productsInfo.length,
          });
        }
      });
  } else {
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
          return res.status(200).json({
            success: true,
            productsInfo,
            postSize: productsInfo.length,
          });
        }
      });
  }
});

module.exports = router;
