import express from 'express';
import mergeArrays from '../tools/mergeArrays';
import Icon from '../models/icon';
import mergeWith from 'lodash/mergeWith';

const router = express.Router();

router
  .route('/')
  .post(async (req, res) => {
    const iconData = {};
    iconData.name = req.body.name;
    iconData.colors = req.body.colors ? req.body['colors'] : ['default'];
    iconData.tags = req.body.tags;
    iconData.sizes = req.body.sizes;
    try {
      const icon = await Icon.findOrCreate({ name: iconData.name }, iconData);
      if (icon.created) res.json(icon);

      const newIcon = mergeWith(icon.doc, iconData, mergeArrays);
      const updatedIcon = await Icon.findByIdAndUpdate(newIcon.id, newIcon, {
        new: true,
      });
      res.json(updatedIcon);
    } catch (err) {
      res.send(err);
    }
  })
  .get(async (req, res) => {
    try {
      let icons = await Icon.find();
      res.json(icons);
    } catch (err) {
      res.send(err);
    }
  });

router
  .route('/:icon_name')
  .get(async (req, res) => {
    try {
      const icon = await Icon.findOne({ name: req.params.icon_name });
      res.json(icon);
    } catch (err) {
      res.send(err);
    }
  })
  .put(async (req, res) => {
    try {
      const icon = await Icon.findOneAndUpdate(
        { name: req.params.icon_name },
        req.body,
        { new: true }
      );
      res.json(icon);
    } catch (err) {
      res.send(err);
    }
  })
  .patch(async (req, res) => {
    try {
      const oldIcon = await Icon.findOne({ name: req.params.icon_name });
      const newIcon = mergeWith(oldIcon, req.body, mergeArrays);
      const icon = await Icon.findByIdAndUpdate(newIcon.id, newIcon, {
        new: true,
      });
      res.json(icon);
    } catch (err) {
      res.send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      await Icon.findOneAndRemove({ _id: req.params.icon_name });
      res.json({ message: 'Successfully deleted' });
    } catch (err) {
      res.send(err);
    }
  });

  export default router;
