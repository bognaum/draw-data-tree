###A simple function to create tree graphs

```

(/) draw-data-tree
 ┣━(/) docs
 ┃  ┣━━#━ script.js
 ┃  ┗━━#━ index.html
 ┗━━#━ draw-data-tree.js

```

```
<html> 
 ┣━<head> 
 ┃  ┣━<meta> 
 ┃  ┣━<meta> 
 ┃  ┗━<title> 
 ┗━<body> 
    ┣━<h3> "About templates"
    ┣━<p> 
    ┣━<pre> 
    ┃  ┗━<script> 
    ┣━<h3> "Simple using"
    ┣━<p> 
    ┣━<pre#simpleUsingGraph> 
    ┣━<h3> "Another way to create graph"
    ┣━<p> 
    ┣━<pre#fromElementsBuildedGraph> 
    ┃  ┣━<div.row> 
    ┃  ┃  ┗━<span.header> 
    ┃  ┃     ┣━<span.symbol> 
    ┃  ┃     ┗━<span.name> 
    ┃  ┣━<div.row> 
    ┃  ┃  ┣━<span.branch> 
    ┃  ┃  ┗━<span.header> 
    ┃  ┃     ┣━<span.symbol> 
    ┃  ┃     ┗━<span.name> 
    ┃  ┣━<div.row> 
    ┃  ┃  ┣━<span.branch> 
    ┃  ┃  ┣━<span.branch> 
    ┃  ┃  ┗━<span.header> 
    ┃  ┃     ┣━<span.symbol> 
    ┃  ┃     ┗━<span.name> 
    ┃  ┣━<div.row> 
    ┃  ┃  ┣━<span.branch> 
    ┃  ┃  ┣━<span.branch> 
    ┃  ┃  ┗━<span.header> 
    ┃  ┃     ┣━<span.symbol> 
    ┃  ┃     ┗━<span.name> 
    ┃  ┗━<div.row> 
    ┃     ┣━<span.branch> 
    ┃     ┗━<span.header> 
    ┃        ┣━<span.symbol> 
    ┃        ┗━<span.name> 
    ┣━<h3> "DOM-model as template"
    ┣━<p> 
    ┣━<pre#domAsTemplate> 
    ┣━<h3> "Added numbers of rows"
    ┣━<pre#withNumbers> 
    ┣━<script src="file:///D:/GitHub/draw-data-tree/draw-data-tree.js"> 
    ┗━<script src="file:///D:/GitHub/draw-data-tree/tests/script.js"> 

```