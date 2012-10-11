//js接口构造器
var Interface = function(name, methods) {
    if(arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length
          + "arguments, but expected exactly 2.");
    }
    
    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++) {
        if(typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " 
              + "passed in as a string.");
        }
        this.methods.push(methods[i]);        
    }    
};    

//js接口静态方法
Interface.ensureImplements = function(object) {
    //检测参数是否两个
    if(arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " + 
          arguments.length  + "arguments, but expected at least 2.");
    }
    // 然后从第二个参数位置开始遍历，也就是检查参数类型是否为接口。
    for(var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if(interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments "   
              + "two and above to be instances of Interface.");
        }
        //检查对象是否含有接口指定的方法
        for(var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if(!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " 
                  + "does not implement the " + interface.name 
                  + " interface. Method " + method + " was not found.");
            }
        }
    } 
};

//---------------------------下面是example

// 创建了名为ResultSet的接口，该接口有两个方法getDate，getResults
var ResultSet = new Interface('ResultSet', ['getDate', 'getResults']);

// 检查参数resultsObject是否含有getDate, getResults方法
var ResultFormatter = function(resultsObject) {
  Interface.ensureImplements(resultsObject, ResultSet);
  this.resultsObject = resultsObject;
};

ResultFormatter.prototype.renderResults = function() {
  var dateOfTest = this.resultsObject.getDate();//因为上面检查过了，所以直接拿这个方法
  var resultsArray = this.resultsObject.getResults();//因为上面检查过了，所以直接拿这个方法
  
  var resultsContainer = document.createElement('div');

  var resultsHeader = document.createElement('h3');
  resultsHeader.innerHTML = 'Test Results from ' + dateOfTest.toUTCString();
  resultsContainer.appendChild(resultsHeader);
  
  var resultsList = document.createElement('ul');
  resultsContainer.appendChild(resultsList);
  
  for(var i = 0, len = resultsArray.length; i < len; i++) {
    var listItem = document.createElement('li');
    listItem.innerHTML = resultsArray[i];
    resultsList.appendChild(listItem);
  }
  
  return resultsContainer;
};