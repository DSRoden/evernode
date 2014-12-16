/* jshint expr:true */

'use strict';

var expect           = require('chai').expect,
cp                 = require('child_process'),
//User               = require('../../server/models/user'),
helpers            = require('../helpers/helpers'),
server             = require('../../server/index'),
Lab                = require('lab'),
lab                = exports.lab = Lab.script(),
describe           = lab.describe,
it                 = lab.it,
beforeEach         = lab.beforeEach,
db                 = helpers.getdb();
console.log(db);

describe('Users', function(){
  var cookie;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '123'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        //console.log(cookie);
        done();
      });
    });
  });


  describe('POST /register', function(){
    it('should register a new User', function(done){
        var options = {
          method: 'post',
          url: '/register',
          payload: {
            username: 'sam',
            password: '456',
            avatar: 'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'
          }
        };

        server.inject(options, function(response){
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });


    describe('POST /login', function(){
      it('should login a User', function(done){
        var options = {
          method: 'post',
          url: '/login',
          payload: {
            username: 'bob',
            password: '123'
          }
        };

        server.inject(options, function(response){
          //console.log(response);
          expect(response.statusCode).to.equal(200);
          expect(response.result.username).to.equal('bob');
          done();
        });
      });
    });

    describe('DELETE /logout', function(){
      it('should logout a User', function(done){
        var options = {
          method: 'delete',
          url: '/logout',
          headers: {
            cookie: cookie
          }
        };

        server.inject(options, function(response){
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe('GET /status', function(){
      it('should get status of a User', function(done){
        var options = {
          method: 'get',
          url: '/status',
          headers: {
            cookie: cookie
          }
        };

        server.inject(options, function(response){
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });


  });
