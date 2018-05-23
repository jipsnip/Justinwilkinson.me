var request = require('request');
var UserDAO = require('../lib/dao/UserDAO');
var nodemailer = require('nodemailer');

function addNewUser(req, res){
    var username = req.query.username;
    var password = req.query.password;
    var email = req.query.email;

    UserDAO.addNewUser(username, password, email).then((done) => {
        var html = '<div>Thank you for signing up to JustinWilkinson.me!</div>' +
            '<div>To activate your account please go to <a href=' + 'JustinWilkinson.me/Activation?id=' + done.activationlink + '>this link</a></div>' +
            '<div>and enter this code: ' + done.activationcode + '</div>';
        var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: 'redacted',
               pass: 'redacted'
           },
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });

        var options = {
            from: 'redacted',
            to: email,
            subject: 'JustinWilkinson.me Sign Up Authorization',
            html: html
        };
        transporter.sendMail(options, (err, info) => {
           if(err){
               console.log(err);
           }
           else{
               console.log('Email sent: ' + info.response);
           }
        });
        res.json(done);
    }, (err) => {
        res.status(500).send(err);
    });
}
exports.addNewUser = addNewUser;

function removeUser(req, res){
}
exports.removeUser = removeUser;

function getUser(req, res){
    var username = req.query.username;
    UserDAO.getUser(username).then((results) => {
        res.json(results);
    }, (err) => {
        res.status(500).send(err);
    });
}
exports.getUser = getUser;

function getActivationCode(req, res){
    var id = req.query.id;
    UserDAO.getActivationCode(id).then((results) => {
        res.json(results);
    }, (err) => {
        res.status(500).send(err);
    });
}
exports.getActivationCode = getActivationCode;

function resetActivationCode(req, res){
    var link = req.query.link;
    UserDAO.resetActivationCode(link).then((activeResults) => {
        UserDAO.getUser(activeResults[0].username).then((results) => {
            var email = results[0].email;
            var html = '<div>Thank you for signing up to JustinWilkinson.me!</div>' +
                '<div>To activate your account please go to <a href=' + 'justinwilkinson.me/Activation?id=' + activeResults[0].activationlink + '>this link</a></div>' +
                '<div>and enter this code: ' + activeResults[0].activationcode + '</div>';
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'redacted',
                    pass: 'redacted'
                },
                secure: false,
                tls: {
                    rejectUnauthorized: false
                }
            });

            var options = {
                from: 'redacted',
                to: email,
                subject: 'JustinWilkinson.me Sign Up Authorization',
                html: html
            };
            transporter.sendMail(options, (err, info) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json(results);
        }, (err) => {
            res.status(500).send(err);
        });
    }, (err) => {
       res.status(500).send(err);
    });
}
exports.resetActivationCode = resetActivationCode;

function activateAccount(req, res){
    var username = req.query.username;
    UserDAO.activateAccount(username).then((results) => {
        res.json(results);
    }, (err) => {
        res.status(500).send(err);
    });
}
exports.activateAccount = activateAccount;

function checkPassword(req, res){
    var password = req.query.password;
    var username = req.query.username;
    UserDAO.confirmPassword(username, password).then((results) => {
        res.json(results);
    }, (err) => {
        res.status(500).send(err);
    });
}
exports.checkPassword = checkPassword;