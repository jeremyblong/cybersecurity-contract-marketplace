const express = require("express");
const router = express.Router();
const config = require("config");
const _ = require("lodash");
// mongodb
const { Connection } = require("../../../../mongoUtil.js");

router.post("/", (req, resppppp, next) => {
    const { 
        numberOfEmployees,
        yearsInBusiness,
        openAssets,
        specialty, 
        companyName, 
        publicFacingWebsite, 
        addressPostalCode, 
        addressCity, 
        addressLineOne, 
        country, 
        aboutCompany,
        id
    } = req.body;

    console.log("req.body", req.body);

    const collection = Connection.db.db("db").collection("employers");

    collection.findOne({ uniqueId: id }).then((user) => {
        if (!user) {
            console.log("User does NOT exist or could not be found.");

            resppppp.json({
                message: "User does NOT exist or could not be found."
            })
        } else {

            if (numberOfEmployees !== null) user["numberOfEmployees"] = numberOfEmployees;
            if (yearsInBusiness !== 0) user["yearsInBusiness"] = yearsInBusiness;
            if (typeof openAssets !== "undefined" && openAssets.length > 0) user["openAssets"] = openAssets;
            if (typeof specialty !== "undefined" && specialty.length > 0) user["sectorOrSpecialty"] = specialty;
            if (typeof companyName !== "undefined" && companyName.length > 0) user["companyName"] = companyName;
            if (typeof publicFacingWebsite !== "undefined" && publicFacingWebsite.length > 0) user["publicFacingWebsite"] = publicFacingWebsite;
            if (typeof aboutCompany !== "undefined" && aboutCompany.length > 0) user["aboutCompany"] = aboutCompany;

            if ((typeof addressLineOne !== "undefined" && addressLineOne.length > 0) && (typeof addressCity !== "undefined" && addressCity.length > 0) && (typeof country !== "undefined" && country.length > 0) && (typeof addressPostalCode !== "undefined" && addressPostalCode.length > 0)) {
                if (_.has(user, "currentCompanyAddress")) {
                    user.currentCompanyAddress = {
                        addressLineOne: addressLineOne !== null ? addressLineOne : user.addressLineOne,
                        addressCity: addressCity !== null ? addressCity : user.addressCity,  
                        addressPostalCode: addressPostalCode !== null ? addressPostalCode : user.addressPostalCode, 
                        country: country !== null ? country : user.country
                    }
                } else {
                    user["currentCompanyAddress"] = {
                        addressLineOne,
                        addressCity,  
                        addressPostalCode, 
                        country
                    }
                }
            }

            collection.save(user, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);

                    resppppp.json({
                        message: "Successfully updated profile data!",
                        user
                    })
                }
            })
        }
    }).catch((err) => {
        console.log(err);

        resppppp.json({
            message: "Unknown error.",
            err
        })
    })
});
module.exports = router;