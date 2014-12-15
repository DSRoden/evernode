/* jshint expr:true */

'use strict';

var expect           = require('chai').expect,
  cp                 = require('child_process'),
  User               = require('../../server/models/user'),
  helpers            = require('../helpers/helpers'),
  Lab                = require('lab'),
  lab                = exports.lab = Lab.script(),
  describe           = lab.describe,
  it                 = lab.it,
  beforeEach         = lab.beforeEach,
  db                 = helpers.getdb();
  console.log(db);

describe('User', function(){

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a User object', function(done){
    var user = new User({username: 'bob'});
    expect(user).to.be.instanceof(User);
    expect(user.username).to.equal('bob');
    done();
    });
  });

  describe('.register', function(){
    it('should register a new User', function(done){
      User.register({username: 'sam', password: '123', avatar: 'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
        expect(err).to.be.null;
        done();
      });
    });
  });


});
