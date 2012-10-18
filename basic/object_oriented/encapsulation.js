// 来自于《JavaScript设计模式》
var Book = (function() {
  
  // 静态变量
  var numOfBooks = 0;

  // 静态方法
  function checkIsbn(isbn) {
    // ... 
    return true;
  }    

  // 返回构造函数
  return function(newIsbn, newTitle, newAuthor) { 

    // 私有变量
    var isbn, title, author;

    // 特权方法（类属性）
    this.getIsbn = function() {
      return isbn;
    };
    this.setIsbn = function(newIsbn) {
      if(!checkIsbn(newIsbn)) throw new Error('Book: Invalid ISBN.');
      isbn = newIsbn;
    };

    this.getTitle = function() {
      return title;
    };
    this.setTitle = function(newTitle) {
      title = newTitle || 'No title specified';
    };

    this.getAuthor = function() {
      return author;
    };
    this.setAuthor = function(newAuthor) {
      author = newAuthor || 'No author specified';
    };

    
    numOfBooks++; // 因为上面有了类静态变量，每实例一次对象，就+1，超过50报错
                  
    if(numOfBooks > 50) throw new Error('Book: Only 50 instances of Book can be '
        + 'created.');

    this.setIsbn(newIsbn);
    this.setTitle(newTitle);
    this.setAuthor(newAuthor);
  }
})();

// 静态方法
Book.convertToTitleCase = function(inputString) {
  // ...
};

// 公共方法
Book.prototype = {
  display: function() {
    // ...
  }
};

//-----example-----还有一些缺点就是，还是能改掉特权方法，这也是JavaScript动态特性所致。
var xiyouji = new Book("007","西游记","吴承恩");
// xiyouji.getTitle = function(){console.log("稀有计")};
console.log(xiyouji.getTitle());

