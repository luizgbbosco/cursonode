 var config = require('../config');
 var sendgrid = require('sendgrid')(config.sendgridKey);

 exports.send = async(to, subject, body) => {
     sendgrid.send({
         to : req.body.email,
         from : 'luizgbbosco@gmail.com',
         subject : subject,
         html: body
     });
 }