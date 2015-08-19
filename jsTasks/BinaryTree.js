function BinaryTree(data)
{
	this.root = new Node(data);
}

function Node(data)
{
	this.data = data;
	this.right = null;
	this.left = null;
}

BinaryTree.prototype.AddNode = function (data)
{
	var currentNode = this.root;
	while (1)
	{
		if (data > currentNode.data)
		{
			if (!currentNode.right)
			{
				currentNode.right = new Node(data);
				break;
			}
			else
			{
				currentNode = currentNode.right;
			}
		}
		else if (data < currentNode.data)
		{
			if (!currentNode.left)
			{
				currentNode.left = new Node(data);
				break;
			}
			else 
			{
				currentNode = currentNode.left;
			}
		}
	}
}

var array = [12, 13, 5, 4, 8, 56, 10];