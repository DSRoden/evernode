'use strict';

var cp = require('child_process'),
  helpers = require('../../helpers/helpers'),
  db = helpers.getdb();

describe('register', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  it('should be logged in', function(){
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeTruthy();
  });

  it('should log out a user', function(){
    browser.get('/#/login');
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('123');
    element(by.css('button[ng-click="submit()"]')).click();
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeTruthy();
    element(by.id('avatarlink')).click();
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeFalsy();
  });

});
