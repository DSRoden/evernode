'use strict';

var cp = require('child_process'),
  helpers = require('../../helpers/helpers'),
  db = helpers.getdb();

describe('login', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      browser.get('/#/login');
      done();
    });
  });

  it('should get login page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });

  it('should login', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('123');
    element(by.css('button[ng-click="submit()"]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });

  it('should not login', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('125');
    element(by.css('button[ng-click="submit()"]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });
});
