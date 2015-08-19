function Stack(data)
{
	this.lastElement = new Element(data);
}

function Element(data)
{
	this.data = data;
	this.previous = null;
}

Stack.prototype.Push = function (data)
{
	var currentElement = new Element(data);
	currentElement.previous = this.lastElement;
	this.lastElement = currentElement;
};

Stack.prototype.Pop = function (data)
{
	if (this.lastElement)
	{
		var data = this.lastElement.data;
		this.lastElement = this.lastElement.previous;
		return data;
	}
};

Stack.prototype.Peek = function (data)
{
	if (this.lastElement)
	{
		var data = this.lastElement.data;
		return data;
	}
};