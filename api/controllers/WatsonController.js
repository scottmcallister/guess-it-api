/**
 * WatsonController
 *
 * @description :: Server-side logic for managing watsons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
	username: '91b91e0c-9e3e-496f-8be8-8d99257112e4',
	password: 'oGm2l96oVZl4',
	version: 'v2-beta',
	version_date: '2015-12-02'
});

module.exports = {

	uploadImage: function(req, res){
		req.file('files').upload({
				// don't allow the total upload size to exceed ~20MB
				maxBytes: 20000000
			},
			function whenDone(err, uploadedFiles) {
				if (err) {
					return res.negotiate(err);
				}

				// If no files were uploaded, respond with an error.
				if (uploadedFiles.length === 0){
					return res.badRequest('No file was uploaded');
				}

				console.log(uploadedFiles);

				var params = {
					images_file: fs.createReadStream(uploadedFiles[0].fd)
				};

				visual_recognition.classify(params, function(err, response){
					if(err)
						return res.negotiate(err);
					else
						return res.json(response);
				});

				return res.ok();
			});
	}
	
};

