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
  var cookie,
      noteId;

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
        var options = {
          method: 'post',
          url: '/notes',
          headers: {
            cookie: cookie
          },
          payload: {
            title: 'note',
            body: 'body',
            tags: 'a, b, c'
          }
        };

        server.inject(options, function(response){
          //console.log(response.result.noteId);
          noteId = Number(response.result.noteId);
          //console.log(noteId);
          //expect(response.result.noteId).to.equal(399);
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
  });




  describe('POST /notes', function(){
    it('should add a note', function(done){
      var options = {
        method: 'post',
        url: '/notes',
        headers: {
          cookie: cookie
        },
        payload: {
          title: 'note',
          body: 'body',
          tags: 'a, b, c'
        }
      };

      server.inject(options, function(response){
        //console.log(response);
        //expect(response.result.noteId).to.equal(399);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /notes', function(){
    it('should get notes', function(done){
      var options = {
        method: 'get',
        url: '/notes',
        headers: {
          cookie: cookie
        },
        query: {
          limit: '',
          offset: '',
          tag: ''
        }
      };

      server.inject(options, function(response){
        //console.log(response.result.notes[0]);
        //expect(response.result.noteId).to.equal(399);
        expect(response.result.notes[0].body).to.equal('body');
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });


  // describe('POST /notes/{noteId}/upload', function(){
  //   it('should upload a photo to a note', function(done){
  //     var options = {
  //       method: 'post',
  //       url: '/notes/{noteId}/upload',
  //       headers: {
  //         cookie: cookie
  //       },
  //       query: {
  //         limit: '',
  //         offset: '',
  //         tag: ''
  //       }
  //     };
  //
  //     server.inject(options, function(response){
  //       //console.log(response.result.notes[0].body);
  //       //expect(response.result.noteId).to.equal(399);
  //       expect(response.result.notes[0].body).to.equal('body');
  //       expect(response.statusCode).to.equal(200);
  //       done();
  //     });
  //   });
  // });

  describe('GET /notes/{noteId}', function(){
    it('should get notes', function(done){
      var options = {
        method: 'get',
        url: '/notes/' + noteId,
        headers: {
          cookie: cookie
        },
      };

      server.inject(options, function(response){
        console.log(response);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });


  describe('DELETE /notes/delete', function(){
    it('should get notes', function(done){
      var options = {
        method: 'get',
        url: '/notes/' + noteId,
        headers: {
          cookie: cookie
        },
      };

      server.inject(options, function(response){
        console.log(response);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('GET /notes/count', function(){
    it('should get notes count', function(done){
      var options = {
        method: 'get',
        url: '/notes/count',
        headers: {
          cookie: cookie
        },
      };

      server.inject(options, function(response){
        //console.log(response);
        expect(response.statusCode).to.equal(200);
        expect(response.result.count).to.equal('1');
        done();
      });
    });
  });


});


// {method: 'post',   path: '/notes',                        config: require('../definitions/notes/create')},
// {method: 'get',    path: '/notes',                        config: require('../definitions/notes/query')},
// {method: 'post',   path: '/notes/{noteId}/upload',        config: require('../definitions/notes/upload')},
// {method: 'post',   path: '/notes/{noteId}/upload-mobile', config: require('../definitions/notes/upload-mobile')},
// {method: 'get',    path: '/notes/{noteId}',               config: require('../definitions/notes/show')},
// {method: 'delete', path: '/notes/{noteId}',               config: require('../definitions/notes/nuke')},
// {method: 'get',    path: '/notes/count',                  config: require('../definitions/notes/count')}
// ];
