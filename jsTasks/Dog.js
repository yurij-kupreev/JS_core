function Dog(name)
{
	this.name = name;
}

Dog.prototype.Voice = function (){ 
	console.log(this.name) 
};

Dog.prototype.Push = function ()
{ 
	var name = this.name;
	setTimeout(function () {
		console.log(name)
	}, 1000); 
};
