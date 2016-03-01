/**
 * WatsonController
 *
 * @description :: Server-side logic for managing watsons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	uploadImage: function(req, res){
		req.file('files').upload({
			// don't allow the total upload size to exceed ~20MB
			maxBytes: 20000000
			},function whenDone(err, uploadedFiles) {
			if (err) {
				return res.negotiate(err);
			}

			// If no files were uploaded, respond with an error.
			if (uploadedFiles.length === 0){
				return res.badRequest('No file was uploaded');
			}

			return res.ok();
		});
	}
	
};

