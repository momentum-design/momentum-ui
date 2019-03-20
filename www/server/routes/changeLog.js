import express from 'express';
import config from '../config';
import changeLogHelper from '../tools/changeLogHelper';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    let data={};
    for(let name in config.CHANGE_LOG_URLS){
      data[name] = await changeLogHelper.readFromDisc(name);
    }
    res.send(JSON.stringify(data));
  } catch (err) {
    res.send(err);
  }
});

router.route('/live').get(async (req, res) => {
  try {
    let data={},
      name,
      i=0;
    for(name in config.CHANGE_LOG_URLS){
      i++;
    }
    for(name in config.CHANGE_LOG_URLS){
      changeLogHelper.downloadFile(name,function(obj){
        data[name] = obj;
        i--;
        if(i===0){
          res.send(JSON.stringify(data));
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});

router.route('/build').get(async (req, res) => {
  try {
    for(let name in config.CHANGE_LOG_URLS){
      changeLogHelper.downloadFile(name);
    }
    res.send('Build Success!!!');
  } catch (err) {
    res.send(err);
  }
});

router.route('/build/:id').get(async (req, res) => {
  try {
    const id = req.params.id;
    changeLogHelper.downloadFile(id);
    res.send('Build Success!!! '+id);
  } catch (err) {
    res.send(err);
  }
});

export default router;
