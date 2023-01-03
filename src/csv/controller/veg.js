const service = require("./csv");
const router = require("express").Router();

module.exports = router;
router.get("/:fileName", async (req, res) => {
  res.sendFile(req.params.fileName, { root: "school2/csv/" });
});
