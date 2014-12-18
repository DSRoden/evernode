'use strict';

var cp = require('child_process'),
helpers = require('../../helpers/helpers'),
db = helpers.getdb();

describe('register', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
     browser.get('/#/register');
      done();
    });
  });

  it('should get register page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('register');
  });

  it('should register a user', function(){
    element(by.model('user.username')).sendKeys('sam' + helpers.random(5000));
    element(by.model('user.password')).sendKeys('123');
    element(by.model('user.avatar')).sendKeys('http://www.veryicon.com/icon/ico/Avatar/Halloween%20Avatars/Ghost.ico');
    element(by.css('button[ng-click="submit()"]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });
});
