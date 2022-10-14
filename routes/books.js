const { Router } = require("express");
const router = Router();
const uuid = require("uuid");
const Books = require("../Books");

router.get("/", (req, res) => {
  res.json(Books);
});

// Get one book by id
router.get("/:id", (req, res) => {
  const isExist = Books.some((book) => book.id === parseInt(req.params.id));

  if (isExist) {
    res.json(Books.filter((book) => book.id === parseInt(req.params.id)));
  } else {
    res
      .status(404)
      .json({ messege: `Siz qidirgan ${req.params.id} idlik kitob topilmadi` });
  }
});
// Put
router.put("/:id", (req, res) => {
  const isExist = Books.some((book) => book.id === parseInt(req.params.id));

  if (isExist) {
    const updatebook = req.body;

    Books.forEach((book) => {
      if (book.id === parseInt(req.params.id)) {
        book.name = updatebook.name ? updatebook.name : book.name;
        book.author = updatebook.author ? updatebook.author : book.author;
        book.pages = updatebook.pages ? updatebook.pages : book.pages;

        res.json({ messege: "Kitob ma'lumotlarni yangilandi", book });
      }
    });
    // res.json(Books.filter((book) => book.id === parseInt(req.params.id)));
  }
});
// Delete book by id
router.delete("/:id", (req, res) => {
  const isExist = Books.some((book) => book.id === parseInt(req.params.id));

  if (isExist) {
    res.json({
      messege: "Kitob o'chirildi",
      Books: Books.filter((book) => book.id !== parseInt(req.params.id)),
    });
  } else {
    res
      .status(404)
      .json({ messege: `Siz qidirgan ${req.params.id} idlik kitob topilmadi` });
  }
});
// Post
router.post("/", (req, res) => {
  // res.send(req.body);
  const newBook = {
    id: uuid.v4(),
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages,
  };
  if (!req.body.name || !req.body.author || !req.body.pages) {
    return res
      .status(404)
      .json({ messege: "Iltimos barcha ma'lumotlarni kiriting" });
  }
  Books.push(newBook);
  res.json(Books);
});

module.exports = router;
