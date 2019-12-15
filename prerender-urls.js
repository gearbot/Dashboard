const fs = require('fs');

function walkSync (dir, list) {
	let files = fs.readdirSync(dir);
	let filelist = list || [];
	files.forEach(function (file) {
		if (fs.statSync(dir + file).isDirectory()) {
			filelist = walkSync(dir + file + '/', filelist);
		} else {
			filelist.push(dir + file);
		}
	});
	return filelist;
};

module.exports = () => {
	const pages = [
		{
			url: "/"
		}
	];
	const docs = walkSync("Docs/pages/");
	for (let i = 0; i < docs.length; i++) {
		let name = docs[i].substring(15, docs[i].length - 3); //cut off /src/docs/pages and .md
		if (name.endsWith("index")) // cut off the index part
			name = name.substring(0, name.length - 5);
		pages.push({url: `/docs/${name}`})
	}

	console.log(pages)

	return pages

}