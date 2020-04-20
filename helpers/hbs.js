const moment = require('moment')
exports.truncate = (str, len)=>{
	if (str.length > len && str.length > 0) {
		let new_str = str + " "
		new_str = str.substr(0,len)
		new_str = str.substr(0, new_str.lastIndexOf(" "))
		new_str = (new_str.length > 0) ? new_str :str.substr(0, len)
		return new_str + "..."
	}
	return str
}

exports.stripTags = (str)=>{
	return str.replace(/<(?:.|\n)*?>/gm, "")
}

exports.dateFormatter = (date, format)=>{
	return moment(date).format(format)
}

exports.select = (selected,options)=>{
	    return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');

}

exports.editIcon = (storyUser, loggedUser, storyId, floating = true)=>{
    if(storyUser == loggedUser){
      if(floating){
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fas fa-pencil-alt"></i></a>`;
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fas fa-pencil-alt"></i></a>`;
      }
    } else {
      return '';
    }
  }