function Person(options) {
  options = options || {};
  this.name = options.name;
  this.url = options.url;
}

Person.prototype.setName = function(name) {
  this.name = name;
}

Person.prototype.setUrl = function(url) {
  this.url = url;
}


function PersonView(data) {
  this.name = data.name;
  this.url = data.url;
}

PersonView.prototype._extraClass = function() {
  var a = document.createElement('a');
  return isSameOrigin(this.url, a) ? ' b-person_origin_same' : '';
}

PersonView.prototype.render = function() {
  return $('<a href="' + this.url + '" class="b-person' + this._extraClass() + '">' + this.name + '</a>');
}

function isSameOrigin(url, parser) {
  parser.href = url;
  return location.origin === parser.origin;
}

function counter(e) {
  console.log('debug', 'user_page_visited');
  e.preventDefault();
}


var person = new Person();
person.setName('name');
person.setUrl('url');

var personView = new PersonView(person);
personView.render().on('click', counter);
personView.render().appendTo('.header');

