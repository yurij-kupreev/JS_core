function List() {
    this.length = 0;
    this.head = null;
    this.tail = null;
}

function Node(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
}

List.prototype.head = function(){
    if (this.length > 0) {
        return this.head;
    } 
    else {
        throw new Error("List has zero length.");
    }
}

List.prototype.tail = function(){
    if (this.length > 0) {
        return this.tail;
    }
    else {
        throw new Error("List has zero length.");
    }
}

List.prototype.append = function(value){
    var newNode = new Node(value);
    if (this.length == 0) {
        this.head = newNode;
        this.tail = newNode;
    }
    else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }
    this.length++;
    return this;
}

List.prototype.deleteAt = function(index){
    var nodeToDelete = this._at(index);
    if (index === this.length - 1) {
        this.tail = nodeToDelete.prev;
        nodeToDelete.prev.next = null;
        
    }
    else if (index === 0){
        this.head = nodeToDelete.next;
        nodeToDelete.next.prev = null;
    }
    else {
        nodeToDelete.next.prev = nodeToDelete.prev;
        nodeToDelete.prev.next = nodeToDelete.next;
    }
    this.length--;
    return this;
}

List.prototype.at = function(index){
    return this._at(index).value;
}

List.prototype._at = function(index){
    if (this.length < index) {
        throw new Error("The index of the item that you have selected more than the length of the list.");
    } 
    else {
        var node = this.head;
        var i = 0;
        while (i != index) {
            node = node.next;
            i++;
        }
        return node;
    }
}

List.prototype.insertAt = function(index, value){
    if (index < this.length) {
        var node = new Node(value);

        var nodeCur = this._at(index);
        var nodeNext = nodeCur.next;

        node.prev = nodeCur;
        node.next = nodeNext;
        nodeCur.next = node;
        nodeNext.prev = node;

        if (index === this.length - 1){
            this.tail = node;
        }
        this.length++;

        return this;
    }
    else {
        throw new Error("The index of the item that you have selected more than the length of the list.");
    }
}

List.prototype.reverse = function(){
    var buffer;
    var i = 0;
    var node = this.head;

    while (i < this.length){
        buffer = node.prev;
        node.prev = node.next;
        node.next = buffer;
        node = node.prev;
        i++;
    }
    buffer = this.head;
    this.head = this.tail;
    this.tail = buffer;

    return this;
}

List.prototype.each = function(callback) {
    var node = this.head;
    var i = 0;
    while (i < this.length) {
        node.value = callback(node.value);
        i++;
        node = node.next;            
    }
    return this;
}

List.prototype.indexOF = function(value){
    var node = this.head;
    var i = 0;
    while (i != this.length) {
        if (node.value == value) {
            return i;
        }
        node = node.next;
        i++;
    }
    throw new Error("Value " + value + " is not found.");
}