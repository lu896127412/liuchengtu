var db = require("./cong");
var formidable = require("formidable");
var fs = require('fs');
var path = require("path");
var sd = require('silly-datetime');


exports.jsondata = async function (req, res, next) {
var id = req.body.id;
var data= await savelistc (id);
// console.log(data[0]);
var dd = new Date().getTime();
var namea =  './public/'+ dd +'.json' ;

fs.writeFile(namea,JSON.stringify(data[0].note),'utf8',function(error){
	if(error){
			console.log(error);
			return false;
	}
	console.log('写入成功');
  var aa = {"code": 200,"msg": '成功', 'data': dd+'.json'};
    res.json(aa);
    return;

})
// fs.mkdir('/public/ab.json',function(error){
// 	if(error){
// 			console.log(error);
// 			return false;
// 	}
// 	console.log('创建目录成功');
// })


}

function savelistc (id) {
 return new Promise(function(resolve, reject) {
		 db.pool.connect(function(err, client, done) {
			 if (err) {
				 return console.error('数据库连接出错', err);
			 }
			 client.query('SELECT * FROM flow_list WHERE "ID" = $1 ', [id], function(err, result) {
				 if (err) {
					 console.log(err);
					 reject('error===');
				 }
				 var aa = result.rows;
				 resolve(aa);
				 done();
				 // return;
			 });
		 });
	 });
}




// 上传图片
exports.upimg = function(req, res, next) {
	var bannerurl;
	// time
	// imga
	var form = new formidable.IncomingForm();
	console.log(form)
	form.uploadDir = path.join(__dirname, '../upimg');
	form.parse(req, function(err, fields, files) {
		var oldpath = files.imga.path;
        //    http://127.0.0.1:4085
        //
        // http://172.18.0.29:3000/upimg/
		//  https://www.uhou.top
		// https://www.uhou.top/upimg/1548666840000.png
		// https://www.uhou.top/upimg/1548666840000.png
		var newpath = path.normalize(__dirname + "/../public/upimg/") + fields.time + ".json";
		var newpatha = "/upimg/" + fields.time + ".json";
		bannerurl = "http://127.0.0.1:3000/upimg/" + fields.time + ".json";
		fs.rename(oldpath, newpath, function(err) {
			if (err) {
				res.send("失败");
				return;
			}
			var aa = {
				'code': 200,
				'data': bannerurl,
				'datab':newpatha
			};
			res.json(aa);
			return;
		});
	});
}







exports.savelist = async function (req, res, next) {
    var id = req.body.id;
    var note = req.body.note;
   await savelistb(id,note);
    var aa = {"code": 200,"msg": '成功'};
    res.json(aa);
    return;
}

 function savelistb (id,note) {
     note = JSON.parse(note);
    return new Promise(function(resolve, reject) {
        db.pool.connect(function(err, client, done) {
          if (err) {
            return console.error('数据库连接出错', err);
          }
          client.query('UPDATE flow_list SET note =  $1 WHERE "ID" = $2 ', [note,id], function(err, result) {
            if (err) {
              console.log(err);
              reject('error===');
            }
            var aa = result.rows;
            resolve(aa);
            done();
            // return;
          });
        });
      });
 }

exports.hqlist = async function (req, res, next) {
  var id = req.body.id;
  var userid = req.body.userid;
  var data = await getlist(userid,id);
  var aa = {"code": 200,"msg": '成功',"data":data};
res.json(aa);
return;
};
function getlist (userid, id) {
  return new Promise(function(resolve, reject) {
  db.pool.connect(function(err, client, done) {
    if (err) {
      return console.error('数据库连接出错', err);
    }
    client.query('SELECT * FROM flow_list WHERE userid = $1 AND  "ID" = $2', [userid,id], function(err, result) {
      if (err) {
        console.log(err);
        reject('error===');
      }
      var aa = result.rows;
      resolve(aa);
      done();
      // return;
    });
  });
});
}


exports.dellist = async function (req, res, next) {
    var id = req.body.id;
    await dellist(id);
    var aa = {"code": 200,"msg": '成功'};
	res.json(aa);
	return;
}
function dellist (id) {
    return new Promise(function(resolve, reject) {
		db.pool.connect(function(err, client, done) {
			if (err) {
				return console.error('数据库连接出错', err);
			}
			client.query('DELETE FROM flow_list WHERE "ID" = $1', [id], function(err, result) {
				if (err) {
					console.log(err);
					reject('error===');
				}
				var aa = result.rows;
				resolve(aa);
				done();
				// return;
			});
		});
	});
}




exports.list = async function (req, res, next) {
    var userid = req.body.userid;
    var data = await listb(userid);
    var aa = {"code": 200,"msg": '成功',"data": data};
	res.json(aa);
	return;
}
function listb (userid) {
    return new Promise(function(resolve, reject) {
		db.pool.connect(function(err, client, done) {
			if (err) {
				return console.error('数据库连接出错', err);
			}
			client.query('SELECT * FROM flow_list WHERE userid = $1', [userid], function(err, result) {
				if (err) {
					console.log(err);
					reject('error===');
				}
				var aa = result.rows;
				resolve(aa);
				done();
				// return;
			});
		});
	});
}


exports.addlist = async function (req, res, next) {
    var title = req.body.title;
    var userid = req.body.userid;
    await lista(title,userid);
    var aa = {"code": 200,"msg": '成功'};
	res.json(aa);
	return;
}

function lista(title,userid) {
	return new Promise(function(resolve, reject) {
		db.pool.connect(function(err, client, done) {
			if (err) {
				return console.error('数据库连接出错', err);
			}
			client.query('INSERT INTO flow_list (userid,title) VALUES($1,$2)', [userid, title], function(err, result) {
				if (err) {
					console.log(err);
					reject('error===');
				}
				var aa = result.rows;
				resolve(aa);
				done();
				// return;
			});
		});
	});
}



// 登录
exports.login = async function(req, res, next) {
	var username = req.body.username;
	var password = req.body.pwd;
	var user_data = await getlogin(username);
	console.log(user_data);
	if (user_data.length == 0) {
		var aa = {
			"code": 202,
			"msg": '密码错误'
		};
		res.json(aa);
		return;
	}
	if (user_data[0].username == username && user_data[0].pwd == password) {
		var aa = {
			"code": 200,
			"msg": '登录成功',
			"data": user_data,
		};
		res.json(aa);
		return;
	} else {
		var aa = {
			"code": 202,
			"msg": '密码错误'
		};
		res.json(aa);
		return;
	}
}


function getlogin(username) {
	return new Promise(function(resolve, reject) {
		db.pool.connect(function(err, client, done) {
			if (err) {
				return console.error('数据库连接出错', err);
			}
			client.query('SELECT * FROM flow_user WHERE username = $1', [username], function(err, result) {
				if (err) {
					console.log(err);
					reject('error===');
				}
				var aa = result.rows;
				resolve(aa);
				done();
				// return;
			});
		});
	});
}




exports.zhuce = async function (req, res, next) {
    var pwd = req.body.pwd;
    var name = req.body.name;
    var username = req.body.username;
    await adduser(username,name,pwd);
	var aa = {"code": 200,"msg": '成功'};
	res.json(aa);
	return;
    // flow_user
}

function adduser (username,name,pwd) {
    return new Promise(function(resolve, reject) {
		db.pool.connect(function(err, client, done) {
			if (err) {
				return console.error('数据库连接出错', err);
			}
			client.query('INSERT INTO flow_user (username,pwd,name) VALUES($1,$2,$3)',[username,pwd,name], function(err, result) {
				if (err) {
					console.log(err);
					reject('error===');
				}
				var aa = result.rows;
				resolve(aa);
				done();
				// return;
			});
		});
	});
}
