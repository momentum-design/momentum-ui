import express from 'express';
import config from '../config';
import componentStatusHelper from '../tools/componentStatusHelper';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    let data={};
    for(let name in config.COMPONENT_LIST_URLS){
      data[name] = await componentStatusHelper.readFromDisc(name);
    }
    res.send(JSON.stringify(data));
  } catch (err) {
    res.send(err);
  }
});

router.route('/build').get(async (req, res) => {
  try {
    for(let name in config.COMPONENT_LIST_URLS){
      componentStatusHelper.downloadFile(name);
    }
    res.send('Build Success!');
  } catch (err) {
    res.send(err);
  }
});

export default router;
