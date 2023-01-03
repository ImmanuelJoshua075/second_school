
const csv = require("../controller/csv");

const router = require("express").Router();

module.exports = router;

router.post('/allusers',csv.generateCsvReportForAllUser);

router.post('/mail/particularteacher/:id',csv.generateCsvparticularteacher)


router.post('/mail/teachers',csv.generateCsvparticularteacher)

router.post('/:filename',(req,res)=>{
    res.sendFile(req.params.filename,{root : "school2/csv"})
})
