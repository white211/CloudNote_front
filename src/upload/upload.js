import request from 'request';

export function upload(formdata) {
  return request({
    headers: {'Content-Type': 'multipart/form-data'},
    url: 'http://127.0.0.1:8080/note/uploadFile.do',
    method: 'post',
    data: formdata
  });
}

