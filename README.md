# Lisp_to_JS_converter

## What is this repository for? ##
The goal is to build an API that can convert programs in common lisp into their javascript equivalent.

## Capabilities ##
The service supports Lisp operators(and, mod,incf, decf, =, >, <, <=, >=, +, -, *, /, /=), variable declaration(defvar defconstant), function declaration(defun), and if block.

## Limitations ##
Should expand service supporting for the rest LISP decisions(e.g. when), loops etc.

## Endpoints ##

```shell
POST /isValidLisp
```

**Body Params:**

```shell
{ 
  input, {String}
}
```

**Description**: checks if the input is a valid Lisp program. Server will return as response:

```js
{
    "data": "Correct LISP input"
}
```

```shell
POST /convertToJS
```


**Body Params:**
```shell
{ 
  input, {String}
}
```

**Description**: accepts an input and return it converted to JS. Server will return as response:

```js
{
    "data": javascript equivalent program
}
```
