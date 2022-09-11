const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");

// Middleware method
app.use(cors());
app.use(express.json());

// Schema
const User = require("./model/user.js");
const Category = require("./model/category.js");
const Brand = require("./model/brand.js");
const SubCategory = require("./model/subCategory.js");
const Product = require("./model/product.js");

// Mongoose Database
mongoose.connect("mongodb+srv://mahfuj-nm-one:mahfuj123@nm-one-cluster.1jgtb.mongodb.net/trali?retryWrites=true&w=majority", () => {
  console.log("MongoDB Connected!");
});

// Dummy Data
const bannerData = require("./bannerData");
const logoData = require("./logoData");
const dealData = require("./dealData");
const productData = require("./productData");

// <========= POST ========>
// Post for Registration
app.post("/registration", async (req, res) => {
  const data = await User.find({ email: req.body.email });

  if (data[0]) {
    res.send({ msg: "Email already in use" });
  } else {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      const items = {
        name: req.body.name,
        email: req.body.email,
        shopPhotoURL: req.body.shopPhotoURL,
        shopName: req.body.shopName,
        password: hash,
      };

      const doc = new User(items);
      doc.save();

      res.send({ msg: "Account successfully created" });
    });
  }
});

// Post for Login
app.post("/login", async (req, res) => {
  const data = await User.find({ email: req.body.email });

  if (data[0]) {
    bcrypt.compare(req.body.password, data[0].password, function (err, result) {
      if (result) {
        res.send({
          msg: "User found",
          id: data[0]._id,
          name: data[0].name,
          email: data[0].email,
          shopPhotoURL: data[0].shopPhotoURL,
          shopName: data[0].shopName,
          isVendor: data[0].isVendor,
          isAdmin: data[0].isAdmin,
        });
      } else {
        res.send({ msg: "Wrong password" });
      }
    });
  } else {
    res.send({ msg: "Email not found" });
  }
});

// Post for New Category Add
app.post("/add-category", async (req, res) => {
  let data = await Category.find({ category: req.body.category });

  if (data[0]) {
    res.send(`⛔ "${req.body.category}" already exit!`);
  } else {
    const doc = new Category({ category: req.body.category, approve: req.body.approve });
    doc.save();
    res.send(`✅ "${req.body.category}" successfully added!`);
  }
});

// Post for New Brand Add
app.post("/add-brand", async (req, res) => {
  let data = await Brand.find({ brand: req.body.brand });

  if (data[0]) {
    res.send(`⛔ "${req.body.brand}" already exit!`);
  } else {
    const doc = new Brand({ brand: req.body.brand, approve: req.body.approve });
    doc.save();
    res.send(`✅ "${req.body.brand}" successfully added!`);
  }
});

// Post for New Sub Category Add
app.post("/add-sub-category", async (req, res) => {
  let data = await SubCategory.find({ subCategory: req.body.subCategory });

  if (data[0]) {
    res.send(`⛔ "${req.body.subCategory}" already exit!`);
  } else {
    const doc = new SubCategory({ subCategory: req.body.subCategory, approve: req.body.approve });
    doc.save();
    res.send(`✅ "${req.body.subCategory}" successfully added!`);
  }
});

// Post for New Product Add
app.post("/product", async (req, res) => {
  let data = await Product.find({ slug: req.body.slug });

  if (data[0]) {
    res.send("⛔ This slug already exit!");
  } else {
    const items = {
      title: req.body.title,
      image: req.body.image,
      price: req.body.price,
      disPrice: req.body.disPrice,
      slug: req.body.slug,
      brand: req.body.brand,
      category: req.body.category,
      subCategory: req.body.subCategory,
      color: req.body.color,
      size: req.body.size,
      description: req.body.description,
      approve: req.body.approve,
    };

    const doc = new Product(items);
    doc.save();
    res.send("✅ Product successfully added!");
  }
});

// <========= PUT ========>
// Become a Vendor
app.put("/vendor/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { isVendor: true }, { returnOriginal: false }, function (err, docs) {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({
        msg: "Vendor account",
        id: docs._id,
        name: docs.name,
        email: docs.email,
        shopPhotoURL: docs.shopPhotoURL,
        shopName: docs.shopName,
        isVendor: docs.isVendor,
        isAdmin: docs.isAdmin,
      });
    }
  });
});

// Publisher Profile Update
app.put("/pub-profile-update/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { shopName: req.body.shopName, shopPhotoURL: req.body.shopPhotoURL }, { returnOriginal: false }, function (err, docs) {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({
        msg: "Profile update successfuly",
        id: docs._id,
        name: docs.name,
        email: docs.email,
        shopPhotoURL: docs.shopPhotoURL,
        shopName: docs.shopName,
        isVendor: docs.isVendor,
        isAdmin: docs.isAdmin,
      });
    }
  });
});

// Put for brand approve
app.put("/admin-approve-brand/:id", (req, res) => {
  Brand.findByIdAndUpdate(req.params.id, { approve: true }, { returnOriginal: false }, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Brand approved!");
    }
  });
});

// Put for category approve
app.put("/admin-approve-category/:id", (req, res) => {
  Category.findByIdAndUpdate(req.params.id, { approve: true }, { returnOriginal: false }, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Category approved!");
    }
  });
});

// Put for category approve
app.put("/admin-approve-sub-category/:id", (req, res) => {
  SubCategory.findByIdAndUpdate(req.params.id, { approve: true }, { returnOriginal: false }, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Sub Category approved!");
    }
  });
});

// Put for Product approve
app.put("/admin-approve-product/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, { approve: true }, { returnOriginal: false }, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Product approved!");
    }
  });
});

// <========= DELETE ========>
// Delete for brand rejected
app.delete("/admin-delete-brand/:id", (req, res) => {
  Brand.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Brand deleted!");
    }
  });
});

// Delete for category rejected
app.delete("/admin-delete-category/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Category deleted!");
    }
  });
});

// Delete for sub category rejected
app.delete("/admin-delete-sub-category/:id", (req, res) => {
  SubCategory.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Sub Category deleted!");
    }
  });
});

// Delete for Product rejected
app.delete("/admin-delete-product/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send("Product deleted!");
    }
  });
});

// <========= GET ========>
// Get Approve Category
app.get("/approve-category", async (req, res) => {
  const data = await Category.find({ approve: true });
  res.send(data);
});

// Get Disapprove Brand
app.get("/disapprove-category", async (req, res) => {
  const data = await Category.find({ approve: false });
  res.send(data);
});

// Get Approve Brand
app.get("/approve-brand", async (req, res) => {
  const data = await Brand.find({ approve: true });
  res.send(data);
});

// Get Disapprove Brand
app.get("/disapprove-brand", async (req, res) => {
  const data = await Brand.find({ approve: false });
  res.send(data);
});

// Get Approve Sub Category
app.get("/approve-sub-category", async (req, res) => {
  const data = await SubCategory.find({ approve: true });
  res.send(data);
});

// Get Disapprove Sub Category
app.get("/disapprove-sub-category", async (req, res) => {
  const data = await SubCategory.find({ approve: false });
  res.send(data);
});

// Get Disapprove Product
app.get("/disapprove-product", async (req, res) => {
  const data = await Product.find({ approve: false });
  res.send(data);
});

// Get Disapprove Product
app.get("/topproduct", async (req, res) => {
  const data = await Product.find({ approve: true });
  res.send(data);
});

// <========= End Point ========>
app.listen(8000, () => {
  console.log("Server listen on port 8000!");
});

app.get("/", function (req, res) {
  res.send("Trali is Running!");
});

// <========= Dummy ========>
app.get("/logo", function (req, res) {
  res.send(logoData);
});

app.get("/banner", function (req, res) {
  res.send(bannerData);
});

app.get("/deal", function (req, res) {
  res.send(dealData);
});
