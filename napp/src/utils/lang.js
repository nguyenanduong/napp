define([], function () {
	var lang = {
		deepMixin: function(dest, source) { 
			//Recursively mix the properties of two objects 
			var empty = {}; 
			for (var name in source) { 
				if(!(name in dest) || (dest[name] !== source[name] && (!(name in empty) || empty[name] !== source[name]))){ 
					try { 
						if ( source[name].constructor==Object ) { 
							dest[name] = this.deepMixin(dest[name], source[name]); 
	                    } else if ( source[name].constructor==Array ) {
	                    	dest[name] = dest[name].concat(source[name]); 
	                	} else { 
	                        dest[name] = source[name]; 
	                    }; 
	                } catch(e) { 
	                    // Property in destination object not set. Create it and set its value. 
	                    dest[name] = source[name]; 
	                }; 
	           }; 
	        } 
	     	return dest; 
	 	}
	}

	return lang;
});