'use strict';

var cp = require('child_process'),
  helpers = require('../../helpers/helpers'),
  db = helpers.getdb(),
  path = require('path');

describe('notes list', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      login();
      done();
    });
  });

  it('should get  notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a note', function(){
    create('title', 'body', 'tag1, tag2, tag3');

    expect(element(by.model('note.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.body')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.tags')).getAttribute('value')).toEqual('');
    expect(element.all(by.repeater('note in notes')).count()).toBeGreaterThan(0);
  });

  it('should go to note detail', function(){
    create('title2', 'body2', 'tag4, tag5, tag6');
    element(by.repeater('note in notes').row(0)).element(by.css('td:nth-child(2) > a')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('title2');
  });

});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('bob');
  element(by.model('user.password')).sendKeys('123');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/notes');
}

function create(title, body, tags){
  var image = path.resolve(__dirname, '../../fixtures/test_image.png');
  element(by.model('note.title')).sendKeys(title);
  helpers.debug('blue');
  element(by.model('note.body')).sendKeys(body);
  element(by.model('note.tags')).sendKeys(tags);
  element(by.css('input[type="file"]')).sendKeys(image);
  helpers.debug('blue');
  element(by.css('button[ng-click="create(note)"]')).click();
}
