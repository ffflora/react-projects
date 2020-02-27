## Chapter 3 

In JavaScript, only `null` and `undefined` can't have any <u>method</u>. 

#### 3.1 numbers

No error messages return on overflow, underflow and **divided by 0.** 

The non-numbers data type in JavaScript are special: they are not equal to any other values, including themselves. In other words, it can't be checked by`x==NaN` to see if x equals to NaN. Instead, use `x!=x`.  The result returns true. if and only if when x is NaN.



#### 3.7 

The comparison between the objects are not about the values. Even if the values are the same, they are not equal. 

```javascript
var o = {x:1}, p = {x:1}; // two variables with same objects
o === p 				//fasle, two independent objects never equal to each other 
var a = [], b = []
a === b  				// false
```

#### 3.8 Type casting 

```javascript
null == undefined 		// true
"0" == 0 				//string -> number first, 
0 == false 				//bool -> number first
"0" == false 			//string -> bool -> number 

```

`toFixed() `根据小数点后的指定位数将数字转换为字符串，它从不使用指数记数法。`toExponential()`使用指数记数法将数字转换为指数形式的字符串，其中小数点前只有一位，小数点后的位数则由参数指定（也就是说有效数字位数比指定的位数要多一位），`toPrecision()`根据指定的有效数字位数将数字转换成字符串。如果有效数字的位数少于数字整数部分的位数，则转换成指数形式。我们注意到，所有三个方法都会适当地进行四舍五入或填充0。

`parseInt()` and `parseFloat()` are global functions, they don't belong to any classes. `parseInt()` only parse int, and `parseFloat()` parses int and float. 

`valueOf()`: 这个方法的任务并未详细定义：如果存在任意原始值，它就默认将对象转换为表示它的原始值。对象是复合值，而且大多数对象无法真正表示为一个原始值，因此默认的valueOf（）方法简单地返回对象本身，而不是返回一个原始值。数组、函数和正则表达式简单地继承了这个默认方法，调用这些类型的实例的valueOf（）方法只是简单返回对象本身。日期类定义的valueOf（）方法会返回它的一个内部表示：1970年1月1日以来的毫秒数。

“<” and other operator could also do some typecasting besides `Date` objects. Any object would call `valueOf()` first, and then `toString()` to cast to its original type. 不管得到的原始值是否直接使用，它都不会进一步被转换为数字或字符串。`+`,`==`、`!=` and expression operators 是唯一执行这种特殊的字符串到原始值的转换方式的运算符。其他运算符到特定类型的转换都很明确，而且对日期对象来讲也没有特殊情况。例如“-”（减号）运算符把它的两个操作数都转换为数字。下面的代码展示了日期对象和“+”、“-”、“==”以及“>”的运行结果

```javascript
var now = new Date() 			//name a new date object 
typeof(now+1) 				//string: "+"convert date to string 
typeof(now-1) 					//number: - converts object to number 
now == now.toString() 			//true, 
now >(now-1) 				//true > converts date to number 
```



#### 3.9 declaration

If we don't assign any value to a `var` object, then even we have declare the variable, its initial value is still undefined. 

#### 3.10 scopes

当使用var声明一个变量时，创建的这个属性是不可配置的，也就是说这个变量无法通过delete运算符删除。



## Chapter 4 Expression and Operator

#### 4.7 operator

All values in js are either `true` or `false`, therefore all values are operable in terms of boolean. 

#### 4.8 math operator

`++i` : pre-increment, it increment the variable and **return the incremented value**.

`i++` : post-increment, it increment the variable and **return the value before the increment.** 

```javascript
var i =1, j = ++i; //i,j =>2 
var i = 1, j = i++ //i = 2, j= 1
```

#### 4.9 Expression 

`===` strict equality or identity operator, check the operant are strictly equal.

` ==` equality operator, check if the equality, but it allows type castings. 