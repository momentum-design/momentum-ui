import express from 'express';
import components from './routes/components';
import componentStatus from './routes/componentStatus';
import menu from './routes/menu';
import pages from './routes/pages';
import feedback from './routes/feedback';
import icons from './routes/icons';
import changeLog from './routes/changeLog';

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.info('Something is happening.'); // eslint-disable-line no-console
  next(); // make sure we go to the next routes and don't stop here
});

router.route('/').get(async (req, res) => {
  try {
    res.send('Success!!!');
  } catch (err) {
    res.send(err);
  }
});

router.use('/components/', components);
router.use('/component-status/', componentStatus);
router.use('/pages/', pages);
router.use('/menu/', menu);
router.use('/feedback/', feedback);
router.use('/icons/', icons);
router.use('/changeLog/', changeLog);

// router
//   .route('/components')
//   .post(async (req, res) => {
//     const component = {};
//     component.name = req.body.name;
//     component.displayName = req.body.displayName;
//     component.sections = req.body.sections;
//     component.tags = req.body.tags;
//     try {
//       await Component.findOrCreate(component);
//       res.json(component);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .get(async (req, res) => {
//     try {
//       let components = await Component.find();
//       res.json(components);
//     } catch (err) {
//       res.send(err);
//     }
//   });

// router
//   .route('/components/:component_name')
//   .get(async (req, res) => {
//     try {
//       // const component = await Component.findOne({ name: req.params.component_name });
//       // res.json(component);
//       res.json(mockComponent);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .put(async (req, res) => {
//     try {
//       const component = await Component.findOneAndUpdate({ name: req.params.component_name }, req.body, { new: true });
//       res.json(component);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .patch(async (req, res) => {
//     try {
//       const oldComponent = await Component.findOne({ name: req.params.component_name });
//       const newComponent = _.mergeWith(oldComponent, req.body, mergeArrays);
//       const component = await Component.findByIdAndUpdate(newComponent.id, newComponent, { new: true });
//       res.json(component);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       await Component.findOneAndRemove({ _id: req.params.component_name });
//       res.json({ message: 'Successfully deleted' });
//     } catch (err) {
//       res.send(err);
//     }
//   });

// router
//   .route('/components/:component_name/sections')
//   .get(async (req, res) => {
//     try {
//       const component = await Component.findOne({ name: req.params.component_name });
//       res.json(component.sections);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .put(async (req, res) => {
//     try {
//       const component = await Component.findOneAndUpdate({ name: req.params.component_name }, { sections: req.body }, { new: true });
//       res.json(component);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .patch(async (req, res) => {
//     try {
//       if (!Array.isArray(req.body)) throw new Error('request is not an array of sections');
//       const component = await Component.findOne({ name: req.params.component_name });
//       // for (let section of req.body) {
//       //   const updatedComponent = await Component.findByIdAndUpdate(component.id, { $push: { sections: section } }, { safe: true, upsert: true });
//       // }

//       res.send(`${component.name} sections updated!`);
//     } catch (err) {
//       res.send(err);
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       await Component.findOneAndRemove({ _id: req.params.component_name });
//       res.json({ message: 'Successfully deleted' });
//     } catch (err) {
//       res.send(err);
//     }
//   });


export default router;
